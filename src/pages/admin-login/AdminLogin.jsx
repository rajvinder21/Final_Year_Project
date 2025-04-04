import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../Home_Components/Footer";
import ErrorMessage from "../Home_Components/ErrorMessage";
import LoadingMessage from "../Home_Components/Loading";

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emError, setEmError] = useState(false)
  const navigate = useNavigate();
  const [forget, setForget] = useState(false);
  const [third,setThird] = useState(false)
  const [otp, setOtp] = useState("")

  const emailId = email;
  const passId = pass;
  function btnClicked(e) {
    console.log("clicked", email);

    e.preventDefault();
    async function mysend() {
      setIsLoading(true)
      try {
        await axios.post("/admin-login", {
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
            const navigat = res.headers.navigat;
            console.log(res, navigat)
            if (navigat == '/dashboard') {

              navigate('/dashboard')
              console.log(true);
            }
            else {
              navigate("/admin-login")
             
                setEmError(true)
              
            }



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
      }
    }
    mysend()

  }

  

function onForget() {
  setForget(true)
  setEmail("")
  setEmError(false)
}

function submitForget(e) {
  if (email != "") {

    e.preventDefault()
    async function mysend() {
      setIsLoading(true)
      try {
        await axios.post("/signup-verify/forget", {
          email: emailId,
        }
          , {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
          .then((res) => {
            const navigat = res.headers.mail;
            console.log(res, navigat)
            if (navigat) {
              console.log("rightttttttttttt");
              
              
            }
            else {             
                setEmError(true)
              
            }



          })
          .catch((error) => {
           
            console.log("we got errir", error)

            console.log("we got errdsdfasir", error)

          })

      } catch (error) {

        setIsError(true)

      }

      finally {
        setIsLoading(false)
      }
    }
    mysend()
  }
 

}





if (forget) {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Forgot Password</h3>
        <p className="text-muted text-center">Enter your email to reset your password</p>

        <form >
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" onClick={(e)=>{submitForget(e)}} className="btn btn-primary w-100">Send Reset Link</button>
        </form>

        <div className="text-center mt-3">
          <a href="/admin-login" className="text-decoration-none">Back to Login</a>
          {emError && <p>no email matched</p>}
        </div>
      </div>
    </div>
  )
}




  return (
    <div>
      {/* <h2>Admin-Logins</h2>
      <form>
        <p>Email</p>
        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} required /><br />
        <p>Password</p>
        <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} required /><br />
        <button type="submit" onClick={btnClicked}>LOGIN</button>
        

      </form> */}

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#4b4342",
      }}>
        <div style={{
          backgroundColor: "#6b6362",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          textAlign: "center",
        }}>
          <h2 style={{ color: "white" }}>Admin Log in</h2>
          <form >
            <div className="mb-3 text-start">
              <label className="form-label" style={{ color: "white" }}>Email</label>
              <input
              
                type="email"
                className="form-control"
                placeholder="Enter your Email"
                value={email}
                 onChange={(e) => { setEmail(e.target.value) }}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label" style={{ color: "white" }}>Password</label>
              <input

                type="password"
                className="form-control"
                value={pass} 
                onChange={(e) => { setPass(e.target.value) }}
                required
              />
              <p onClick={()=>{onForget()}} >forget password</p>
            </div>
           
            <button type="submit" onClick={btnClicked} className="btn btn-primary w-100">Next</button>
          </form>
          <p className="mt-3" style={{ color: "white" }}>
          Don't have an account? <a href="/signup" className="text-light">Sign Up</a>
            {emError && <p>Email or Password is Wrong</p>}
          </p>

        </div>
        {isError && <ErrorMessage />}
        {isLoading && <LoadingMessage />}
      </div>
      <Footer />
    </div>
  )
}

export default AdminLogin;