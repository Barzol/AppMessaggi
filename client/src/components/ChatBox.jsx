import React, {useEffect, useState} from 'react'
import "./ChatBox.css";
import axios from 'axios'
import {Avatar, Icon, IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {AttachFile, EmojiEmotions, MoreVert, Send} from "@mui/icons-material";
import {allMessageRoute} from "../APIroutes";
import ChatFooter from "./ChatFooter";

export default function ChatBox({currentChat, loggedUser, socket}){
    const [messageArray, setMessageArray] = useState([])
    const [sendedMessage, setSendedMessage] = useState('null')


    const handleSend = async (message) =>{
        await axios.post('auth/sendmessage', {
            sender: loggedUser._id,
            receiver: currentChat._id,
            text: message
        })

        socket.current.emit('send-message',{
            sender: loggedUser._id,
            receiver: currentChat._id,
            text: message
        })

        const messages = [...messageArray]
        messages.push({
            fromSelf: true,
            message: message
        })
        setMessageArray(messages)
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieved", (msg) => {
                setSendedMessage({
                    fromSelf: false,
                    message: msg,
                });
            })
        }
    }, []);

    useEffect(()=>{
        const data = async () => {
            if(currentChat){
                const res = await axios.post(allMessageRoute,{
                    sender: loggedUser._id,
                    receiver: currentChat._id
                })
                setMessageArray(res.data)
            }
        }
        data()
    },[currentChat])



    return(
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_header_info">
                    <h3>

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

                {messageArray.map((message)=>{
                    return (
                        <div className={`chat_${message.fromSelf ? 'sended':'recieved'}`} >
                            {message.message}
                            <span className="chat_timestamp">{new Date().toUTCString()}</span>
                        </div>
                    )
                })}


                <p className="chat_message chat_receiver">
                    Message1
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message">
                    Message2
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message chat_receiver">
                    Message3
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>


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