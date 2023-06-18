import React from 'react'
import {Link} from "react-router-dom"
import {useState} from "react";
import './Register.css'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";

export default function Register(){
    const [info, setInfo] = useState({
        username : "",
        password : "",
        confirmPassword : ""

    })

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleVerify()) {
            const {username, password, confirmPassword} = info
            const {data} = await axios.post('auth/login', {
                username, password, confirmPassword
            })
            if(data.status === false) {
                toast.error(fata.message, toastOptions)
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

    const window = {
        position: "bottom-right",
        autoclose: 6000,
        draggable: true,
        theme: "dark"
    }
    const handleVerify = (event) => {
        const { username, password, confirmPassword} = info
        if(password !== confirmPassword){
            toast.error('Le password non coincidono', window )
            return false
        } else  {
            return true
        }

    }

    return (
        <>
            <div id='FormContainer'>
                <form id='form' onSubmit={(event) => handleSubmit(event)}>
                    <input id='form'
                           type='text'
                           placeholder='Username'
                           name='username'
                           onChange={e=> handleChange(e)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={e=> handleChange(e)}
                    />
                    <button type="submit"/>Login
                </form>

            </div>
            <ToastContainer />
        </>
    )

}



