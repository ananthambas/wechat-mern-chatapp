import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Conversation from "../../components/Conversation/Conversation";
import { AuthContext } from "../../context/authContext/AuthContext";
import { chatSetCurrentChat, chatSetCurrentConv } from "../../context/chatContext/ChatActions";
import { ChatContext } from "../../context/chatContext/ChatContext";
import axiosInstance from "../../misc/axiosInstance";
import "./convpage.scss"

const ConvPage = () => {
    const [conv, setConv] = useState([]);
    const { user } = useContext(AuthContext);
    const { dispatch, currChat } = useContext(ChatContext);

    useEffect(() => {
        const getConv = async () => {
            try {
                const res = await axiosInstance.get("/conv/user/" + user._id);
                console.log(res);
                setConv(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getConv();
    }, [currChat]);

    const handleConvClick = (c) => {
        console.log(c);
        dispatch(chatSetCurrentConv(c));
    }
    return (
        <div className="convpage">
            {conv.map((c) => (
                <div key={c._id} onClick={() => handleConvClick(c)}>

                    <Conversation conv={c} currentUser={user} />
                </div>
            ))}
        </div>
    );
}

export default ConvPage;