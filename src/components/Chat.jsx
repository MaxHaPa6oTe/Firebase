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
    <div className='center'>
    <div className='Chat'>
        {message.map(mess=>
        <div className='Message' 
        style={{justifyContent: user.uid === mess.uid? 'end' : ''}}>
            <div>
            <div className='Mess1'>
            <img src={mess.photoURL} alt='' style={{width:'50px',height:'50px',borderRadius:'50%'}}/>
            <span><i>{mess.displayName}</i></span>
            </div>
            
            <p><b>
            {mess.text}
            </b></p>
        
        {/* <span>{String(new Date(+mess.createdAt.seconds * 1000))}</span> */}
        </div>
        </div>)}
        <div className='Form'>
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
    
    </div>
    </div>
    </>
}

export default Chat