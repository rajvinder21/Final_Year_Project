import React, { useState, useEffect, useRef } from "react";
import axios, { Axios } from "axios";
import { MeetingProvider, useMeeting } from "@videosdk.live/react-sdk";


function NavMeetbar({ participants, member_id, class_id, memberName, meetingId }) {
  const meeting = useMeeting();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLectureOpen, setIsLectureOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [takeName, setTakeName] = useState(false)
  console.log(class_id);


  // lecture 

  const [lectureName, setLectureName] = useState('');
  const [lecture_id, setLecture_id] = useState('')
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');


  // attend
  const [allMember, setAllMember] = useState([])
  let memberr;
  const [absentMember, setAbsentMenmber] = useState([])
  const [presentMember, setPresentMember] = useState([])
  const [isAttendOpen, setIsAttendOpen] = useState(false)
  const [attendStatus, setAttendStatus] = useState("")


  function handleClick(e) {

    setIsSidebarOpen(true)
    console.log("DL participant", participants);
    let particilist = participants.forEach((value, key) => {
      console.log(value.displayName);
    });

    console.log("DL partii", particilist);


  }

  function lecturesubmit() {
    setIsLectureOpen(true)
    console.log(class_id, member_id, lectureName);

    axios.post('/videocall/setlecture', {
      classroom_id: class_id,
      member_id: member_id,
      lectureName: lectureName,
      lecture_id: lecture_id,
      startTime: startTime,
      endTime: endTime
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    )

      .then((response) => {
        console.log("take attendence ", response);
        // setLecture_id(response.data.lecture_id)
        console.log(response.data.lecture_id, response.data.allmember);

        setAllMember(response.data.allmember)
        memberr = response.data.allmember;
        setPresentMember(response.data.allmember)




      })
      .catch((err) => {
        console.log(err);
        setIsError(true)


      })
      .finally(() => {
        setIsLoading(false)
        setIsLectureOpen(false)
        setIsAttendOpen(true)
        attendCal()

      })
  }

  const markPresent = (student) => {
    setPresentMember([...presentMember, student]);
    setAbsentMenmber(absentMember.filter((s) => (s.professsor_id || s.student_id) !== (student.professsor_id || student.student_id)));
  };

  const markAbsent = (student) => {
    setAbsentMenmber([...absentMember, student]);
    setPresentMember(presentMember.filter((s) => (s.professsor_id || s.student_id) !== (student.professsor_id || student.student_id)));
  };


  function attendCal() {
    console.log("we got call");


    let particilist = [];
    participants.forEach((value, key) => {
      console.log(value.displayName.split('+')[1].trim());

      particilist.push(value.displayName.split('+')[1].trim())
    });

    console.log("we goo dl here", particilist);

    setAbsentMenmber(
      memberr.filter(
        (item) =>
          !particilist.includes(item.professor_id) &&
          !particilist.includes(item.student_id)
      )
    );

    setPresentMember(memberr.filter(
      (item) =>
        particilist.includes(item.professor_id) ||
        particilist.includes(item.student_id)
    )
    );

    console.log(presentMember);
  }


  function handdleAttend(e) {

    setIsLectureOpen(true)


    // let particilist = [];
    // participants.forEach((value, key) => {
    //   console.log(value.displayName.split('+')[1].trim());

    //   particilist.push(value.displayName.split('+')[1].trim())
    // });

    // console.log(particilist);
  }



  /// submiting alll list here
  function submitAttend(params) {

    console.log(absentMember);
    

    axios.post('/videocall/takeattendence', {
      classroom_id: class_id,
      lecture_id: lecture_id,
      presentMember: presentMember,
      absentMember: absentMember
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    )

      .then((response) => {
        console.log("take attendence ", response);
        setAttendStatus(response.data)





      })
      .catch((err) => {
        console.log(err);
        setIsError(true)


      })
      .finally(() => {
        setIsLoading(false)
        setIsAttendOpen(false)
      })

  }

  /// take lecture name 

  useEffect(() => {
    setTakeName(true);

  }, [])




  /// handle Record 
  function startRecord() {
    meeting?.startRecording()
    alert("record started")

    axios.post("/videocall/startrecord", {
      lecture_id: lecture_id,

    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }


    })
      .then((res) => {
        console.log("Recording Started", res);
      })
      .catch((err) => {
        console.log(err);



      })
      .finally(() => {
        console.log("log");

      })


  }


  function takeNameSumbit() {

    axios.post('/videocall/takerecord', {
      classroom_id: class_id,
      meetingId: meetingId,
      lectureName: lectureName


    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    )

      .then((response) => {
        console.log("take recordd", response);
        setLecture_id(response.data)
        console.log(response.data);

      })
      .catch((err) => {
        console.log(err);
        setIsError(true)


      })
      .finally(() => {
        setIsLoading(false)
        setTakeName(false)


      })


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

.attendance-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 10px;
  z-index: 10;
  text-align: center;
}

.attendance-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.close-btn {
  background: red;
  color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
}

.attendance-columns {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.column {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 200px;
  overflow-y: auto;
}

.present {
  background: #d4edda;
}

.absent {
  background: #f8d7da;
}

.student-list {
  list-style: none;
  padding: 0;
}

.student-list li {
  background: white;
  padding: 8px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background: #007bff;
  color: white;
  cursor: pointer;
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
          <a className="navbar-brand" href="#">Lecture</a>
        
          <div>
            <button
              onClick={()=>{startRecord()}}
              disabled={meeting?.isRecording}
            >
              Start Recording
            </button>
            <button
              onClick={() => meeting?.stopRecording()}
              disabled={!meeting?.isRecording}
            >
              Stop Recording
            </button>
          </div>
          <div className="d-flex align-items-center gap-3">
            <a href="#" onClick={handleClick} className="d-flex align-items-center text-white d-none d-sm-flex">
              <i className="bi bi-people me-1"></i> <span className="d-none d-md-inline">Participants</span>
            </a>
            {attendStatus === "deactivate" ? <span>-</span> : (<a href="#" onClick={handdleAttend} className="d-flex align-items-center text-white d-none d-sm-flex">
              <i className="bi bi-gear me-1"></i> <span className="d-none d-md-inline" >Take Attendance</span>
            </a>)}
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

      {member_id.startsWith("prof") && isLectureOpen && <div className="lecture-window">
        <h2 className="lecture-heading">Lecture Details</h2>

        <label className="lecture-label">Lecture Name:</label>
        <label>{lectureName}</label>

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

      {member_id.startsWith("prof") && isAttendOpen && <div className="attendance-window">
        <div className="attendance-header">
          <h2>Attendance</h2>
          <button onClick={() => { setIsAttendOpen(false) }} className="close-btn">&times;</button>
        </div>
        <div className="attendance-columns">
          <div className="column present">
            <h3>Present Students</h3>
            <ul>
              {presentMember.map((s) => (
                <li key={s.professsor_id || s.student_id}>
                  {s.fname + " " + s.lname} <button onClick={() => markAbsent(s)}>❌</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="column absent">
            <h3>Absent Students</h3>
            <ul>
              {absentMember.map((s) => (
                <li key={s.professsor_id || s.student_id}>
                  {s.fname + " " + s.lname} <button onClick={() => markPresent(s)}>✔️</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={submitAttend}>Submit</button>
      </div>}

      {member_id.startsWith("prof") && takeName && <div className="lecture-window">
        <h2 className="lecture-heading">Lecture Details</h2>

        <label className="lecture-label">Enter Lecture Name:</label>
        <input
          type="text"
          value={lectureName}
          onChange={(e) => setLectureName(e.target.value)}
          placeholder="Enter lecture name"
          className="lecture-input"
        />


        <button onClick={()=>{takeNameSumbit()}} className="lecture-button">Submit</button>
      </div>
      }
    </>
  );
}

export default NavMeetbar;