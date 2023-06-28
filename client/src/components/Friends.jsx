import React from 'react'
import './SidebarChat.css'
import {Avatar, IconButton} from "@mui/material";
import {AddCircle} from "@mui/icons-material";


export default function Friends({friend}){

    return (
        <div className='sidebar_chat_friends'>
            <Avatar/>

            <div className='sidebarChat_info'>
                <h2>{friend.username}</h2>
            </div>

        </div>
    )
}