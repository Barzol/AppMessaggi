import React, {useEffect, useState} from 'react'
import "./ChatBox.css";
import axios from 'axios'
import {Avatar, Icon, IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {AttachFile, EmojiEmotions, MoreVert, Send} from "@mui/icons-material";
import {allMessageRoute, sendMessageRoute} from "../APIroutes";
import ChatFooter from "./ChatFooter";

export default function ChatBox({chat, loggedUser, socket}){
    const [messageArray, setMessageArray] = useState([])
    const [sendedMessage, setSendedMessage] = useState('null')


    useEffect(()=>{
        const data = async () => {
            if(chat){
                const res = await axios.post(allMessageRoute,{
                    sender: loggedUser._id,
                    receiver: chat._id
                })
                setMessageArray(res.data)
            }
        }
        data()
    },[chat])

    const handleSend = async (message) =>{
        await axios.post(sendMessageRoute, {
            sender: loggedUser._id,
            receiver: chat._id,
            text: message
        })

        socket.current.emit('sended-message',{
            sender: loggedUser._id,
            receiver: chat._id,
            text: message
        })

        const messages = [...messageArray]
        messages.push({
            fromSelf: true,
            text: message
        })
        setMessageArray(messages)
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on('received-message', (message) => {
                setSendedMessage({
                    fromSelf: false,
                    text: message,
                });
            })
        }
    }, []);





    return(
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_header_info">
                    <h3>
                        <h3>

                        </h3>
                    </h3>
                </div>
                <div className="chat_header_right">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">

                {messageArray.map((message, index)=>{
                    console.log(message.fromSelf)
                    return (
                        <div className={`chat_message ${message.fromSelf ? 'chat_received':''}`} key={index}>
                            {message.text}
                            <span className="chat_timestamp">{new Date().toLocaleTimeString()}</span>
                        </div>
                    )
                })}


            </div>

            <ChatFooter handleSend={handleSend}/>

        </div>
    )
}


/*
// mandati = messaggi sulla destra
// ricevuti = messaggi sulla sinistra
<>
    <div id='mandati'>
        <ul>
            <li> {data.messages.map((c,i) =>
                <Message user={c.username} content={c.content}/>
            )}
            </li>
        </ul>
    </div>
    <div id='ricevuti'>
        <ul>
            <li> {data.messages.map((c,i) =>
                <Message user={c.username} content={c.content}/>
            )}
            </li>
        </ul>
    </div>
</> */