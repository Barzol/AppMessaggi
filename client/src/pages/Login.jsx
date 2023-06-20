import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import './Register.css'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";

export default function Login(){
    const [info, setInfo] = useState({
        username : "",
        password : ""
    })
    const navigate = useNavigate()
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
            try{
                const response = await axios.post('/auth/login', {
                    username, password
                })
                const {data} = response;
                if(data){
                    const token = data.token
                    navigate('/chats')
                } else {
                    throw new Error('Response data is undefined');
                }

            }catch(error){
                toast.error(error.res.data.message, window)
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



