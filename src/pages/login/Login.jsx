import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Home_Components/Footer";
import LoadingMessage from "../Home_Components/Loading";
import ErrorMessage from "../Home_Components/ErrorMessage" ;

function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emError, setEmError] = useState(false)

  const navigate = useNavigate();
  let success;
  const emailId = email;
  const passId = pass;
  function btnClicked(e) {
    console.log("clicked", email);

    e.preventDefault();
    async function mysend() {
      setIsLoading(true)
      try {
        await axios.post("/login", {
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
            console.log("we got response 36", res);
            success = res.headers.success;
            if (success === "false") {
              setEmError(true)
            }

            else {
              setEmError(false)

              navigate("/classroom")

            }


            console.log(success);



            // const navigat = res.headers.navigat;
            // console.log(res, navigat)
            // if (navigat == '/dashboard') {

            //   navigate('/home')
            //   console.log(true);
            // }
            // else {
            //   navigate("/login")
            // }



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







  // if (isError) {
  //   console.log("this is place");

  //   return <div style={{
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     height: "100vh",
  //     backgroundColor: "#4b4342",
  //   }}><h1>something went wrong </h1></div>;
  // }

  // if (isLoading) {
  //   return <div style={{
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     height: "100vh",
  //     backgroundColor: "#4b4342",
  //   }}><h1>this is loading </h1></div>;
  // }






  return (
    <div>
      {/* <h2>Logins</h2>
      <form>
        <p>Email</p>
        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} required /><br />
        <p>Password</p>
        <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} required /><br />
        <button type="submit" onClick={btnClicked}>LOGIN</button>


      </form>
      <Link to={"/admin-login"}>Admin Login</Link> */}



      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#4b4342",
      }}>

      {isLoading && <LoadingMessage />}
      {isError && <ErrorMessage/> }
        <div style={{
          backgroundColor: "#6b6362",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          textAlign: "center",
        }}>
          <h2 style={{ color: "white" }}>Log in</h2>
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
        
            <button type="submit" onClick={(e) => { btnClicked(e) }} className="btn btn-primary w-100">Next</button>
          </form>
          <p className="mt-3" style={{ color: "white" }}>

            {emError && <p>Email or Password is Wrong</p>}
          </p>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login;