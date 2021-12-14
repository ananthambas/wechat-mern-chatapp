import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { useContext } from 'react';
import { logout } from '../../context/authContext/AuthActions';
import { AuthContext } from '../../context/authContext/AuthContext';
import { ChatContext } from '../../context/chatContext/ChatContext';
import "./topbar.scss";

const Topbar = () => {

    const {currFriend} = useContext(ChatContext);
    const {dispatch} = useContext(AuthContext);
    return (
        <div className="topbar">
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <span>WeChatt</span>
                </div>
                <div className="topbarCenter">
                    <span className="currentChat">{currFriend?.username}</span>
                </div>
                <div className="topbarRight">
                    <span onClick={() => dispatch(logout())}>Logout</span>
                    {/* <AccountBoxOutlinedIcon /> */}
                </div>
            </div>
        </div>
    );
}

export default Topbar;