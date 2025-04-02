import { useEffect, useState } from "react";
import Navbar from "../Home_Components/Navbar";
import axios, { Axios } from "axios" ;
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SignupVerify() {
  const location = useLocation();
  const {admin_id,pass,email} = location.state || {};
    const [isotp, setOtp] = useState("");
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [checkOtp, setCheckOtp] = useState(false)
    const navigate = useNavigate();
   
    let success ;

    useEffect( ()=>{
      async function myget() {
        setIsLoading(true)
        axios.get('/signup-verify', {
          headers:{
            "admin_id":admin_id,
          }
        })
  
          .then((response) => {
            console.log( response)
  
  
          })
          .catch((err) => {
            console.log(err);
           
  
  
          })
          .finally(() => {
           
  
          })
      }
      myget()
    }, [])
    
    function  Clicked(e) {
        if (isotp == "") {
          return null ;
        }

        e.preventDefault()
        console.log("here we got too",admin_id);
      
        
        async function mysend() {
            setIsLoading(true) 
            console.log(isotp);
              
           try {
            await axios.post("/signup-verify", {
              otp: isotp,
              admin_id:admin_id
            }
            , {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }}
          )
          .then((res)=> {
            console.log(res) 
            success = res.data.success;
            if (res.data.success == true) {
              setCheckOtp(true)

            }
            
          } )
           .catch( (error)=> {
            setIsError(true)
            console.log("we got errir",error)
            
          

           })
            
           } catch (error) {
            
            setIsError(true)
            
           }

           finally{
            setIsLoading(false)
            if (!isError) {
              const data = {
                admin_id:admin_id,
                pass:pass,
                email:email
              }

              if (success) {
                navigate("/signup-details", {state:data} )
              }
              
            }


           }
            
               
              }

              mysend()
        
    }


    return (
    <div style={{  height: "100%", backgroundColor: "#f8f9fa" }} >
    {/* <Navbar/> */}
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#3d4da5" }}>
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">
          <img src="images/logo.png" alt="Logo" width="30" height="30" className="d-inline-block align-top" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link text-white" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#learn">Learn</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="#about">About</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

        {/* <h1>signup verify </h1>
        <form>
            <input type="text" name="otp" value={isotp} onChange={(e)=> {setOtp(e.target.value)}} />
            <button type="submit" onClick={Clicked}>Submit</button>
        </form> */}

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="container text-center p-4" style={{ background: "#dee2e6", borderRadius: "10px", maxWidth: "400px" }}>
        <h3>Verify Your OTP</h3>
        <p>Enter the OTP sent to your email</p>
        <input
          type="text"
          className="form-control text-center"
          placeholder="Enter OTP"
          value={isotp} 
          onChange={(e)=> {setOtp(e.target.value)}}
          maxLength={6}
        />
        {isError && <p className="text-danger mt-2">Invalid OTP. Try again.</p>}
       
        <button  className="btn btn-primary w-100 mt-3" onClick={Clicked}>Verify OTP</button>
        <button className="btn btn-link mt-2" >Resend OTP</button>
      </div>
    </div>
  );
    </div>);
}

export default SignupVerify