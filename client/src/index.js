import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from 'axios'
import {UserContextProvider} from "./components/UserContext";

axios.defaults.baseURL = 'http://localhost:4000'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>

            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/chats" element={<App />}/>
            </Routes>

    </BrowserRouter>
)

