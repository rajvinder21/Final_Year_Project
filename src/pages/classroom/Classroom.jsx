import React, { useState } from 'react'
import SideBar from './SideBar'
import NavbarC from './NavbarC'
import SectionTitle from './SectionTitle';
import Cards from './Cards';
import FooterClassroom from './FooterClassroom';
import './classroom.css';



function Classrom() {
    const [sidebarOpen, setSidebarOpen] = useState(false);


    function toggleSidebar() {
        setSidebarOpen(!sidebarOpen);
      }



  return (
    <div className="container-fluid">
      <NavbarC toggleSidebar={toggleSidebar} />
      <div className="row">
        <div className={`col-md-3 col-lg-2 sidebar ${sidebarOpen ? 'open' : ''}`}>
          <SideBar />
        </div>

        <div className="col-md-9 col-lg-10 main-content">
          <div className="d-none d-md-flex justify-content-between align-items-center mb-4">
            <h5>@ Virtual Classroom</h5>
            <button className="btn btn-outline-secondary">Button</button>
          </div>

          <SectionTitle title="Science" />
          <Cards />

          <button className="btn btn-primary rounded-circle position-fixed" style={{ bottom: '2rem', right: '2rem' }}>
            +
          </button>

          <FooterClassroom />
        </div>
      </div>
    </div>
  )
}


export default Classrom