import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import ContactsPage from "../ContactsPage/ContactsPage";
import ConvPage from "../ConvPage/ConvPage";
import MsgPage from "../MsgPage/MsgPage";
import Topbar from "../Topbar/Topbar";
import { useMediaQuery } from 'react-responsive'
import _ from 'underscore';

import "./home.scss"
import { ChatContext } from "../../context/chatContext/ChatContext";



const Home = () => {
    const { user } = useContext(AuthContext);
    const { currConv, isContactsClicked } = useContext(ChatContext);
    console.log(user);
    // const [isContactsClicked, setIsContactsClicked] = useState(false);
    const [isMsgChanged, setIsMsgChanged] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
    // setCurrentchat("test");



    return (
        <>
            <Topbar />
            {
                !isTabletOrMobile ? (
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
                ) : (
                    !isContactsClicked ? (
                        <div className="homeTablet">
                            <ContactsPage />
                        </div>
                    ) : (

                        _.isEmpty(currConv) ? (
                            <div className="homeTablet">
                                <ConvPage />
                            </div>
                        ) : (
                            <div className="homeTablet">
                                <MsgPage />
                            </div>
                        )
                    )
                )
            }
        </>
    );
}

export default Home;