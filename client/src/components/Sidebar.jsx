import React from 'react'
import Button from '@mui/material/Button'
import "./Sidebar.css"
import SidebarChat from "./SidebarChat.jsx";

export default function Sidebar(loggedUser) {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <div className="sidebar_header_left">
                    <h1>Header left</h1>
                </div>
                <div className="sidebar_header_right">
                    <h1>Header right</h1>
                </div>
            </div>
            <div className="sidebar-searc">
                <div className="sidebar_search_container">
                    <input type="text" placeholder="cerca"></input>
                </div>
            </div>
            <div className="sidebar_chat">
                <SidebarChat />
            </div>
        </div>
    );
}

//export default Sidebar;

    // aggiungere collegamento con il logged user per far vedere solo le chat
    // dell'utente loggato
    /*return(
        <div>
            <ul>
                <Button description='Chat1' url='/:chatId' variant="contained"/>
                <Button description='Chat2' url='/:chatId' variant="contained"/>
                <Button description='Chat3' url='/:chatId' variant="contained"/>
            </ul>
        </div>
    ); */


