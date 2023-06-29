import React, { useState }from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton, Menu, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function SidebarMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAdd = async () => {
        navigate('/')
    }

    const handleRemove = async () => {
        navigate('/')
    }

    const handleLogOut = async () => {
        //funzione per pulizia delle cache del browser
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className="sidebar_header_right">
            <IconButton onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleAdd} className="add">Aggiungi amico</MenuItem>
                <MenuItem onClick={handleRemove} className="remove">Rimuovi amico</MenuItem>
                <MenuItem onClick={handleLogOut} className="logout">Log out</MenuItem>
            </Menu>
        </div>
    );
}
