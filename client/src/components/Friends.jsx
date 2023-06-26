import React from 'react'
import './SidebarChat.css'
import {Avatar, IconButton} from "@mui/material";
import {AddCircle} from "@mui/icons-material";


export default function Friends({friend}){

    return (
        <div className='sidebar_chat'>
            <Avatar/>

            <div className='sidebarChat_info'>
                <h3>{friend.username}</h3>
            </div>

        </div>
    )
}