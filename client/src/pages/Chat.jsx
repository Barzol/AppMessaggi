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
    const [logId, setLogId] = useState()
    const [chat, setChat] = useState(undefined)
    const [logged, setLogged] = useState(false)


     useEffect( ()=> {
        const isLogged = async () => {

            const userObject = await JSON.parse(localStorage.getItem('user'))
            setLoggedUser(userObject.info)

            const id = userObject.info.id
            setLogId(id)
            // console.log(logId)
            // setLoggedUser( await JSON.parse(localStorage.getItem('user')))

        }
        isLogged()
    },[])


    useEffect( ()=>{
        if(loggedUser){
            socket.current = io(host)
            socket.current.emit('add-user', loggedUser._id)
        }
    },[loggedUser])

    useEffect(()=>{
        const getLoggedUser = async () => {
            if(loggedUser){
                const userInfo = await axios.get(`${allUsersRoute}/${loggedUser._id}`)

                setFriends(userInfo.data)
            }
        }
        getLoggedUser()
    },[loggedUser])

    const handleChatChange = (chat) =>{
        setChat(chat);
    }


    return (
        <>
            <div className="app">
                <div className="app_body">
                    <Sidebar chatChange={handleChatChange} setFriends={setFriends} friends={friends} loggedUser={loggedUser} />
                    <ChatBox chat={chat} socket={socket} loggedUser={loggedUser}/>
                </div>
            </div>
        </>

    )
}

