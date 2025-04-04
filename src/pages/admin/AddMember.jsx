import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
// import Classroom_id from './Provider';

function AddMember(props) {
  // const classroom_id = useContext(Classroom_id)
  const [Mclass_id, setMClass_id] = useState(localStorage.getItem('class_id'));
  const [Mfname, setMFname] = useState('');
  const [Mlname, setMLname] = useState('');
  const [Memail, setMEmail] = useState('');
  const [Mgender, setMGender] = useState('Male');
  const [Mmyclass, setMMyclass] = useState('');
  const [Mrole, setMRole] = useState('Student');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false)



  function onClicked(e) {
 
    e.preventDefault();
    // console.log(fname, lname);

      const item = localStorage.getItem("class_id")
      async function mysend() {
        setIsLoading(true);
        axios.post('/dashboard/addmember', {
          fname: Mfname,
          lname: Mlname,
          email: Memail,
          class_id: Mclass_id,
          gender: Mgender,
          role: Mrole,
          myclass: Mmyclass
  
  
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        )
          .then((response) => {
            console.log("add member", response);
  
          })
          .catch((err) => {
            console.log("add member", err);
            setIsError(true)
  
          })
  
          .finally(() => {
            setIsLoading(false)
          })
  
      }
  
  
      mysend()
      console.log("clicked");
   

  }

  // if (isLoading) {
  //   return <div><h1>this is loading </h1></div>;
  // }

  // if (isError) {
  //   return <div><h1>surprise we got an error ! </h1></div>;
  // }




  return (

    <div>
      <form>
        <label>First Name</label>

        <input type='text' value={Mfname} onChange={(e) => { setMFname(e.target.value) }} />

        <label>Last Name</label>
        <input type='text' value={Mlname} onChange={(e) => { setMLname(e.target.value) }} />

        <label>Email</label>
        <input type='text' value={Memail} onChange={(e) => { setMEmail(e.target.value) }} />
        <label>Class</label>
        <input type='text' value={Mmyclass} onChange={(e) => { setMMyclass(e.target.value) }} />

        <label>Gender</label>
        <select name='gender' value={Mgender} onChange={(e) => { setMGender(e.target.value) }}>
          <option value="Male" >Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Role</label>
        <select value={Mrole} onChange={(e) => { setMRole(e.target.value); }}>
          <option value="Student">Student</option>
          <option value="Professor">Professor</option>
        </select>

        <button type='submit' onClick={onClicked}>Add Member</button>

      </form>

      <hr />
     


    </div>
  )
}


export default AddMember