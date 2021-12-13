import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import Message from "../../components/Message/Message";
import { AuthContext } from "../../context/authContext/AuthContext";
import { chatSetCurrentChat, chatSetCurrentFriend } from "../../context/chatContext/ChatActions";
import { ChatContext } from "../../context/chatContext/ChatContext";
import "./msgpage.scss"
import io from "socket.io-client"
import _ from 'underscore';
import axiosInstance from "../../misc/axiosInstance";

const MsgPage = ({ setIsMsgChanged }) => {

    const { user } = useContext(AuthContext);
    const { currFriend, dispatch, currConv, currChat } = useContext(ChatContext);
    const newMessageRef = useRef();
    const [socketio, setSocketio] = useState();
    const scrollRef = useRef();
    const [arrivalMsg, setArrivalMsg] = useState(null);
    // const [userAndSocketReady, setUserAndSocketReady] = useState({user, socket});

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(newMessageRef.current.value);
        const message = {
            sender: user._id,
            text: newMessageRef.current.value,
            conversationId: currConv?._id
        };

        socketio?.emit("sendMessage", {
            senderId: user._id,
            receiverId: currFriend._id,
            text: newMessageRef.current.value,
            conversationId: currConv?._id,
        });

        console.log(user._id, currFriend._id);
        console.log(currFriend);

        try {
            const res = await axiosInstance.post("/messages", message);
            dispatch(chatSetCurrentChat([...currChat, res.data]));
            newMessageRef.current.value = "";
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        // console.log(currConv);

        const getMessages = async () => {
            try {
                // console.log("object");
                const friendId = currConv?.members?.find((m) => m !== user._id);
                const res = await axiosInstance.get("/messages/" + currConv?._id);
                const userRes = await axiosInstance.get("/user/id/" + friendId);
                // console.log(userRes.data);
                dispatch(chatSetCurrentFriend(userRes.data));
                dispatch(chatSetCurrentChat(res.data));
            } catch (err) {
                console.log(err);
            }
        };
        if (!_.isEmpty(currConv)) {
            // console.log("ananth");
            getMessages();
        }
    }, [currConv]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView();
    }, [currChat]);

    useEffect(() => {
        console.log(currConv);
        console.log(currChat);
    }, [currChat]);

    // useEffect(() => {
    //     console.log(currFriend);
    // }, [currFriend]);

    // useEffect(() => {
    //     console.log(currConv);
    // }, [currConv]);

    useEffect(() => {
        // console.log(currentchat);
        // if (socket === null) {
        console.log("setting socket");
        const socketRes = io(process.env.REACT_APP_API_URL || "http://localhost:8700/");
        console.log(socketRes);
        // console.log(socketRes.Socket.id);
        setSocketio(socketRes);
        // }

        return (() => {
            console.log("socket off");
            return socketRes.off;
        });
    }, []);

    useEffect(() => {


        user && socketio?.on("connect", () => {
            console.log("ananth " + socketio.id);
            socketio.emit("addUser", user._id, user.username);
            socketio.on("getUsers", (users) => {
                console.log(users);
            })
            socketio.on("getMessage", (data) => {
                console.log(data);
                    const message = {
                        sender: data.senderId,
                        text: data.text,
                        createdAt: Date.now(),
                        conversationId: data.conversationId,
                    }
                    console.log("aiyyo");
                    console.log(currChat);
                    console.log(message);

                    setArrivalMsg(message);
            });
        });

    }, [socketio]);

    useEffect(() => {
       console.log("currChat");
       console.log(currChat);
       console.log(arrivalMsg);
       arrivalMsg && currFriend._id === arrivalMsg.sender && dispatch(chatSetCurrentChat([...currChat, arrivalMsg]));
    }, [arrivalMsg]);

    // useEffect(() => {
    //     console.log("receiving socket welcome");
    //     socket?.on("welcome", (message) => {
    //         console.log(message);
    //     })
    // }, [socket]);

    // useEffect(() => {
    //     if (socket) {
    //         console.log("ananth" + user._id);
    //         socket.emit("addUser", user._id, user.username);
    //         socket.on("getUsers", (users) => {
    //             console.log(users);
    //         })
    //     }

    // }, [userAndSocketReady]);

    // useEffect(() => {
    //    setUserAndSocketReady(prev => {
    //     console.log('prev AB', prev)
    //     return (user !== prev.user && socket !== prev.socket) 
    //       ? {user,socket} 
    //       : prev;  // do nothing
    //   })
    // }, [user, socket])

    return (
        <div className="msgpage">
            {
                _.isEmpty(currConv) ? (
                    <div className="welcomeContainer">
                        <p>Welcome {user?.username}</p>
                    </div>

                ) : (
                    <>
                        <div className="messageContainer" >
                            {currChat && currFriend && currChat.map((m) => (
                                <div ref={scrollRef} key={m._id} >

                                    <Message message={m} own={m.sender === user._id} user={(m.sender === user._id) ? user : currFriend} />
                                </div>
                            ))}

                        </div>
                        <form className="inputContainer" onSubmit={handleSubmit}>
                            <textarea ref={newMessageRef} className="inputText" placeholder="write something..." />
                            <button className="inputButton">Send</button>
                        </form>
                    </>

                )
            }
        </div>
    );
}

export default MsgPage;