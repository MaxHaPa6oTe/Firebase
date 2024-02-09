import { useContext } from "react"
import { Context } from ".."
import firebase from "firebase/compat/app";

const Login = () => {
    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const user = await auth.signInWithPopup(provider)
        console.log(user)
    }
    const {auth} = useContext(Context)
    return <div className="Login">
    <button onClick={login}>войти с помощью гугла</button>
    </div>
}

export default Login