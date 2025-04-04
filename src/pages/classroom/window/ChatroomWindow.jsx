import React, { useEffect, useState } from 'react';




function ChatroomWindow({ onChatRoom, data , sendMessage,messages,getMsg }) {
  const [message, setMessage] = useState("");
  //  const [messages, setMessages] = useState([]);

  // const socket = io("http://localhost:8080", {
  //   transports: ["websocket"], // Ensure WebSocket is used
  //   withCredentials: true,
  // });;

  
  function onLeave() {
    onChatRoom(false)
  }

  function sendMessages(msg) {
    sendMessage(msg)
    console.log(msg);
    
    setMessage("")
  }

  return (

    <div className="container mt-5">
  {/* Chatroom Header */}
  <div className="card">
    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
      <h5 className="mb-0">Chatroom</h5>
      <button className="btn btn-light btn-sm" onClick={onLeave}>Leave</button>
    </div>

    {/* Chat Messages Section */}
    <div
      className="card-body overflow-auto"
      style={{ height: "400px", padding: "20px" }}
    >
      {/* Chat Messages */}
      {messages.map((msg, index) => (
        <div key={index} className={`d-flex flex-column mb-3 ${msg.userId === data.member ? "align-items-end" : "align-items-start"}`}>
          <div className={`p-3 rounded ${msg.userId === data.member ? "bg-primary text-white" : "bg-light"}`}>
            <strong>{msg.userId === data.member ? "Me" : msg.username}:</strong>
            <p className="mb-0">{msg.text}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Message Input Section */}
    <div className="card-footer p-3">
      <form className="d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <p type="button" onClick={()=>{sendMessages(message)}} className="btn btn-primary">
          Send
        </p>
      </form>
    </div>
  </div>
</div>


    // <div className="container mt-5">
    //   {/* Chatroom Header */}
    //   <div className="card">
    //     <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
    //       <h5 className="mb-0">Chatroom</h5>
    //       <button className="btn btn-light btn-sm" onClick={onLeave}>Leave</button>
    //     </div>

    //     {/* Chat Messages Section */}
    //     <div
    //       className="card-body overflow-auto"
    //       style={{ height: "400px", padding: "20px" }}
    //     >
    //       {/* Example Messages */}
    //       <div className="d-flex flex-column mb-3">
    //         {/* Received Message */}
           
    //         <div className="text-start">
    //           <div className="bg-light p-3 rounded">
    //             <strong>User 1:</strong>
    //             {messages.map((msg, index) => (
    //               <p className="mb-0">{msg}</p>
    //             ))}
    //           </div>
    //         </div>

    //         {/* Sent Message */}
    //         <div className="text-end mt-3">
    //           <div className="bg-primary text-white p-3 rounded">
    //             <strong>Me:</strong>
    //             <p className="mb-0">I'm doing great, thanks!</p>
    //           </div>
    //         </div>
    //       </div>

    //     </div>

    //     {/* Message Input Section */}
    //     <div className="card-footer p-3">
    //       <form className="d-flex">
    //         <input
    //           type="text"
    //           className="form-control me-2"
    //           placeholder="Type your message..."
    //           value={message}
    //           onChange={(e) => setMessage(e.target.value)}
    //         />
    //         <p type="submit" onClick={sendMessage} className="btn btn-primary">
    //           Send
    //         </p>
    //       </form>
    //     </div>
    //   </div>
    // </div>

  )
}

export default ChatroomWindow