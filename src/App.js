import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { path } from './constants/path';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './view/auth/login';
import Register from './view/auth/register';
import UserProfile from './view/user/userProfile';
import Otp from './view/auth/otp';


const App = () => {
    return (
        <>
            <BrowserRouter >
                <Routes>
                    <Route path={path.login} element={<Login />} />
                    <Route path={path.register} element={<Register />} />
                    <Route path={path.home} element={<UserProfile />} />
                    <Route path={path.otp} element={<Otp />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>

    )
}

export default App