import React from "react";
import { useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import {Container} from "@mui/material";
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import {io} from 'socket.io-client'
import {host, allUsersRoute} from '../APIroutes'


export default function Chat() {
    const socket = useRef()
    const navigate = useNavigate()
    const [friends, setFriends] = useState([])
    const [loggedUser, setLoggedUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined)
    const [logged, setLogged] = useState(false)


    useEffect( ()=> {
        if (!localStorage.getItem('user'))
            navigate('/')
        else{
            setLoggedUser( JSON.parse(localStorage.getItem('user')))
            setLogged(true)
        }
    },[])

    useEffect(()=>{
        const getLoggedUser = async () => {
            if(loggedUser){
                const data = await axios.get(`${allUsersRoute}/${loggedUser._id}`)
                setFriends(data.data)
            }
        }
        getLoggedUser()
    },[loggedUser])

    const handleChatChange = (chat) =>{
        setCurrentChat(chat);
    }

    useEffect(()=>{
        if(loggedUser){
            socket.current = io(host)
            socket.current.emit('add-user', loggedUser._id)
        }
    },[loggedUser])



    return (
        <>
            <div className="app">
                <div className="app_body">
                    <Sidebar chatChange={handleChatChange} friends={friends} loggedUser={loggedUser} />
                    <ChatBox currentChat={currentChat} socket={socket} loggedUser={loggedUser}/>
                </div>
            </div>
        </>

    )
}

