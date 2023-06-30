import React, {useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import './Friendpage.css'
import axios from "axios";
import {addFriendRoute} from "../APIroutes";
import {toast, ToastContainer} from "react-toastify";

export default function AddFriend() {
    const [friend, setFriend] = useState({
        username:''
    })
    const navigate = useNavigate()

    const window = {
        position: "bottom-right",
        autoclose: 6000,
        draggable: true,
        theme: "dark"
    }
    /*
    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate('chats')
        }
    })

     */

    const handleVerify = () => {
        if(friend.username=== ""){
            toast.error('Username richiesto', window)
            return false
        } else {
            return true
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (handleVerify()) {
            try {
                const {username} = friend
                const infos = await axios.post(addFriendRoute, {username})

                if(infos.status === 400){
                    toast.error(infos.data.msg, window)
            }
                navigate('/chats')

        } catch (error){
                toast.error(error, window)}
        }
    }



    const handleChange = (event) => {
        setFriend({ ...friend,[event.target.name]: event.target.value})
    }

    return(
        <>
            <div className="form-friend">
                <form>
                    <input
                    value={friend.username}
                    type='text' placeholder='Username'
                    name='username'
                    onChange={e=> handleChange(e)}
                    />
                    <button disabled={friend.username.length === 0} type="submit">Aggiungi</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}