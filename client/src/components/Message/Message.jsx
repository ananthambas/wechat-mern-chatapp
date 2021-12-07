import "./message.scss"
import {format} from "timeago.js"

const Message = ({ message, own, user }) => {

    // console.log(user);
    return (
        <div className={own? "message own" : "message"}>
            <div className="messageWrapper">

                <div className="messageTop">
                    <span className="userName">{user.username}</span>
                </div>
                <div className="messageBottom">
                    <p className="messageText">{message.text}</p>
                    <p className="messageTime">{format(message.createdAt)}</p>
                </div>
            </div>
        </div>
    );
}

export default Message;