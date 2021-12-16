import { CancelOutlined, CancelPresentationOutlined, CloseOutlined, SearchOutlined } from "@mui/icons-material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Contact from "../../components/Contact/Contact";
import { loginSuccess } from "../../context/authContext/AuthActions";
import { AuthContext } from "../../context/authContext/AuthContext";
import { chatSetCurrentConv, chatToggleContactsClicked } from "../../context/chatContext/ChatActions";
import { ChatContext } from "../../context/chatContext/ChatContext";
import axiosInstance from "../../misc/axiosInstance";
import "./contactspage.scss"

const ContactsPage = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [searchText, setSearchText] = useState("");
    const [searchContact, setSearchContact] = useState([]);
    const [error, setError] = useState("");
    const { dispatch: dispatchChat } = useContext(ChatContext);

    useEffect(() => {
        // const contacts = user?.contacts;
        user?.contacts.sort((a, b) => {
            if (a.username < b.username) return -1
            return a.username > b.username ? 1 : 0
        })
        // console.log(user.contacts);
    }, [user]);

    useEffect(() => {
        const contactsFilter = user?.contacts?.filter(option =>
            option.username?.startsWith(searchText));
        // console.log(contactsFilter);
        setSearchContact(contactsFilter);
        console.log(searchText);

    }, [searchText, user])

    const handleAddContact = async () => {
        try {
            const res = await axiosInstance.get("/user/un/" + searchText);
            // console.log(res);
            // console.log(res.status);
            // console.log(res.statusText);
            if (res.status === 204) {
                setError("User not found");
                return;
            }
            const contactId = res.data._id;
            const username = res.data.username;
            console.log(contactId, username);
            const putRes = await axiosInstance.put("/user/id/" + user._id,
                {
                    "contact": contactId,
                    "username": username
                }
            )
            // console.log(putRes);
            dispatch(loginSuccess(putRes.data));

        } catch (err) {
            console.log(err);
        }
    };

    const handleSearchInput = (e) => {
        e.preventDefault();
        setSearchText(e.target.value)
        setError("");
    }

    const handleContactClick = (c) => {
        // console.log(c);
        //create a new conversation
        const getOrCreateConv = async (c) => {

            try {
                let res = await axiosInstance.get("/conv/user/?sender=" + user._id + "&receiver=" + c.contact);
                // console.log(res.data);
                // console.log(res.data.length);
                if (!res.data) {
                    console.log("creating conv");
                    res = await axiosInstance.post("/conv/",
                        {
                            "senderId": user._id,
                            "receiverId": c.contact
                        })
                }
                // console.log(res.data);
                dispatchChat(chatSetCurrentConv(res.data));
                dispatchChat(chatToggleContactsClicked());
            } catch (err) {
                console.log(err);
            }
            // try {
            //     const res = await axiosInstance.post("/conv/",
            //         {
            //             "senderId": user._id,
            //             "receiverId": c.contact
            //         })
            //     console.log(res);
            // } catch (err) {
            //     console.log(err);
            // }
        }

        getOrCreateConv(c);
    }

    return (
        <div className="contactspage">
            <div className="contactSearch">
                <input type="text" value={searchText} className="contactInput" maxLength="15" onChange={(e) => handleSearchInput(e)} placeholder="Search/Add Contacts" />
                <CloseOutlined className="searchIcon" onClick={() => setSearchText("")}/>
            </div>
            {searchText ?
                (searchContact.length ?
                    (searchContact?.map((c) => (
                        <div key={c.contact} onClick={() => handleContactClick(c)}>
                            <Contact contact={c} />
                        </div>
                    )))
                    :
                    (
                        <>
                            <p className="searchText">{searchText}</p>
                            <button className="addContactBtn" onClick={handleAddContact}>Add to Contacts</button>
                            {error && <p>{error}</p>}
                        </>
                    )
                )
                :
                (user?.contacts.map((c) => (
                    <div key={c.contact} onClick={() => handleContactClick(c)}>
                        <Contact contact={c} />
                    </div>
                )))}
        </div>
    );
}

export default ContactsPage;