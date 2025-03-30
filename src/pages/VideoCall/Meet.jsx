import React, { useEffect, useMemo, useRef, useState } from "react";
import { MeetingProvider, useMeeting, useParticipant, } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { createMeeting, authToken } from "./api";
import JoinScreen from "./JoinScreen";
import PreJoinScreen from "./PreJoinScreen";
import "./style/participant.css"
import { useMediaDevice } from "@videosdk.live/react-sdk";
import NavMeetbar from "./components/NavMeetbar";
import { useLocation } from "react-router-dom";
import axios from "axios";


// my import only heerere............
const PresenterView = ({ presenterId,participantId }) => {

  const { displayName } = useParticipant(participantId)
  const {
    screenShareStream,
    screenShareAudioStream,
    screenShareOn,
    isLocal
  } = useParticipant(presenterId);

  const audioPlayer = useRef(null);

  // Handle screen share video
  const mediaStream = useMemo(() => {
    if (screenShareOn && screenShareStream) {
      const stream = new MediaStream();
      stream.addTrack(screenShareStream.track);
      return stream;
    }
    return null;
  }, [screenShareStream, screenShareOn]);

  // Handle screen share audio
  useEffect(() => {
    const audioElement = audioPlayer.current;
    if (!isLocal && screenShareOn && screenShareAudioStream) {
      const audioStream = new MediaStream();
      audioStream.addTrack(screenShareAudioStream.track);

      if (audioElement) {
        audioElement.srcObject = audioStream;
        audioElement.play().catch(error => {
          if (error.name === 'NotAllowedError') {
            console.warn('Autoplay blocked. Consider user interaction first.');
          }
        });
      }
    } else if (audioElement) {
      audioElement.srcObject = null;
    }

    return () => {
      if (audioElement) {
        audioElement.srcObject = null;
      }
    };
  }, [screenShareAudioStream, screenShareOn, isLocal]);

  return (
    <div className="camera-box presenter-view">
      {mediaStream && (
        <ReactPlayer
          playsinline
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={mediaStream}
          height="100%"
          width="100%"
          onError={err => console.error('Presenter video error:', err)}
        />
      )}
      <audio 
        ref={audioPlayer}
        autoPlay 
        playsInline 
        controls={false}
        style={{ display: 'none' }}
      />
      <div className="d-flex justify-content-center mt-3 position-absolute top-0 start-50 translate-middle-x">

        <p>Participant: {displayName}</p>
      </div>
    </div>
  );
};

function ParticipantView(props) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const micRef = useRef(null);
  
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId,{
      onStreamEnabled: (stream) => {
        if (stream.kind === 'share') {
          console.log(`Share stream started for ${props.participantId}`);
        }
      },
      onStreamDisabled: (stream) => {
        if (stream.kind === 'share') {
          console.log(`Share stream stopped for ${props.participantId}`);
        }
      },
    });

  const videoStream = useMemo(() => {

    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);


  /// just css code 
  const togggleMic = () => {

    setIsMicOn(!isMicOn)
  };
  const toggleCamera = () => {

    setIsCameraOn(!isCameraOn);

  }



  return (

    <div className="camera-box ">
      <ReactPlayer
        url={videoStream}
        playing
        muted={true}
        playsinline
        pip={false}
        controls={false}
        onError={(err) => console.log(err, "participant video error")}
        width={'100%'}
        height={"100%"}
      />

    
      <div className="d-flex justify-content-center mt-3 position-absolute top-0 start-50 translate-middle-x">

        <p>Participant: {displayName.split('+')[0].trim()}</p>
      </div>

      
      <div className="d-flex justify-content-center mt-3 position-absolute bottom-0 start-50 translate-middle-x">
        <button className="btn text-white" onClick={togggleMic}>
          <i className={`bi ${micOn ? 'bi-mic-fill' : 'bi-mic-mute-fill'}`} style={{ fontSize: '24px' }}></i>
        </button>
        <button className="btn text-white" onClick={toggleCamera}>
          <i className={`bi ${webcamOn ? 'bi-camera-fill' : 'bi-camera-video-off-fill'}`} style={{ fontSize: '24px' }}></i>
        </button>
      </div>

      {/* Optionally include the audio element */}
      <audio autoPlay playsInline muted={isLocal} />
    </div>
    
    // <div  >
    //   <div>
    //     <p>
    //       Participant: {displayName} </p>
    //     <button className="btn text-white" onClick={togggleMic}>
    //         <i className={`bi ${micOn ? 'bi-mic-fill' : 'bi-mic-mute-fill'}`} style={{ fontSize: '24px' }}></i>
    //       </button>
    //       {/* Camera Button */}
    //       <button className="btn text-white" onClick={toggleCamera}>
    //         <i className={`bi ${webcamOn ? 'bi-camera-fill' : 'bi-camera-video-off-fill'}`} style={{ fontSize: '24px' }}></i>
    //       </button>
    //   </div>
    //   <audio ref={micRef} autoPlay playsInline muted={isLocal} />

    //     <ReactPlayer
    //       //
    //       playsinline // extremely crucial prop
    //       pip={false}
    //       light={false}
    //       controls={false}
    //       muted={true}
    //       playing={true}
    //       //
    //       url={videoStream}
    //       //
    //       height={"100%"}
    //       width={"100%"}
    //       onError={(err) => {
    //         console.log(err, "participant video error");
    //       }}
    //     />


    // </div>
  );
}




