import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import "./classroom.css"


import SideBar from './SideBar'
import NavbarC from './NavbarC'
import SectionTitle from './SectionTitle';
import Cards from './Cards';
import Attendance from './Attendance';
import FooterClassroom from './FooterClassroom';
import MainNavbar from './MainNavbar';
import ChatroomWindow from './window/ChatroomWindow';
import WorkWindow from './window/WorkWindow';
import MemberWindow from './window/MemberWindow';
import PostModel from './window/PostModel';
import SubmittedAssignments from './SubmittedAssignments';
import { io } from "socket.io-client";
import './classroom.css';
import Post from './Post';


function Classrom() {

  const socket = io("http://localhost:8080", {
    transports: ["websocket"], 
    withCredentials: true
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showChatroom, setShowChatroom] = useState(false);
 
  // main navbar usestate
  const [islogout , setisLogout] =useState(false)
  const [curentSection, setCurentSection] = useState('classroom');

  //sidenavbar  
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const [cname, setCname] = useState('');
  const [currentclass, setCurrentClass] = useState('');
  const [member_id, setMember_id] = useState('')
  const [memberData, setMemberData] = useState([])

  //show modal 
  const [showModal, setShowModal] = useState(false);
  const [postV, setPostV] = useState(false)
  const [postData, setPostData] = useState([])
  const [postEdit, setPostEdit] = useState()

// assign 
const [asssignV, setAssignV] = useState(false)
const [assignData, setAssignData] = useState([])

  // messages 
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const navigate = useNavigate();
// recevie all msggg
// socket.on("chatMessage", (msg) => {
//   console.log(msg,messages);
  
//         if (msg.classroom_id === currentclass) {
//           setMessages((prevMessages) => [...prevMessages, msg]);
//         }
//         return () => {
//           socket.off("chatMessage"); // Cleanup
//         };
//       });
  
  useEffect(()=>{
    socket.on("chatMessage", (msg) => {
      console.log("New message received:", msg);

  
        
        setMessages((prevMessages) => [...prevMessages, msg]);
      
    });

    return () => {
      socket.off("chatMessage"); // ✅ Cleanup listener on unmount
    };
  },[])   

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

  function classSelect(row) {
    console.log("gotfsdfd  classroom",row.classroom_id);
    setCurrentClass(row.classroom_id);
    setCname(row.cname)

    
   
  }

  function SetMember(id) {
    setMember_id(id)
    console.log("we st set",id);
    
  }
  function SetMemberData(data) {
    setMemberData(data)
  }

// code for assign 

function filePrompt(path) {
  
}

function assignClick(data) {
  setAssignV(true)

  console.log("we go t you post here ", data);
 setAssignData(data)
  
}
function closeAssignt() {
  setAssignV(false)
}


/// code for post here:- 


function postClick(data) {
  setPostV(true)

  console.log("we go t you post here ", data);
 setPostData(data)
  
}
function closePost() {
  setPostV(false)
}

function onPostEdit(data) {
  setPostEdit(data)
  setShowModal(true)
  console.log("On Post edit clickeddd", data);
}

function onPostDel(data) {
  console.log(data.post_id);

  async function myget() {
      setIsLoading(true)
      axios.get('/classroom/delpost', {
        headers:{
          "post_id":data.post_id
        }
      })

        .then((response) => {
          console.log( response)


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
    setPostV(false)
}

  
/// code for floating Modal 

const handleOpenModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);


/// code for main navbar 

function setCurrentSection(data) {
  console.log("DL check for boolean",asssignV);
  
  setCurentSection(data)
}

/// logouttttt

  function onLogout() {
    Cookies.remove('jwt');
    navigate("/login")
    setisLogout(true)

  }

//// chatroom code 

  function onChatRoom(data) {
    setShowChatroom(data)
    console.log(messages);
    
  }

 

  // code of if get error and loading 

  if (isError) {
    return <div><h1>this is error </h1></div>;
  }

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

 

  const sendMessage = (msg) => {
    if (msg.trim()) {
      const chatData = {
        userId: member_id,
        username: memberData.fname + " " + memberData.lname,
        text: msg,
        classroom_id: currentclass,
      };
      socket.emit("chatMessage", chatData); // Send message to server
      setMessage(""); // Clear input field
    }
  };


const Modeldata = {
  member:member_id,
  class_id:currentclass,
  memberName: memberData.fname + " " + memberData.lname ,
}




  return (


    <div>

    <NavbarC toggleSidebar={toggleSidebar} />

    <MainNavbar setCurrentSection={setCurrentSection} onLogout={onLogout} data={Modeldata} memberName={Modeldata.memberName}/>

    <div style={{backgroundColor: "#f8f9fa"}} className="container-fluid">
    
   

     
      <div className="row">
      <div  className={`col-md-3 col-lg-2  sidebar ${sidebarOpen ? 'open' : ''}`}>
          <SideBar classSelect={classSelect} SetMember={SetMember}  SetMemberData={SetMemberData} />
        </div>

        <div style={{backgroundColor: "white"}} className="col-md-9 col-lg-10 main-content">
     
      

         
 
          <SectionTitle  data={Modeldata} onChatRoom={onChatRoom} cname={cname} />
          <div>
          {showChatroom ? <ChatroomWindow onChatRoom={onChatRoom} data={Modeldata} sendMessage={sendMessage} messages={messages}  /> : <p></p> }
          {postV ? <Post data={postData} member={Modeldata.member} closePost={closePost} onPostDel={onPostDel} onPostEdit={onPostEdit} /> : (curentSection === "classroom" && <Cards data={currentclass} member={Modeldata} postClick={postClick} />)}
          {asssignV ? (
  <SubmittedAssignments 
    data={assignData} 
    member={Modeldata.member} 
    closeAssignt={closeAssignt} 
    filePrompt={filePrompt}
  />
) : (
  curentSection === "work" && (
    <WorkWindow 
      data={currentclass} 
      modeldata={Modeldata} 
      assignClick={assignClick}  
    />
  )
)}


            {curentSection === "member" && <MemberWindow data={currentclass} />} {/* For "Member" */}
            {curentSection === "attendance" && <Attendance data={currentclass}/>}
            {showModal && <PostModel data={Modeldata} postEdit={postV ? (postEdit) : ({})} handleCloseModal={handleCloseModal} />}


            {(Modeldata.member.startsWith("prof")) && (
          <button className="btn btn-primary rounded-circle position-fixed" style={{ bottom: '2rem', right: '2rem' }}
           onClick={handleOpenModal}
          >
            +
          </button>
            )}


          </div>
         
        

          <FooterClassroom />
        </div>
      </div>
    </div>


    </div>
  )
}


export default Classrom