/*
Utilizziamo Context perchè i dati relativi a username e password devono essere usati
da molti componenti e per evitare di richiamare molte volte le stesse props
createContext permette di creare un oggetto Context
Inoltre ogni componente Context è in coppia con un componente figlio Provider che
permette ai componenti di vedere i cambiamenti in Context
Il Provider quindi ha una o più prop che passa ai componenti discendenti del Provider
 */

import {createContext, useEffect, useState} from "react";
import axios from 'axios'

export const UserContext=createContext({})

export function UserContextProvider({children}) {
    const [username, setUsername] = useState(null)
    const[id, setId] = useState(null)
    useEffect(() => {

    },[])

    return(
        <UserContextProvider value={{username,setUsername,id,setId}}>
            {children}
        </UserContextProvider>
    )
}
