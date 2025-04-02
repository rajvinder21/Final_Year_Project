import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { Axios } from "axios" ;

import { useLocation } from "react-router-dom";


 

function SignupDetails(params) {
 
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [DOB, setDOB] = useState('');
    const [adress, setAddress] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [states, setStates] = useState('');
    const [gender, setGender] = useState('Male');
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [call, setCall] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const {admin_id,pass,email} = location.state || {};


    function myClicked(e) {

      // const uuid = localStorage.getItem('uuid')
      // const email = localStorage.getItem('email')
      // const pass = localStorage.getItem('pass')

      console.log("here something new", admin_id,email);
      
        e.preventDefault()
        async function mysend() {
            setIsLoading(true)   
           try {
            await axios.post("/signup-details", {
              fName:fName,
              lName:lName,
              address:adress,
              DOB:DOB,
              zip:zip,
              phone: phone,
              gender:gender,
              country:country,
              states:states
              
            }
            , {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'uuid': admin_id,
                'email':email,
                'pass':pass
              }}
          )
          .then( (res)=> {
            console.log(res) 
          } )
           .catch( (error)=> {
            setIsError(true)
            console.log("we got errir",error)
            
            console.log("we got errdsdfasir",error)

           })
            
           } catch (error) {
            
            setIsError(true)
            
           }

           finally{
            setIsLoading(false)
            if (!isError) {
              navigate("/admin-login")
            }
            


           }
            
               
              }

              mysend()

              // localStorage.removeItem("uuid")
              // localStorage.removeItem("pass")
              // localStorage.removeItem("email")
        console.log(gender,DOB)
        
    }



    return (
 <div > 
        {/* // <div>

        //     <h2>sign Detail page</h2>
        //     <form>
        //     <label>first naame</label>
        //         <input type="text"  value={fName} onChange={(e)=> {setFName(e.target.value)}}/>
        //     <label>Last Name </label>
        //     <input type="text" value={lName} onChange={(e)=> {setLName(e.target.value)}}/>
        //     <label>Date Of Birth</label>
        //     <input type="Date" value={DOB} onChange={(e)=> {setDOB(e.target.value)}}/>
            
        //     <label>Address</label>
        //     <input type="text" value={adress} onChange={(e)=> {setAddress(e.target.value)}}/>

        //     <label>ZIP Code</label>
        //     <input type="text" value={zip} onChange={(e)=> {setZip(e.target.value)}} />
           
        //     <label>Phone No:- </label>
        //     <input type="text" value={phone} onChange={(e)=> {setPhone(e.target.value)}}/><br/>

        //     <label>Gender</label>
        //     <select name="gemder" value={gender} onChange={(e)=> {setGender(e.target.value)}}>
        //     <option value="Male">Male</option>
        //     <option value="Female">Female</option>
        //     </select>

        //     <label>Country</label>
        //     <input type="text" value={country} onChange={(e)=> {setCountry(e.target.value)}} />

        //     <label>State</label>
        //     <input type="text" value={states} onChange={(e)=> {setStates(e.target.value)}} /><br/>

        //     <button type="submit" onClick={myClicked}>Next</button>


        //     </form>
        // </div> */}
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

<div className="row"> 
        <div className="d-flex justify-content-center align-items-center col" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
       
        <div className="container d-flex justify-content-between align-items-center">
          <div className="p-4" style={{ background: "#d3dae0", borderRadius: "10px", padding: "30px", maxWidth: "50%" }}>
            <h4>Details</h4>
            <form>
              <div className="row mb-3">
                <div className="col">
                  <label>First Name</label>
                  <input type="text" className="form-control" value={fName} onChange={(e)=> {setFName(e.target.value)}} />
                </div>
                <div className="col">
                  <label>Last Name</label>
                  <input type="text" className="form-control" value={lName} onChange={(e)=> {setLName(e.target.value)}} /> 
                </div>
              </div>
              <div className="row mb-3">
        
                <div className="col">
                  <label>Date Of Birth</label>
                  <input type="date" value={DOB} onChange={(e)=> {setDOB(e.target.value)}} className="form-control" />
                </div>
              </div>
              <div className="mb-3">
                <label>Address-1</label>
                <input type="text" value={adress} onChange={(e)=> {setAddress(e.target.value)}} className="form-control" />
              </div>
              {/* <div className="mb-3">
                <label>Address-2 (Optional)</label>
                <input type="text" className="form-control" />
              </div> */}
              <div className="row mb-3">
                <div className="col">
                  <label>Phone No:</label>
                  <input type="text" value={phone} onChange={(e)=> {setPhone(e.target.value)}} className="form-control" />
                </div>
                <div className="col">
                  <label>Gender</label>
                  <select name="gemder" value={gender} onChange={(e)=> {setGender(e.target.value)}}>
             <option value="Male">Male</option>
             <option value="Female">Female</option>
             </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label>Country</label>
                  <input type="text" value={country} onChange={(e)=> {setCountry(e.target.value)}} className="form-control" />
                </div>
                <div className="col">
                  <label>State</label>
                  <input type="text" value={states} onChange={(e)=> {setStates(e.target.value)}}  className="form-control" />
                </div>
                <div className="col">
                  <label>ZIP</label>
                  <input type="text" value={zip} onChange={(e)=> {setZip(e.target.value)}} className="form-control" />
                </div>
              </div>
              <button type="submit" onClick={myClicked} className="btn btn-primary w-100">Next</button>
            </form>
          </div>
          <div className="col " style={{margin:"auto"}}>
            <img src="/images/guylaptop.jpg" alt="Administrator" style={{ maxWidth: "80%", borderRadius:"40%", marginLeft:"5.5rem" }} />
           
          </div>
        </div>
      </div>
      </div>
      </div>
    );
}

export default SignupDetails;