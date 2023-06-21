import React, {useContext} from 'react'
import {Link} from "react-router-dom"
import {useState} from "react";
import './Register.css'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {UserContext} from "../components/UserContext";


export default function Register(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const {setInfo:setLoggedIn, setId} = useContext(UserContext)

    //commento inutile

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
                const {infos} = await axios.post('auth/register', {username,password})
                setLoggedIn(username)
                setId(infos.id)
            }catch(error){
                toast.error('Errore nella connessione col server', window)
            }

        }
    }

    const handleVerify = (event) => {
        if(password !== confirmPassword){
            toast.error('Le password non coincidono', window )
            return false
        } else if(username.length < 2) {
            toast.error('Username deve essere più lungo di 3 caratteri', window)
            return false
        }
        return true
    }

    return (
        <>
            <div id='FormContainer'>
                <form id='form' onSubmit={handleSubmit}>
                    <input
                        value={username}
                        id='usernameRegister'
                        type='text' placeholder='Username'
                        name='username'
                        onChange={e=> setUsername(e.target.value)}
                    />
                    <input
                        value={password}
                        id='passwordRegister'
                        type='password' placeholder='Password'
                        name='password'
                        onChange={e=> setPassword(e.target.value)}
                    />
                    <input
                        value={confirmPassword}
                        id='confirmPassRegister'
                        type='password' placeholder='Confirm Password'
                        name='confirmPassword'
                        onChange={e=> setConfirmPassword(e.target.value)}
                    />
                    <button disabled={username.length === 0 || password.length === 0} type="submit">REGISTRATI</button>

                    <span>
                        Possiedi un account?
                        <Link to="/">
                            <button>LOGIN</button>
                        </Link>
                    </span>
                </form>
            </div>
            <ToastContainer />
        </>
    )


}





