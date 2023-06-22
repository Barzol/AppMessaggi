import React from 'react'
import "./Sidebar.css"
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import {Avatar, avatar, IconButton} from "@mui/material";
import {useState, useEffect} from "react";

import SidebarMenu from "./SidebarMenu";


export default function Sidebar(loggedUser) {
    const [userName,setUserName] = useState()
    const [selected, setSelected] = useState()
    useEffect((userName) => {
        setUserName(loggedUser.username)
    },[loggedUser])

    return (

        <div className="sidebar">
            <div className="sidebar_header">
                <div className="sidebar_header_left">
                    <IconButton>
                        <Avatar />
                    </IconButton>
                </div>
                <div className="sidebar_header_right">
                    <IconButton>
                        <ChatIcon></ChatIcon>
                    </IconButton>
                    <SidebarMenu />
                    {/*<IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>*/}
                </div>
            </div>
            <div className="sidebar-searc">
                <div className="sidebar_search_container">
                    <SearchIcon />
                    <input type="text" placeholder="cerca o inizia una nuova chat"></input>
                </div>
            </div>
            <div className="sidebar_chat">
                { /* Rimpiazzo SidebarChat */}
            </div>
        </div>
    );
}



