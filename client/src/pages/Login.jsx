import React from 'react'
import {Link} from "react-router-dom"
import {useState} from "react";
import './Register.css'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";

export default function Login(){
    const [info, setInfo] = useState({
        username : "",
        password : ""
    })
    const window = {
        position: "bottom-right",
        autoclose: 6000,
        draggable: true,
        theme: "dark"
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleVerify()) {
            const {username, password} = info
            const {data} = await axios.post('auth/login', {
                username, password
            })
            if(data.status === false) {
                toast.error(data.message, window)
            }
            if(data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))

            }

        }
    }

    const handleChange = (event) => {
        event.preventDefault()
        setInfo({...info, [event.target.name] : event.target.value})
    }


    const handleVerify = (event) => {
        const { username, password} = info
        if(password === ""){
            toast.error('Password richiesta', window )
            return false
        } else  if(username===""){
            toast.error('Username richiesto', window )
            return false
        } else {
            return true
        }

    }

    return (
        <>
            <div id='FormContainer'>
                <form id='form' onSubmit={(event) => handleSubmit(event)}>
                    <input id='usernameLogin'
                           type='text'
                           placeholder='Username'
                           name='username'
                           onChange={e=> handleChange(e)}
                    />
                    <input id='passwordLogin'
                           type='password'
                           placeholder='Password'
                           name='password'
                           onChange={e=> handleChange(e)}
                    />
                    <button type="submit">LOGIN</button>
                    <span>
                        Non possiedi un account?
                        <Link to="/register">
                            <button>REGISTRATI</button>
                        </Link>
                    </span>
                </form>

            </div>
            <ToastContainer />
        </>
    )

}



