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
    <div>
    <Navbar/>
        <h1>signup verify </h1>
        <form>
            <input type="text" name="otp" value={isotp} onChange={(e)=> {setOtp(e.target.value)}} />
            <button type="submit" onClick={Clicked}>Submit</button>
        </form>
    </div>);
}

export default SignupVerify