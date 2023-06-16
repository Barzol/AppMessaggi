import React from 'react'
import Sidebar from "./Sidebar";
import Message from "./Message";

export default function ChatBox(data){
    return(
        <div className="chat">
            <div className="chat_header">
                <h2>header</h2>
            </div>
            <div className="chat_body">
                <h2>body</h2>
            </div>
        </div>
    )
}

//MALEDETTO FERRARA


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