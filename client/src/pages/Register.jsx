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

    const window = {
        position: "bottom-right",
        autoclose: 6000,
        draggable: true,
        theme: "dark"
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleVerify()) {
            const {username, password, confirmPassword} = info
            const {data} = await axios.post('auth/register', {
                username, password, confirmPassword
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
        const { username, password, confirmPassword} = info
        if(password !== confirmPassword){
            toast.error('Le password non coincidono', window )
            return false
        } else if (username.length < 2) {
            toast.error('Username deve essere più lungo di 3 caratteri', window)
        }
        return true
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
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        onChange={e=> handleChange(e)}
                    />
                    <button type="submit"/>Registrati
                    <span>
                        Possiedi un account? <Link to="/">Login</Link>
                    </span>
                </form>
            </div>
            <ToastContainer />
            </>
    )

}





