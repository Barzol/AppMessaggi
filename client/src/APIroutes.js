export const host = 'http://localhost:4000'

// Routes Autenticazione
export const registerRoute = `${host}/auth/register`
export const loginRoute = `${host}/auth/login`
export const logoutRoute = `${host}/auth/logout`

//Routes Chats
export const chatsRoute = `${host}/auth/chats`
export const allUsersRoute = `${host}/auth/allusers`

// Routes Messaggi
export const sendMessageRoute = `${host}/auth/sendmessage`
export const allMessageRoute = `${host}/auth/allmessage`

// Routes friend
export const addFriendRoute = `${host}/auth/addFriend`
//export const removeFriendRoute = `${host}/auth/removeFriend`