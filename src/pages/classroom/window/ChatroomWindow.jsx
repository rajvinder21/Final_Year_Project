import React from 'react'

function ChatroomWindow({onChatRoom}) {


function onLeave() {
    onChatRoom(false)
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
    {/* Example Messages */}
    <div className="d-flex flex-column mb-3">
      {/* Received Message */}
      <div className="text-start">
        <div className="bg-light p-3 rounded">
          <strong>User 1:</strong>
          <p className="mb-0">Hello, how are you?</p>
        </div>
      </div>

      {/* Sent Message */}
      <div className="text-end mt-3">
        <div className="bg-primary text-white p-3 rounded">
          <strong>Me:</strong>
          <p className="mb-0">I'm doing great, thanks!</p>
        </div>
      </div>
    </div>
  </div>

  {/* Message Input Section */}
  <div className="card-footer p-3">
    <form className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Type your message..."
      />
      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  </div>
</div>
</div>

  )
}

export default ChatroomWindow