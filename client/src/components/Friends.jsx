import React from 'react'
import './Sidebar.css'
import {Avatar, IconButton} from "@mui/material";



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