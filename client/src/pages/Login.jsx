import React, {useState, useEffect, useContext} from 'react'
import {Link, useNavigate} from "react-router-dom"
import './Register.css'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {UserContext} from "../components/UserContext";

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {setInfo:setLoggedIn, setId} = useContext(UserContext)


    const window = {
        position: "bottom-right",
        autoclose: 6000,
        draggable: true,
        theme: "dark"
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleVerify()) {
            try{
                const {infos} = await axios.post('/auth/login', {username,password, confirmPassword})
                setLoggedIn(username)
                setId(infos.id)
            }catch(error){
                toast.error('Errore nella connessione col server', window)
            }

        }
    }

    //Questo è inutile è può essere omesso perchè il button non si attiva se i campi sono vuoti
    const handleVerify = (event) => {
        if(password === ""){
            toast.error('Password richiesta', window )
            return false
        } else if(username===""){
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
                           onChange={e=> setUsername(e.target.value)}
                    />
                    <input id='passwordLogin'
                           type='password'
                           placeholder='Password'
                           name='password'
                           onChange={e=> setPassword(e.target.value)}
                    />
                    <button disabled={username.length === 0 || password.length === 0} type="submit">LOGIN</button>

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



