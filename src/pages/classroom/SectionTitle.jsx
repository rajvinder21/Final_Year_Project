import React from 'react'
import { useNavigate } from "react-router-dom";

export default function SectionTitle({ data,onChatRoom }) {
const navigate = useNavigate();

function onChatClick() {
  onChatRoom(true)
}

function handleJoin() {
  console.log("delete this ", data.class);
  
  const dataa = {
    class_id:data.class,
    member_id:data.member_id,
    memberName:data.memberName
  }

  console.log("i go this ",data.member);
  
  navigate('/videocall/meet',{state:data})
}

  return (

    <div>
<div 
  className="d-flex justify-content-between align-items-center mb-4 p-4 rounded-3 shadow-sm position-relative"
  style={{
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95))')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
  <div className="position-relative w-100">
    {/* Title Section */}
    <div className="section-title mb-3">
      <h3 className="h4 fw-bold text-dark mb-2">
        Science
        <div className="title-underline"></div>
      </h3>
    </div>

    {/* Buttons Section - Updated for visibility */}
    <div className="d-flex gap-3">
      <button onClick={handleJoin} className="btn btn-primary px-4 py-2 hover-lift">
        <i className="bi bi-camera-video-fill me-2"></i>
        <span>Join Call</span>
      </button>
      
      <button className="btn btn-success px-4 py-2 hover-lift" onClick={onChatClick}>
        <i className="bi bi-chat-dots-fill me-2"></i>
        <span>Chat</span>
      </button>
    </div>
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
