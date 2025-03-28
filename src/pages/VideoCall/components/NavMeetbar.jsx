import React, { useState, useEffect, useRef } from "react";
import axios, { Axios } from "axios";

function NavMeetbar({ participants, member_id, class_id,memberName }) {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLectureOpen, setIsLectureOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
console.log(class_id);


  // lecture 

  const [lectureName, setLectureName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  

  // attend

  const [isAttendOpen, setIsAttendOpen] = useState(false)


  function handleClick(e) {

    setIsSidebarOpen(true)
    console.log("DL participant", participants);
    let particilist = participants.forEach((value, key) => {
      console.log(value.displayName);
    });

    console.log("DL partii", particilist);


  }

  function lecturesubmit() {
    setIsLectureOpen(false)
console.log(class_id,member_id,lectureName);

    axios.post('/videocall/setlecture', {
      classroom_id: class_id ,
      member_id:member_id ,
      lectureName:lectureName ,
      startTime:startTime ,
      endTime:endTime
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    )

      .then((response) => {
        console.log("take attendence ", response);




      })
      .catch((err) => {
        console.log(err);
        setIsError(true)


      })
      .finally(() => {
        setIsLoading(false)
        setIsAttendOpen(true)

      })
  }

  function handdleAttend(e) {
    setIsLectureOpen(true)

    let particilist = [];
    participants.forEach((value, key) => {
      console.log(value.displayName.split('+')[1].trim());

      particilist.push(value.displayName.split('+')[1].trim())
    });

    console.log(particilist);

    // axios.post('/videocall/takeattendence',{ 
    //   classroom_id: data 

    //   }
    // )

    //   .then((response) => {
    //     console.log("take attendence ", response.data);




    //   }) 
    //   .catch((err) => {
    //     console.log(err);
    //     setIsError(true)


    //   })
    //   .finally(() => {
    //     setIsLoading(false)

    //   })
  }

  const styles = `
    .sidebar {
      right: -250px;
      transition: right 0.3s ease-in-out;
    }
    .sidebar.show {
      right: 0;
      z-index:3;
    }
.lecture-window {
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  padding: 20px 25px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 90%;
  max-width: 400px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.lecture-heading {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 20px;
  text-align: center;
}

.lecture-label {
  display: block;
  margin-top: 12px;
  font-weight: 600;
  color: #333;
}

.lecture-input {
  width: 100%;
  padding: 10px;
  margin-top: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

.lecture-button {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.lecture-button:hover {
  background-color: #0056b3;
}

/* Responsive tweaks */
@media (max-width: 480px) {
  .lecture-window {
    top: 10%;
    padding: 16px 20px;
  }

  .lecture-heading {
    font-size: 18px;
  }

  .lecture-input,
  .lecture-button {
    font-size: 13px;
  }
}


  `;


  if (isError) {
    console.log("this is place");

    return <div><h1>something went wrong </h1></div>;
  }

  if (isLoading) {
    return <div><h1>this is loading </h1></div>;
  }


  return (
    <>
      <style>{styles}</style>
      <nav className="navbar navbar-dark bg-dark shadow-sm py-3">
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand" href="#">Company Logo</a>


          <div className="d-flex align-items-center gap-3">
            <a href="#" onClick={handleClick} className="d-flex align-items-center text-white d-none d-sm-flex">
              <i className="bi bi-people me-1"></i> <span className="d-none d-md-inline">Participants</span>
            </a>
            <a href="#" onClick={handdleAttend} className="d-flex align-items-center text-white d-none d-sm-flex">
              <i className="bi bi-gear me-1"></i> <span className="d-none d-md-inline" >Take Attendance</span>
            </a>
          </div>
        </div>
      </nav>
      {isSidebarOpen &&
        <div
          className={`sidebar bg-dark text-white position-fixed top-0 end-0 h-100 p-3 show`}
          style={{ width: "250px", transition: "0.3s", right: "0" }}
        >
          <button className="btn btn-light mb-3" onClick={() => setIsSidebarOpen(false)}>Close</button>
          <h5>Participants</h5>
          <ul className="list-unstyled">

            {[...participants.values()].map((parti) => (

              <li key={parti.displayName}>{parti.displayName.split('+')[0].trim()} {parti.member_id}</li>


            ))}



          </ul>
        </div>
      }

      {isLectureOpen && <div className="lecture-window">
        <h2 className="lecture-heading">Lecture Details</h2>

        <label className="lecture-label">Lecture Name:</label>
        <input
          type="text"
          value={lectureName}
          onChange={(e) => setLectureName(e.target.value)}
          placeholder="Enter lecture name"
          className="lecture-input"
        />

        <label className="lecture-label">Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="lecture-input"
        />

        <label className="lecture-label">End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="lecture-input"
        />

        <button onClick={lecturesubmit} className="lecture-button">Submit</button>
      </div>
      }
    </>
  );
}

export default NavMeetbar;