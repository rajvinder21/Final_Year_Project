import React, { useState, useEffect, useRef } from "react";
import { useMediaDevice,useParticipant } from "@videosdk.live/react-sdk";
import { useNavigate, Link } from "react-router-dom";
import { FaMicrophone, FaMicrophoneAltSlash, FaVideo, FaVideoSlash } from "react-icons/fa";


import "./style/prejoin.css" // Import custom styles

function JoinVideo({ meet, joinMeeting , memberName}) {
 
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [name] = useState("John Doe");
   const navigate = useNavigate();

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (camOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: micOn })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => console.error("Error accessing camera:", error));
    } else {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  }, [camOn, micOn]);

 
  function letsgoo() {
    setMicOn(false)
    setCamOn(false)
    navigate('/classroom')
  }
  
  return (
    <div className="container-fluid bg-dark text-light vh-100 prejoin-container">
      <div className="row h-100">
        {/* Left side - Camera view */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <div
            className="camera-box bg-black"
            style={{
              width: "100%",
              height: "80%",
              maxWidth: "600px",
              position: "relative",
            }}
          >
            {camOn ? (
              <video ref={videoRef} autoPlay playsInline className="w-100 h-100 rounded" />
            ) : (
              <p className="text-center text-light">Camera is off</p>
            )}
            <div className="d-flex justify-content-center mt-3 position-absolute bottom-0 start-50 translate-middle-x">
             
              <button
                className="btn btn-outline-light mx-2"
                onClick={() => setCamOn(!camOn)}
                aria-label="Toggle Camera"
              >
                {camOn ? <FaVideo /> : <FaVideoSlash />}
              </button>
              {/* Mic button */}
              <button
                className="btn btn-outline-light mx-2"
                onClick={() => setMicOn(!micOn)}
                aria-label="Toggle Microphone"
              >
                {micOn ? <FaMicrophone /> : <FaMicrophoneAltSlash />}
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Inputs */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <div className="card bg-dark text-white p-4 shadow-lg w-75">
            <div className="card-body text-center">
              <h2 className="card-title mb-4">Join your Meeting</h2>

              <div className="mb-3">
                <h3 className="fw-bold">Meeting: <span className="text-primary">{meet}</span></h3>
              </div>

              <div className="mb-3">
                <h3 className="fw-bold">Joining as: <span className="text-info">{memberName}</span></h3>
              </div>

              <button onClick={() => joinMeeting()} className="btn btn-primary btn-lg w-100 mt-3">JOIN</button>
              <button onClick={() => letsgoo()} className="btn btn-primary btn-dark w-100 mt-3">Go back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinVideo;


