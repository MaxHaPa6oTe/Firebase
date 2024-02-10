import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { Context } from ".."
import {useAuthState} from 'react-firebase-hooks/auth'

const NavBar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)
    return <div className="NavBar">
        {user?
    <NavLink>
    <button
    onClick={()=>auth.signOut()}
    >выйти</button>
    </NavLink>
    :null
    }    
    </div>
}

export default NavBar