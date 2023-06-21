import React from "react";
import { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import ChatContainer from "../components/ChatContainer";
import {Container} from "@mui/material";
import SidebarChat from "../components/SidebarChat";

export default function Chat() {
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([])
    const [loggedUser, setLoggedUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const[ws,setWs] = useState(null)

    useEffect(async() => {
        if(loggedUser){
            const data = await axios.get(`/auth/${loggedUser._id}`)
            setContacts(data.data)
        }
    },[loggedUser])

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4000')
        setWs(ws)
        ws.addEventListener('message', handleMessage)
    },[])

    const handleMessage = async (event) =>{
        console.log('new message', e)
    }


    return (
        <>
            <Container>
                <div>
                    <SidebarChat contacts={contacts} loggedUser={loggedUser}/>
                </div>
            </Container>



            <div id="post-container">
                {loading ? <span>Caricamento in corso...</span> :
                    error ? <span>Errore nel caricamento dei post</span> :
                        <ChatContainer chats={chats} />}
            </div>
        </>

    )
}

/*
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
*/