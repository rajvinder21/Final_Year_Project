import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../Home_Components/Footer";

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emError, setEmError] = useState(false)
  const navigate = useNavigate();

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
        // if (!isError) {


        // }
      }






    }

    mysend()
  

  }

  if (isError) {
    console.log("this is place");

    return <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#4b4342",
    }}><h1>something went wrong </h1></div>;
  }

  if (isLoading) {
    return <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#4b4342",
    }}><h1>this is loading </h1></div>;
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
            </div>
            <button type="submit" onClick={btnClicked} className="btn btn-primary w-100">Next</button>
          </form>
          <p className="mt-3" style={{ color: "white" }}>
          Don't have an account? <a href="/signup" className="text-light">Sign Up</a>
            {emError && <p>Email or Password is Wrong</p>}
          </p>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminLogin;