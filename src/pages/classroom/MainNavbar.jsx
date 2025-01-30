import React, { useState } from 'react';
;

import { useNavigate, Link } from "react-router-dom";

export default function MainNavbar({setCurrentSection,onLogout}) {
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


  function logout() {
    onLogout()

  }

  

  return (
    <div>
        
        <div className="d-none d-md-flex justify-content-between align-items-center mb-4">
    <h5>@ Virtual Classroom</h5>

    {/* This is the section where the links will be added */}
    <div className="d-flex justify-content-center mx-auto ">
    
      <a className="nav-link px-3" href="#" onClick={onClassroomClick}>Classroom </a>
      <a className="nav-link px-3" href="#" onClick={onWork}> Work </a>
      <a className="nav-link px-2" href="#" onClick={onMember}> Member</a>
    </div>

    <button className="btn btn-outline-secondary" onClick={logout}>Logout</button>
  </div>

    </div>
  )
}
