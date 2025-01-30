import React, { useEffect, useState } from 'react'
import { createMeeting,getToken} from './api';
import { useNavigate } from "react-router-dom";


function JoinCall() {
    const [meetingIdd, setMeetingId] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect( ()=>{

      async function myfunc() {
        const token  = await getToken();
        setToken(token)
        const meetingId = await createMeeting(token);

        setMeetingId(meetingId.meetingId)

       
        console.log(token);
        
      }
        myfunc()

    },[])

 
    function clickHandle(e) {
      e.preventDefault()
      console.log(token,meetingIdd);
      
      
      navigate('/videocall/meet', { state: { id: meetingIdd, token: token } });
    }
   

  return (
    <div>
        <h1 onClick={clickHandle}>hello world {meetingIdd} </h1>
    </div>
  );
}

export default JoinCall ;