import React from "react";
import { useState, useEffect } from "react";
import ChatContainer from "../components/ChatContainer";

export default function Home() {
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        axios({
            method: 'post',
            url: '',
            data:{

            }
        })
            .then(res => {
                if (res.ok) return res.json();
                else throw new Error('Si è verificato un errore nella comunicazione con il server');
            })
            .then(obj => {
                setLoading(false)
                setChats(obj)
            })
            .catch(error => {
                setLoading(false)
                setError(true)
            })
    }, [])

    return (
        <div id="post-container">
            {loading ? <span>Caricamento in corso...</span> :
                error ? <span>Errore nel caricamento dei post</span> :
                    <ChatContainer chats={chats} />}
        </div>
    )
}