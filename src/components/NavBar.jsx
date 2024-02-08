import { NavLink } from "react-router-dom"
import { LOGIN_ROUTE } from "../utils/config"
import { useContext } from "react"
import { Context } from ".."
import {useAuthState} from 'react-firebase-hooks/auth'

const NavBar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return <div>
        {user?
    <NavLink>
    <button
    onClick={()=>auth.signOut()}
    >выйти</button>
    </NavLink>
    :<NavLink to={LOGIN_ROUTE}>
    <button>логин</button>
    </NavLink>
    }    
    </div>
}

export default NavBar