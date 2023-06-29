import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import './Friendpage.css'
import axios from "axios";
import {loginRoute} from "../APIroutes";

export default function addFriend() {
    const [data, setData] = useState({
        username:''
    })

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('user')){
            navigate('chats')
        }
    })

    return(
        <>
            <div className="form-friend">
                <form>
                    <input
                        value={data.username}
                        type='text' placeholder='Username'
                        name='username'
                    />
                    <button disabled={data.username.length === 0} type="submit">Rimuovi</button>
                </form>
            </div>
        </>
    )
}

