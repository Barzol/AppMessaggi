import {IconButton} from "@mui/material";
import {EmojiEmotions, Send} from "@mui/icons-material";
import React, {useState} from "react";
import './ChatBox.css'

export default function ChatFooter({handleSend}){

    const [message,setMessage] = useState('')

    const handleChat = (e)=>{
        e.preventDefault()
        if(message.length > 0){
            handleSend(message)
            setMessage('')
        }
    }

    return(
        <div className="chat_footer">
            <IconButton>
                <EmojiEmotions />
            </IconButton>
            <form onSubmit={(e)=>handleChat((e))}>
                <input
                    placeholder="Scrivi un messaggio..." type="text"
                    value={message} onChange={(e)=>{setMessage(e.target.value)}}
                />
                <button type="submit">
                    <IconButton>
                        <Send />
                    </IconButton>
                </button>
            </form>
        </div>
    )
}