import React from 'react'
import Sidebar from "./Sidebar";
import Message from "./Message";

export default function ChatBox(data){
    return(
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
        </>
    )
}