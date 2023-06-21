import React, { useState }from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton, Menu, MenuItem} from "@mui/material";

export default function SidebarMenu() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <MenuItem onClick={handleClose}>Aggiungi amico</MenuItem>
                <MenuItem onClick={handleClose}>Rimuovi amico</MenuItem>
                <MenuItem onClick={handleClose} className="logout">Log out</MenuItem>
            </Menu>
        </div>
    );
}
