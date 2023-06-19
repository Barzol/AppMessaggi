import React from 'react'
import "./ChatBox.css";
import {Avatar, Icon, IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {AttachFile, EmojiEmotions, MoreVert, Send} from "@mui/icons-material";
//import SendIcon from '@mui/icons-material/Send';

export default function ChatBox(data){
    return(
        <div className="chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_header_info">
                    <h3>Nome Chat</h3>
                    <p>Messaggio</p>
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
                {/*Messaggi*/}
                <p className="chat_message">
                    <span className="chat_name">MY NAME</span>
                    Message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message chat_receiver">
                    <span className="chat_name">MY NAME</span>
                    Message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message">
                    <span className="chat_name">MY NAME</span>
                    Message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message chat_receiver">
                    <span className="chat_name">MY NAME</span>
                    Message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message">
                    <span className="chat_name">MY NAME</span>
                    Message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message chat_receiver">
                    <span className="chat_name">MY NAME</span>
                    Message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message">
                    <span className="chat_name">MY NAME</span>
                    Message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message chat_receiver">
                    <span className="chat_name">MY NAME</span>
                    Message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message">
                    <span className="chat_name">MY NAME</span>
                    Message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message chat_receiver">
                    <span className="chat_name">MY NAME</span>
                    Message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message">
                    <span className="chat_name">MY NAME</span>
                    Message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>
                <p className="chat_message chat_receiver">
                    <span className="chat_name">MY NAME</span>
                    Message
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>

            </div>
            <div className="chat_footer">
                <IconButton>
                    <EmojiEmotions />
                </IconButton>
                <form>
                    <input placeholder="Scrivi un messaggio..." type="text" />
                    <button type="submit">
                        <IconButton>
                            <Send />
                        </IconButton>
                    </button>
                </form>
            </div>
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