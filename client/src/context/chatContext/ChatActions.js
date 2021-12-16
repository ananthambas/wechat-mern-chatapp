export const chatAddContact = (contacts) => ({
    type: "ADD_CONTACT",
    payload: contacts,
});
export const chatSetCurrentChat = (currChat) => ({
    // console.log(currChat);
    type: "SET_CURRENT_CHAT",
    payload: currChat,
});
export const chatSetCurrentFriend = (currFriend) => ({
    type: "SET_CURRENT_FRIEND",
    payload: currFriend,
});

export const chatSetCurrentConv = (currConv) => ({
    type: "SET_CURRENT_CONVERSATION",
    payload: currConv,
});
export const chatToggleContactsClicked = () => ({
    type: "TOGGLE_CONTACTS_CLICKED",
});

