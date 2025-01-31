import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";

import SideBar from './SideBar'
import NavbarC from './NavbarC'
import SectionTitle from './SectionTitle';
import Cards from './Cards';
import FooterClassroom from './FooterClassroom';
import MainNavbar from './MainNavbar';
import ChatroomWindow from './window/ChatroomWindow';
import WorkWindow from './window/WorkWindow';
import MemberWindow from './window/MemberWindow';
import PostModel from './window/PostModel';
import './classroom.css';



function Classrom() {

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showChatroom, setShowChatroom] = useState(false);
 
  // main navbar usestate
  const [islogout , setisLogout] =useState(false)
  const [curentSection, setCurentSection] = useState('classroom');

  //sidenavbar  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentclass, setCurrentClass] = useState('');
  const [member_id, setMember_id] = useState('')

  //show modal 
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    async function myget() {
      setIsLoading(true)
      axios.get('/classroom')

        .then((response) => {
          console.log("classroom", response);

          if (response.data.confirm || undefined) {
            navigate("/login")
            console.log("wgot dat ", confirm);
          }



        })
        .catch((err) => {
          console.log(err);
          setIsError(true)


        })
        .finally(() => {
          setIsLoading(false)

        })
    }
    myget()

  }, [])


  /// this  section code is for trigering some action 



  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  function classSelect(id) {
    console.log("got classroom",id);
    setCurrentClass(id)
  }

  function SetMember(id) {
    setMember_id(id)
    console.log("we st set",id);
    
  }
  
/// code for floating Modal 

const handleOpenModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);


/// code for main navbar 

function setCurrentSection(data) {
  setCurentSection(data)
}

/// logouttttt

  function onLogout() {
    Cookies.remove('jwt');
    setisLogout(true)

  }

//// chatroom code 

  function onChatRoom(data) {
    setShowChatroom(data)
  }

 

  // code of if get error and loading 

  if (isLoading) {
    return <div><h1>this is loading </h1></div>;
  }

  if (islogout) {
    navigate('/')
    return (
      <div>
        <h2>logining outtttttttttt.........</h2>
      </div>
    );
  }

const Modeldata = {
  member:member_id,
  class:currentclass
}
  

  return (
    <div className="container-fluid">
      <NavbarC toggleSidebar={toggleSidebar} />
      <div className="row">
      <div className={`col-md-3 col-lg-2 h-100 sidebar ${sidebarOpen ? 'open' : ''}`}>
          <SideBar classSelect={classSelect} SetMember={SetMember} />
        </div>

        <div className="col-md-9 col-lg-10 main-content">
     
          <MainNavbar setCurrentSection={setCurrentSection} onLogout={onLogout}/>
      

         
 
          <SectionTitle title="Science" onChatRoom={onChatRoom} />
          <div>
          {showChatroom ? <ChatroomWindow onChatRoom={onChatRoom} /> : <p></p> }
          {curentSection === "classroom" && <Cards data={currentclass} />}
            {curentSection === "work" && <WorkWindow data={Modeldata}/>} {/* For "Work" */}
            {curentSection === "member" && <MemberWindow data={currentclass} />} {/* For "Member" */}
           
            {showModal && <PostModel data={Modeldata} handleCloseModal={handleCloseModal} />}

          <button className="btn btn-primary rounded-circle position-fixed" style={{ bottom: '2rem', right: '2rem' }}
           onClick={handleOpenModal}
          >
            +
          </button>



          </div>
         
        

          <FooterClassroom />
        </div>
      </div>
    </div>
  )
}


export default Classrom