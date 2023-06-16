import react from "react";
import './App.css';
import ChatBox from "./components/ChatBox.jsx";
import ChatContainer from "./components/ChatContainer.jsx";
import Message from "./components/Message.jsx";
import Sidebar from "./components/Sidebar.jsx";

export default function App(){
    return(
        <div className="app">
            <div className="app_body">
                <Sidebar />
                <ChatBox />
                <h2>Prova React</h2>
            </div>
        </div>
    );
}
