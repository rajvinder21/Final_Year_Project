import React, { useState } from 'react';
;
import './classroom.css';
import { useNavigate, Link,data } from "react-router-dom";

export default function MainNavbar({setCurrentSection,onLogout,data,memberName}) {
  const [tool, setTool] = useState(false)
   const navigate = useNavigate();

  

  function onClassroomClick() {
    setCurrentSection('classroom')
  }

  function onWork() {
    setCurrentSection('work')
  }

  function onMember() {
    setCurrentSection('member')
  }

  function onAttendance() {
    setCurrentSection('attendance')
  }


  function logout() {
    onLogout()

  }

  

  return (
    <div>

<nav className="custom-navbar">
      {/* Left: Logo */}
      <div className="navbar-logo">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <h3 style={{display:"inline"}}>Classrom</h3>
      </div>

      {/* Center: Navigation Links */}
      <ul className="nav-links">
        <li><a  href="#" onClick={onClassroomClick}>Classroom </a></li>
        <li> <a  href="#" onClick={onWork}> Work </a></li>
        <li>  <a  href="#" onClick={onMember}> Member</a></li>
        {data.member?.substring(0, 4) === "prof" ? (<li>
  <a  href="#" onClick={onAttendance}> 
    Attendance
  </a>
  </li>
) : null}
        
      </ul>

      {/* Right: Profile Icon */}
      <div className="avatar-container">
        <button className="avatar-btn" onClick={()=>{setTool(!tool)}}>A</button>
      </div>

      {tool && (
          <div className="tooltip-dropdown">
            <p className="tooltip-name" >Member Name:- {memberName}r</p>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>        
        )}
    </nav>

        
       

    </div>
  )
}
