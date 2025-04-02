import { useEffect, useState } from "react";
import Navbar from "../Home_Components/Navbar";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Home_Components/Footer";




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

    return (
    <div style={{
      backgroundColor: "#3d4da5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}><div><h1>this is loading </h1></div></div>
    );
  }

  return (
    // <div>
    //   <Navbar />
    //   <h2>Signup Page</h2>
    //   <form>
    //     <p>Email</p>
    //     <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} required /><br />
    //     <p>Password</p>
    //     <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} required /><br />
    //     <button type="submit" onClick={btnClicked}>SignUp</button>
    //   </form>

    //   <div>
    //     <p>{emError? "Maybe changing EMailid will work": ""}</p>
    //   </div>



    // </div>

    <div>
    <div style={{
      backgroundColor: "#3d4da5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}>
      <div className="container">
        <div
          className="login-container mx-auto"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "30px",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
            color: "white",
          }}
        >
          <p className="small">Sign up as an Admin</p>
          <h2>Sign in</h2>
          <form>
            <div className="mb-3 text-start">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{ background: "rgba(255, 255, 255, 0.8)", border: "none" }}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={pass} 
                onChange={(e) => setPass(e.target.value)}
                className="form-control"
                style={{ background: "rgba(255, 255, 255, 0.8)", border: "none" }}
                required
              />
            </div>
            <button
              type="submit"
              className="btn w-100"
              onClick={btnClicked}
              style={{ backgroundColor: "#4a4a4a", color: "white", border: "none" }}
            >
              Next
            </button>
          </form>
          <p className="mt-3">
            Already have an account? <a href="/admin-login" className="text-light">Log In</a>
            <br/>
            <span>{emError ? "Maybe changing Email ID will work" : ""}</span>
          </p>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignUpp;