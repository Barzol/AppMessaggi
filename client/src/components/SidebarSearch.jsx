import React, { useState } from "react";
import "./Sidebar.css";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ friends, setFriends }) {
    const [input, setInput] = useState('');


    const handleChange = (e) => {

        const filtered = friends.filter( friend => {
            return friend.username
        })
        setFriends(filtered);
    };

    return (
        <div className="sidebar-searc">
            <div className="sidebar_search_container">
                <SearchIcon />
                <input type="text" placeholder="cerca o inizia una nuova chat"
                       /*value = {input}*/
                       onChange={e=>handleChange(e)}
                ></input>
            </div>
        </div>

    );
};