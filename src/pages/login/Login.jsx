import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  let success ;
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
            console.log(res);
             success = res.headers.success;

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
        if (!isError) {
          if (success){
            navigate("/classroom")
          }

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
      <h2>Logins</h2>
      <form>
        <p>Email</p>
        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} required /><br />
        <p>Password</p>
        <input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} required /><br />
        <button type="submit" onClick={btnClicked}>LOGIN</button>


      </form>
      <Link to={"/admin-login"}>Admin Login</Link>

    </div>
  )
}

export default Login;