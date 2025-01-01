import { useEffect, useState } from "react";
import Navbar from "../Home_Components/Navbar";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";



function SignUpp() {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [emError, setEmError] = useState(false)


  const [getsuccess, setGetSuccess] = useState(false)

  const navigate = useNavigate();
  const emailId = email;
  const passId = pass;
  let uuid;
  let success;
  function btnClicked(e) {
    console.log("clicked", email);

    e.preventDefault();


    async function mysend() {
      setIsLoading(true)
      try {
        await axios.post("/signup", {
          email: emailId,
          password: passId
        }
          , {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
          .then((res) => {
            //  uuid = res.headers.uuid;
            success = res.data.success
            setGetSuccess(success)
            uuid = res.data.uuid
            
            console.log(res);
           


            console.log(uuid, email, pass);

          })
          .catch((error) => {
            setIsError(true)
            console.log("we got errir", error)

            console.log("we got errdsdfasir", error)

          })

      } catch (error) {

        setIsError(true)

      }

      finally {
        setIsLoading(false)
        if (!isError) {
          const data = {
            admin_id: uuid,
            pass: passId,
            email: emailId
          }

          if (success) {
            navigate("/signup-verify", { state: data })
            console.log("get suces",getsuccess);
          }

          if(success == false){
            setEmError(true)
            console.log("maybe changing your email id to work");
            
          }


          //sending this id to next page 
          console.log(success);
          
         
         

        }
      }






    }

    mysend()
   

  }

  

  if (isError) {
    console.log("this is place");

    return <div><h1>something went wrong </h1></div>;
  }

  if (isLoading) {
    return <div><h1>this is loading </h1></div>;
  }

  return (
    <div>
      <Navbar />
      <h2>Signup Page</h2>
      <form>
        <p>Email</p>
        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} required /><br />
        <p>Password</p>
        <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} required /><br />
        <button type="submit" onClick={btnClicked}>SignUp</button>
      </form>

      <div>
        <p>{emError? "Maybe changing EMailid will work": ""}</p>
      </div>
    </div>
  );
}

export default SignUpp;