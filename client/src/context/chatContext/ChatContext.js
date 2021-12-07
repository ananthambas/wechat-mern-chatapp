import { createContext, useContext, useEffect, useReducer } from "react";
import ChatReducer from "./ChatReducer";



const INITIAL_STATE = {
    currFriend: {},
    currChat: [],
    currConv: {},
    contacts: [],
    conv: [],
};

export const ChatContext = createContext(INITIAL_STATE);

export const ChatContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ChatReducer, INITIAL_STATE);
    const { currConv } = useContext(ChatContext);

    useEffect(() => {
        console.log(currConv);
    },[currConv]);

    return (
        <ChatContext.Provider
            value={{
                currFriend: state.currFriend,
                currChat: state.currChat,
                currConv: state.currConv,
                contacts: state.contacts,
                dispatch
            }}>
            {children}
        </ChatContext.Provider>
    );
}