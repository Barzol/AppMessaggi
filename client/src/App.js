import react from "react";
import './App.css';
import ChatBox from "./components/ChatBox.jsx";
//import ChatContainer from "./components/ChatContainer.jsx";
//import Message from "./components/Message.jsx";
import Sidebar from "./components/Sidebar.jsx";
import {useContext} from "react";
import {UserContext, UserContextProvider} from "./components/UserContext";
import Chat from "./pages/Chat";

export default function App(){
    const {username, id} = useContext(UserContext);

    if(username){
        return(
            <Chat />
        );
    }



}

