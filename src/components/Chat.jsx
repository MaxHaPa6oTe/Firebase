import { useContext, useState } from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { Context } from '..'
import {useCollection} from 'react-firebase-hooks/firestore'
import Loader from './Loader'

const Chat = () => {
    const {auth, firestore, firebase} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [visible, setVisible] = useState(false)

    const [message, loading] = useCollection(
        firestore.collection('messages').orderBy('createdAt')
    )

    const deleteMessage = async (id) => {
        let x = window.confirm("Хотите удалить свое сообщение?");
        if (x) firestore.collection('messages').doc(id).delete()
    }
   
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
        {message.docs.map(mess=>
        <div className='Message'
        style={{justifyContent: user.uid === mess.data().uid? 'end' : ''}}>
            <div style={{maxWidth:'300px'}}>
            <div className='Mess1'>
            <img src={mess.data().photoURL} alt='' style={{width:'50px',height:'50px',borderRadius:'50%'}}/>
            <span><i>{mess.data().displayName}</i></span>
            </div>
            
            <div className='Mess2' onMouseEnter={()=>setVisible(mess.id)} onMouseLeave={()=>setVisible(-1)}>
            <p><b>
            {mess.data().text}
            </b><br/>
            </p>
            {visible === mess.id && mess.data().uid === user.uid?<span onClick={()=>deleteMessage(mess.id)}>
                удалить
            </span>:<div style={{height:'14.81px'}}/>}
            </div>
        {/* <span>{String(new Date(+mess.createdAt.seconds * 1000))}</span> */}
        </div>
        </div>)}
    
    </div>
    <div className='Form'>
    <form onSubmit={e=>e.preventDefault()}>
        <textarea rows="2" maxLength={150}
        value={value}
        onChange={e=>setValue(e.target.value)}
        />
        <button onClick={senddMessage}>
            отправить
        </button>
    </form>
    </div>
    </div>
    </>
}

export default Chat