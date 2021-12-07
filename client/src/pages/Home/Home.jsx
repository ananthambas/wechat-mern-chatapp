import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import ContactsPage from "../ContactsPage/ContactsPage";
import ConvPage from "../ConvPage/ConvPage";
import MsgPage from "../MsgPage/MsgPage";
import Topbar from "../Topbar/Topbar";
import "./home.scss"



const Home = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    const [isMsgChanged, setIsMsgChanged] = useState(false);
    
    // setCurrentchat("test");



    return (
        <>
            <Topbar />
            <div className="home">
                <div className="chatConverstations">
                    <ConvPage />
                </div>
                <div className="chatMessages">
                    <MsgPage />
                </div>
                <div className="chatContacts">
                    <ContactsPage />
                </div>
            </div>
        </>
    );
}

export default Home;