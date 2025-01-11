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
              navigate("/login")
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

        <div>

            <h2>sign Detail page</h2>
            <form>
            <label>first naame</label>
                <input type="text"  value={fName} onChange={(e)=> {setFName(e.target.value)}}/>
            <label>Last Name </label>
            <input type="text" value={lName} onChange={(e)=> {setLName(e.target.value)}}/>
            <label>Date Of Birth</label>
            <input type="Date" value={DOB} onChange={(e)=> {setDOB(e.target.value)}}/>
            
            <label>Address</label>
            <input type="text" value={adress} onChange={(e)=> {setAddress(e.target.value)}}/>

            <label>ZIP Code</label>
            <input type="text" value={zip} onChange={(e)=> {setZip(e.target.value)}} />
           
            <label>Phone No:- </label>
            <input type="text" value={phone} onChange={(e)=> {setPhone(e.target.value)}}/><br/>

            <label>Gender</label>
            <select name="gemder" value={gender} onChange={(e)=> {setGender(e.target.value)}}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            </select>

            <label>Country</label>
            <input type="text" value={country} onChange={(e)=> {setCountry(e.target.value)}} />

            <label>State</label>
            <input type="text" value={states} onChange={(e)=> {setStates(e.target.value)}} /><br/>

            <button type="submit" onClick={myClicked}>Next</button>


            </form>
        </div>
    );
}

export default SignupDetails;