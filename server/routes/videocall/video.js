import express from "express";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { createMeet, checkMeet,createLecture,getMemberName } from "../../db.js";
import { v4 as uuidv4 } from "uuid";
import moment from "moment/moment.js";
import { createSession } from "react-router-dom";

dotenv.config();

const router = express.Router();

// meetingid  creater 
const createMeeting = async (authToken ) => {
    console.log("this is",authToken);
    
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
            authorization: `${authToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
    //Destructuring the roomId from the response
    const { roomId } = await res.json();
    console.log(roomId);
    
    return roomId;
};


router.get('/getmeet', async (req, res) => {
    const classroom_id = req.headers.classroom_id;
    // const member_id = req.headers.member_id;
    const token = process.env.VIDEO_TOKEN ;
    const gettime = moment().format('YYYY/MM/DD');

    const meetid = await createMeeting(token);
    // console.log(meetid,classroom_id,gettime,token);
    // const check = await checkMeet(gettime);   

    
    const tokenn = req.cookies.jwt;
    let member_id;
    
      jwt.verify(tokenn, 'attackontitan', (err, decodedToken) => {
        if (err) {
          console.log("restrcited routes");
          console.log(err);
    
        } else {
          member_id = decodedToken.id
        }
    
      })

      console.log("DL check for member",member_id);
      

    const meeting_id = await createMeet(classroom_id,meetid,gettime)
    // console.log("resssll",createResult, "againnnnnn",check);
    console.log(meeting_id);
    
    const myresult = await getMemberName(member_id)
    


    const data = {
        meetingid:meeting_id,
        memberData:myresult[0],
        token: process.env.VIDEO_TOKEN
    }
    res.send(data)

}) 

router.post("/setlecture", async (req, res) => {
  const classroom_id = req.body.classroom_id;
   
    const lecture_id = "lecture-"+ uuidv4();
    const lecture_name = req.body.lectureName;
    const professor_id = req.body.member_id ;
    const start_time = req.body.startTime ;
    const end_time = req.body.endTime ;
    const date = moment().format('YYYY/MM/DD HH:mm:ss')
    
  
    const result = await createLecture(lecture_id, lecture_name,professor_id,classroom_id, start_time,end_time,date);
    console.log(result);
  
  console.log(classroom_id,start_time,professor_id);
  
  
    res.status(200)
    res.send(lecture_id)
  
  
  })


router.post("/takeattendence", async (req, res) => { 
    const attend = req.body.JSON ;


})




export default router;