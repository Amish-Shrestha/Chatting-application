import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined } from "@material-ui/icons";
import MoreVert from "@material-ui/icons/MoreVert";
import React, { useState, useEffect, Component } from "react";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase/compat/app";
import { Offcanvas } from "react-bootstrap";
import Chat_Bot from "./Chat_Bot";

// import { useForm } from "react-hook-form";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, disptach] = useStateValue();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // const submit = (e) => {
  //   console.log(e)
  // }

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  var startTime = performance.now()
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed >>>", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");

    
  };
  var endTime = performance.now()
  console.log(`estimated time:(${endTime - startTime}).toFixed(2)`)
 
 const anything= ()=>{

 }

  
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_headerInfo">
          <h6>{roomName}</h6>
          <p>
            last seen at...
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <label htmlFor="upload-file">
              <input
                style={{ display: "none" }}
                id="upload-file"
                type="file"
              />
              <AttachFile />
            </label>
          </IconButton>

          <IconButton onClick={handleShow}>
            <MoreVert />
          </IconButton>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>ChatBot</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Chat_Bot />
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${message.name === user.displayName && "chat_reciever"
              }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            {" "}
            Send a message
          </button>
        </form>
      </div>
      {/* <ChatBOT/> */}
    </div>
  );
}

export default Chat;

// export class ChatBOT extends Component {
//   componentDidMount(){
//     (function(d, m){
//         var kommunicateSettings = 
//             {"appId":"1ad57c9855fa043988261b3dab3a74ee9","popupWidget":true,"automaticChatOpenOnNavigation":true};
//         var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
//         s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
//         var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
//         window.kommunicate = m; m._globals = kommunicateSettings;
//     })(document, window.kommunicate || {});
// /* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */

//   }
// }