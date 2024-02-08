import { useContext, useState } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { Context } from '..'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import Loader from './Loader'

const Chat = () => {
    const {auth, firestore, firebase} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')

    const [message, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )

    const senddMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('')
    }

    if (loading) {
        return <Loader />
    }

    return <>
    <div>
        {message.map(mess=>
        <div>
            <img src={mess.photoURL} alt='' style={{width:'50px',height:'50px',borderRadius:'50%'}}/>
            <span>{mess.displayName}</span>
            <p style={{backgroundColor: user.uid === mess.uid? 'green' : 'gray'}}>
            {mess.text}
        </p>
        {/* <span>{String(new Date(+mess.createdAt.seconds * 1000))}</span> */}
        </div>)}
    <form onSubmit={e=>e.preventDefault()}>
        <input type='text'
        value={value}
        onChange={e=>setValue(e.target.value)}
        />
        <button onClick={senddMessage}>
            отправить
        </button>
    </form>
    </div>
    </>
}

export default Chat