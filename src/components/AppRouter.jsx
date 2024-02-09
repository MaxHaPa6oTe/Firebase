import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import { privatRoutes, publicRoutes } from "../routes"
import { CHAT_ROUTE, LOGIN_ROUTE } from "../utils/config"
import Login from "./Login"
import {useAuthState} from 'react-firebase-hooks/auth'
import { useContext } from "react"
import { Context } from ".."
import Chat from "./Chat"

const AppRouter = () => {

    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    if (user) {        
        return <>
            <Routes>
            <Route path='*' Component={Chat} replace/>   
            </Routes>
        </>
    }
    return <>
        <Routes>
        <Route path='*' Component={Login} replace/>   
        </Routes>
    </>
}

export default AppRouter