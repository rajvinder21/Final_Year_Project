import React from 'react'
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./classroom.css";


export default function SectionTitle({ data, onChatRoom, cname }) {

  console.log("i go this ", data.member.startsWith('prof'));
  const navigate = useNavigate();

  function onChatClick() {
    onChatRoom(true)



  }

  function handleJoin() {
    console.log("delete this ", data.class);

    const dataa = {
      class_id: data.class,
      member_id: data.member_id,
      memberName: data.memberName,
    }

    console.log("i go this ", data.member);

    navigate('/videocall/meet', { state: data })
  }

  return (

    <div>

      <div className="banner-section">
        <h2 className="banner-title">{cname}</h2>
        <div className="banner-buttons">
          <button className="primary-btn " onClick={()=>{handleJoin()}}><i className="bi bi-camera-video-fill me-2"></i>
          <span>Join Call</span></button>

          {!(data.member.startsWith("prof")) && (
            <button onClick={()=>{onChatClick()}} className="secondary-btn"><i className="bi bi-chat-dots-fill me-2"></i>
            <span>Chat</span></button>
            )}

         
        </div>
      </div>


      

      <style>
        {`
  .title-underline {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, #4F46E5, #10B981);
    margin-top: 0.5rem;
  }

  .hover-lift {
    transition: all 0.2s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .hover-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    opacity: 0.9;
  }

  /* Force button colors */
  .btn-primary {
    background-color: #0d6efd !important;
    color: white !important;
  }

  .btn-success {
    background-color: #198754 !important;
    color: white !important;
  }

  @media (max-width: 768px) {
    .d-flex {
      flex-direction: column;
      gap: 1rem !important;
    }
    
    .btn {
      width: 100%;
      justify-content: center;
    }
  }
`}
      </style>
    </div>

  );
}
