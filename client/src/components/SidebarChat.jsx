import react from "react";
import "./SidebarChat.css";

export default function SidebarChat(){
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