import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import './Register.css'
import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";
import {loginRoute} from "../APIroutes";

export default function Login(){
    //const [username, setUsername] = useState('')
    //const [password, setPassword] = useState('')
    const [data, setData] = useState({
        username:'', password:''
    })
    //const {setInfo:setLoggedIn, setId} = useContext(UserContext)
    const navigate = useNavigate()

    const window = {
        position: "bottom-right",
        autoclose: 6000,
        draggable: true,
        theme: "dark"
    }

    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/chats')
        }
    })


    const handleSubmit = async (event) => {
        event.preventDefault()
        if(handleVerify()) {
            try{
                const {username, password} = data
                const infos = await axios.post(loginRoute, {username,password})

                if(infos.status === 400){
                    toast.error(infos.data.msg, window)

                } else if(infos.status === 200) {
                    const info = infos.data.user
                    console.log(info)
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

    //Questo è inutile è può essere omesso perchè il button non si attiva se i campi sono vuoti
    const handleVerify = () => {
        if(data.password === ""){
            toast.error('Password richiesta', window )
            return false
        } else if(data.username===""){
            toast.error('Username richiesto', window )
            return false
        } else {
            return true
        }
    }

    return (
        <>
            <div id='FormContainer'>
                <form id='form' onSubmit={handleSubmit}>
                    <input
                        value={data.username}
                        id='usernameLogin'
                        type='text' placeholder='Username'
                        name='username'
                        onChange={e=> handleChange(e)}
                    />
                    <input
                        value={data.password}
                        id='passwordLogin'
                        type='password' placeholder='Password'
                        name='password'
                        onChange={e=> handleChange(e)}
                    />
                    <button disabled={data.username.length === 0 || data.password.length === 0} type="submit">LOGIN</button>

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



