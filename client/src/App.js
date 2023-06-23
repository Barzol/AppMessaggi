import './App.css';
import {useContext} from "react";
import {UserContext, UserContextProvider} from "./components/UserContext";
import Chat from "./pages/Chat";

export default function App(){
    const {username, id} = useContext(UserContext);

    return(
        <Chat />
    );

}

