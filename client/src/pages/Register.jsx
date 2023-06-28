import React, {useContext} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {useState} from "react";
import './Register.css'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {UserContext} from "../components/UserContext";
import {registerRoute} from "../APIroutes";


export default function Register(){
    const [data, setData] = useState({
        username:'', password:''
    })
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

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
                const {username, password} = data
                const infos = await axios.post(registerRoute, {username,password})

                if(infos.status === 400){
                    toast.error(infos.data.msg,window)
                }else if(infos.status === 200){
                    const info = infos.data.user
                    localStorage.setItem('user', JSON.stringify({info}))

                }

                navigate('/chats')

            }catch(error){
                toast.error(error, window)
            }
        }
    }

    const handleChange = (event) => {
        setData({ ...data,[event.target.name]: event.target.value})
    }

    const handleVerify = (event) => {
        if(data.password !== confirmPassword){
            toast.error('Le password non coincidono', window )
            return false
        } else if(data.username.length < 2) {
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
                        value={data.username}
                        id='usernameRegister'
                        type='text' placeholder='Username'
                        name='username'
                        onChange={e=> handleChange(e)}
                    />
                    <input
                        value={data.password}
                        id='passwordRegister'
                        type='password' placeholder='Password'
                        name='password'
                        onChange={e=> handleChange(e)}
                    />
                    <input
                        value={confirmPassword}
                        id='confirmPassRegister'
                        type='password' placeholder='Confirm Password'
                        name='confirmPassword'
                        onChange={e=> setConfirmPassword(e.target.value)}
                    />
                    <button disabled={data.username.length === 0 || data.password.length === 0} type="submit">REGISTRATI</button>

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





