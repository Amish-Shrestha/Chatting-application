import { Avatar } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import db from './firebase';
import './SidebarChat.css';
import {Link} from "react-router-dom";

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';


function SidebarChat({id, name,addNewChat}) {
    const [ seed, setSeed] = useState('');
    const [messages, setMessages] = useState([]);
    const [chat , setChat] = useState('');

    const [open, setOpen] = React.useState(false);

    useEffect(() => { 
        if (id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) =>
                setMessages(snapshot.docs.map((doc)=>
                doc.data()))
            )
        }
    }, [id])

    useEffect(() =>{
        setSeed(Math.floor(Math.random() * 5000));

    },[])

    const handleClickOpen = () => {
            setOpen(true);
          };
          
          const handleClose = () => {
            setOpen(false);
          };

    const createChat = () =>{       

        const roomName = chat;   
        if ( roomName){
            db.collection("rooms").add({
                name: roomName,
            });
        }

    };
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className='sidebarChat_info'>
            <h1>{name}</h1>
            <p>{messages[0]?.message}</p>
            <button onClick={event => db.collection('rooms').doc(id).delete()}>Delete</button>
        </div>
       
        </div>
        </Link>
        
    ):(
        <div onClick={handleClickOpen} className="sidebarChat"> 
        <h2>Add new chat</h2>
        
        <Dialog open={open} onClose={handleClose} >
        <DialogTitle>
           <input type='text' onChange = {(e) => setChat(e.target.value)} />
        </DialogTitle>
            <button onClick={() => createChat()}>Create</button>
        </Dialog>

        
        </div>
    )
}

export default SidebarChat
