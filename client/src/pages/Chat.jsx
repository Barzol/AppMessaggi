import React from "react";
import { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import {Container} from "@mui/material";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

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
        console.log('new message', event)
    }


    return (
        <>
            <div className="app">
                <div className="app_body">
                    <Sidebar />
                    <ChatBox />
                </div>
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