function MeetingView(props) {

  // const {class_id,memberName, member_id
  // } = location.state || {};
  
 
  const [joined, setJoined] = useState(null);
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants,presenterId } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },

    onPresenterChanged: (presenterId) => {
      if (presenterId) {
        console.log(`${presenterId} started screen share`);
      } else {
        console.log("Screen share stopped");
      }
    },
  });
  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="mycolor" >
      {/* <h3>Meeting Id: {props.meetingId}</h3> */}
      {joined && joined == "JOINED" ? (
        <div>
       
        <NavMeetbar participants={participants} class_id={props.class_id} memberName={props.memberName} member_id={props.member_id} meetingId={props.meetingId}/>
          <div className=" video-area">


            {[...participants.keys()].map((participantId) => (

              
                <ParticipantView
                  participantId={participantId}
                  key={participantId}
                  
                />
             
            ))}
{/* fake herer */}
             {presenterId && <PresenterView presenterId={presenterId} participantId={participants}/>}
          </div>
         
          <Controls />

        </div>
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (<div>

        {/* <button onClick={joinMeeting}>Join</button>  */}

        {/* <p>Meeting Id: {props.meetingId}</p> */}
        {/* <NavMeetbar /> */}
        <PreJoinScreen joinMeeting={joinMeeting} class_id={props.class_id} meet={props.meetingId} memberName={props.memberName}/>
        <Controls />
        {/* <div className="box-container-participant" style={{"border":"2px solid black"}}>
        <div className="box-participant" style={{"border":"2px solid "}}>
        <ParticipantView/>
        </div>
        </div> */}
      </div>
      )}
    </div>
  );
}


function Controls() {
  
  const { leave, toggleMic, toggleWebcam, end,disableWebcam,muteMic,toggleScreenShare } = useMeeting();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const togggleMic = () => {
    toggleMic()
    setIsMicOn(!isMicOn)
  };
  const toggleCamera = () => {
    toggleWebcam()
    setIsCameraOn(!isCameraOn);

  }

  const onEnd = () =>{
   disableWebcam()
   muteMic()
    end()
  }


  // position-fixed
  return (
    <div className="">

      <div className="control-bar">

        {/* Mic Button */}
        <button className="btn text-white" onClick={togggleMic}>
          <i className={`bi ${isMicOn ? 'bi-mic-fill' : 'bi-mic-mute-fill'}`} style={{ fontSize: '24px' }}></i>
         
        </button>
        {/* Camera Button */}
        <button className="btn text-white" onClick={toggleCamera}>
          <i className={`bi ${isCameraOn ? 'bi-camera-fill' : 'bi-camera-video-off-fill'}`} style={{ fontSize: '24px' }}></i>
        
        </button>
        {/* End Call Button */}
        <button className="btn text-white" onClick={onEnd}>
          <i className="bi bi-x-square-fill" style={{ fontSize: '24px' }}></i>
        </button>
        {/* leaveee */}
        <button className="btn text-white" onClick={() => leave()}>
          <i className="bi bi-telephone-minus-fill " style={{ fontSize: '24px' }}></i>
        </button>

        <button onClick={() => toggleScreenShare()}>Screen Share</button>

        {/* Show Members Button */}
       
      </div>
    </div>
  

    // <div>
    // {/* this box should be in middle  */}
    // <div >  
    //   <button onClick={() => leave()}>Leave</button>
    //   <button>End</button>
    //   <button onClick={() => toggleMic()}>toggleMic</button>
    //   <button onClick={() => toggleWebcam()}>toggleWebcam</button>
    //   <button >ScreenShare</button>
    //   </div>
    //   {/* this box should be in right when i clicked on it there should prompt boxs shoud be open where list of member there */}
    // <div>
    //   <button>Show people</button>
    // </div>
    // </div>
  );
}



function Meet() {
  const location = useLocation();
  const [meetingId, setMeetingId] = useState(null)
 
  // const [memberName, setMemberName] = useState("")
  // const [member, setMember] = useState("")
  const fake_class = localStorage.getItem("class")
  
  console.log("dl chechhhh",atob(fake_class));
  const [class_id, setClass_id] = useState(atob(fake_class))
  const [member_id, setMember_id] = useState('')
  const [memberName, setMemberName] = useState('')



 
  // const { member,class_id,memberName
  // } = location.state || {};
 



  const getMeetingAndToken = async (id) => {
    console.log(class_id);
  
    console.log("DL check chekcclass",class_id);
    
    axios.get('/videocall/getmeet',{
      headers: {
        'classroom_id': class_id
        
      }
    })
    .then( (respone)=>{
      console.log("weee",respone.data.memberData.professsor_id);
      // setClass_id(respone.data.memberData)
      setMember_id(respone.data.memberData.professsor_id ||respone.data.memberData.student_id  )
      setMemberName(respone.data.memberData.fname + " " + respone.data.memberData.lname)
      setMeetingId(respone.data.meetingid)
      
    })

    // const meetingId =
    //   id == null ? await createMeeting({ token: authToken }) : id;
    
  };

  console.log(meetingId,authToken);
  
console.log("testing for id",member_id,memberName,);

    
  useEffect( ()=>{
    getMeetingAndToken()
  }, [])



  const onMeetingLeave = () => {
    setMeetingId(null);
  };





  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: `${memberName}+${member_id}`,
        recording: {
          enabled: true, // Enable recording
          autoStart: false, // Set true if you want automatic recording
          // webhookUrl: "your-webhook-url", // Optional, to receive recording events
        },
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} member_id={member_id} class_id={class_id} memberName={memberName} />
    </MeetingProvider>
  ) : (
   
    <p>get well soon</p>
  );
}





export default Meet;



