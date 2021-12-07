const ChatReducer = (state, action) => {
    switch (action.type) {
        case "ADD_CONTACT":
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };
        case "SET_CURRENT_CHAT":
            return {
                ...state,
                currChat: action.payload
            };
        case "SET_CURRENT_FRIEND":
            return {
                ...state,
                currFriend: action.payload
            };
        case "SET_CURRENT_CONVERSATION":
            return {
                ...state,
                currConv: action.payload
            };
        default:
            return { ...state };
    }
}

export default ChatReducer;