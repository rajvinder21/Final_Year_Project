import axios from "axios";



const API_BASE_URL = "https://api.videosdk.live";
const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN;




export const getToken = async () => {
    try {
      const response = await axios.get('/videocall/get-token');
      const token = response.data.token;
      console.log(token);
      return token;
    } catch (error) {
      console.error('Error fetching token:', error);
      throw error; // Re-throw to let the caller handle errors
    }
  };


  
// export const createMeeting = async ({token}) => {
//   console.log("we are here ...");
  
    
//     const url = `${API_BASE_URL}/v2/rooms`;
//     const options = {
//       method: "POST",
//       headers: { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0ODUzMzgwZC1hOTA2LTQ4MzYtOGIzMS04NzkxNmEwYzcyNTYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczNzkwNTM3OSwiZXhwIjoxODk1NjkzMzc5fQ.T475dTn6XaeBKksPMQhUYQNYVmdoHcnUI9uWWxr4WCk', "Content-Type": "application/json" },
//     };
  
//     const response = await fetch(url, options)
//     const data = await response.json()
//     console.log(data.roomId);
    
//     if (data.roomId) {
      
//       return { meetingId: data.roomId, err: null }
//     } else {
//       return { meetingId: null, err: data.error }
//     }
  
//   };



export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0ODUzMzgwZC1hOTA2LTQ4MzYtOGIzMS04NzkxNmEwYzcyNTYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczNzkwNTM3OSwiZXhwIjoxODk1NjkzMzc5fQ.T475dTn6XaeBKksPMQhUYQNYVmdoHcnUI9uWWxr4WCk";
// API call to create a meeting
export const createMeeting = async ({ token }) => {
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
  return roomId;
};











  export const validateMeeting = async ({ roomId, token }) => {
    const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;
  
    const options = {
      method: "GET",
      headers: { Authorization: token, "Content-Type": "application/json" },
    };
  
    const response = await fetch(url, options)
  
    if (response.status === 400) {
      const data = await response.text()
      return { meetingId: null, err: data }
    }
  
    const data = await response.json()
  
    if (data.roomId) {
      return { meetingId: data.roomId, err: null }
    } else {
      return { meetingId: null, err: data.error }
    }
  
  };

