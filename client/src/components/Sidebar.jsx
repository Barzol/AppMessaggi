import React from 'react'
import Button from '@mui/material/Button'

export default function Sidebar(loggedUser){

    // aggiungere collegamento con il logged user per far vedere solo le chat
    // dell'utente loggato
    return(
        <div>
            <ul>
                <Button description='Chat1' url='/:chatId' variant="contained"/>
                <Button description='Chat2' url='/:chatId' variant="contained"/>
                <Button description='Chat3' url='/:chatId' variant="contained"/>
            </ul>
        </div>
    )
}
