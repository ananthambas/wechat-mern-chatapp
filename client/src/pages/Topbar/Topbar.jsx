import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { useContext } from 'react';
import { logout } from '../../context/authContext/AuthActions';
import { AuthContext } from '../../context/authContext/AuthContext';
import { ChatContext } from '../../context/chatContext/ChatContext';
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from "react-router-dom";
import _ from 'underscore';



import "./topbar.scss";
import { chatSetCurrentChat, chatSetCurrentConv, chatSetCurrentFriend, chatToggleContactsClicked } from '../../context/chatContext/ChatActions';
import { ArrowBackOutlined, LogoutOutlined } from '@mui/icons-material';

const Topbar = () => {

    const { currFriend, currConv } = useContext(ChatContext);
    const { dispatch } = useContext(AuthContext);
    let navigate = useNavigate();
    const { dispatch: dispatchChat, isContactsClicked } = useContext(ChatContext);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })

    const setChatContextEmpty = () => {
        dispatchChat(chatSetCurrentConv({}));
        dispatchChat(chatSetCurrentFriend({}));
        dispatchChat(chatSetCurrentChat([]));
    }

    return (
        <div className="topbar">
            <div className="topbarContainer">
                <div className="topbarLeft">
                    {(!isTabletOrMobile || _.isEmpty(currConv)) &&
                        <span>WeChat</span>}
                    {isTabletOrMobile && !_.isEmpty(currConv) && <ArrowBackOutlined className="topIcon" onClick={() => setChatContextEmpty()} />}
                </div>
                <div className="topbarCenter">
                    <span className="currentChat">{currFriend?.username}</span>
                </div>
                <div className="topbarRight">
                    {
                        !isTabletOrMobile ? (

                            <span onClick={() => { dispatch(logout()); setChatContextEmpty() }}>Logout</span>
                        ) : (
                            <>
                                <AccountBoxOutlinedIcon className={isContactsClicked? "topIcon selected" : "topIcon"}
                                    onClick={() => dispatchChat(chatToggleContactsClicked())}
                                />
                                <LogoutOutlined className="topIcon" onClick={() => { dispatch(logout()); setChatContextEmpty() }} />
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Topbar;