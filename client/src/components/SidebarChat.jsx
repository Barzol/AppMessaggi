import {useEffect, useState} from "react";
import "./SidebarChat.css";

export default function SidebarChat(contacts, loggedUser){
    const [userName,setUserName] = useState()
    const [selected, setSelected] = useState()
    useEffect((userName) => {
        setUserName(loggedUser.username)
    },[loggedUser])

        return(
            <div className="sidebarChat">
                {/*aggiungere avatar*/}
                <div className="sidebarChat_info">

                    <h2>Name</h2>
                    <p>Message</p>
                </div>
            </div>
        );


}