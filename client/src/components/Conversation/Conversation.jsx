import axios from "axios";
import {format} from "timeago.js"
import { useEffect, useState } from "react";
import "./conversation.scss"
import axiosInstance from "../../misc/axiosInstance";

const Conversation = ({ conv, currentUser }) => {
    const [user, setUser] = useState(null);
    const [lastestConv, setLatestConv] = useState("test");
    const [time, setTime] = useState(2);

    // console.log(conv, currentchat);
    useEffect(() => {
        const friendId = conv.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try {
                const res = await axiosInstance.get("/user/id/" + friendId);
                const res2 = await axiosInstance.get("/messages/" + conv._id + "?last=true");
                // console.log(res2);
                setUser(res.data);
                if(res2.data?.text){
                    setLatestConv(res2.data.text);
                }
                if(res2.data?.createdAt){
                    setTime(res2.data.createdAt)
                }
                // console.log(res2.data.createdAt);
                // console.log(res2.data.text);
            } catch (err) {
                console.log(err);
            }
        };

        // const getLastetConv = async 
        getUser();
    }, [conv, currentUser])



    return (
        <>
            {user && lastestConv && time && (
                <div className={"conversation"}>
                    <div className="convTop">
                        <span className="contactName">{user.username}</span>
                        <span className="time">{format(time)}</span>
                    </div>
                    <div className="convBottom">{lastestConv}</div>
                </div>
            )}
        </>
    );
}

export default Conversation;