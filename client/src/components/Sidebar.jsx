import React from 'react'
import "./Sidebar.css"
import ChatIcon from '@mui/icons-material/Chat';
import {Avatar, avatar, IconButton} from "@mui/material";
import {useState, useEffect} from "react";
import SidebarMenu from "./SidebarMenu";
import SidebarSearch from './SidebarSearch'
import Friends from "./Friends";


export default function Sidebar({friends, setFriends, loggedUser, chatChange}) {
    const [userName,setUserName] = useState()
    const [selected, setSelected] = useState()

    const changeSelectedChat = (i, friend) => {
        setSelected(i)
        chatChange(friend)
    }

    useEffect((userName) => {
        if(loggedUser){
            setUserName(loggedUser.username)
        }

    },[loggedUser])

    const handleSearch = async () => {

    }

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
                        <ChatIcon ></ChatIcon>
                    </IconButton>
                    <SidebarMenu />

                </div>
            </div>
            <SidebarSearch friends = {friends} setFriends={setFriends}/>
            <div className="sidebar_chat">
                {friends.map((friend,i)=>{
                    return (
                        <div
                            className={` friend ${i === selected ? 'selected' : ''}`}
                            onClick={()=>changeSelectedChat(i,friend)}
                            key={i}>
                            <Friends friend={friend} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}



