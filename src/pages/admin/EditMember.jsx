import React, { useState } from 'react'
import { use } from 'react';
import axios from 'axios';

export default function EditMember({data, onEditMemberCancel}) {
      const [Mfname, setMFname] = useState(data.fname);
      const [Mlname, setMLname] = useState(data.lname);
      const [Memail, setMEmail] = useState(data.email);
      const [Mgender, setMGender] = useState(data.gender);
      const [Mmyclass, setMMyclass] = useState(data.myclass);

      let role = (data.professor_id && typeof data.professor_id === 'string' && data.professor_id.slice(0, 4) === "prof")
      ? "Professor"
      : "Student" ;
      const [Mrole, setMRole] = useState(role);
      const [password, setPassword] = useState(data.password)
      const [isLoading, setIsLoading] = useState(false)
      const [isError, setIsError] = useState(false)
      const [Mblock, setMblock] = useState(data.block);
      const [done, setDone] = useState(false)

   function onEditMember(e){
    console.log(data.professor_id);
    
    e.preventDefault();
    // console.log(fname, lname);

    const item = localStorage.getItem("class_id")
    async function mysend() {
      setIsLoading(true);
      axios.post('/dashboard/editmember', {
        fname: Mfname,
        lname: Mlname,
        email: Memail,
        class_id: item,
        gender: Mgender,
        role: Mrole,
        myclass: Mmyclass,
        password:password,
        professor_id: data.professor_id,
        block:Mblock


      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      )
        .then((response) => {
          console.log("edit member", response);
          
          // setMEmail("")
          // setMFname("")
          // setMGender("Male")
          // setMLname("")
          // setMMyclass("")


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
    if (!isError){
      setDone(true)
    }
    console.log("clicked");


  }

  if (isLoading) {
    return <div><h1>this is loading </h1></div>;
  }

  if (isError) {
    return <div><h1>surprise we got error </h1></div>
  }

    function onCancel() {
      onEditMemberCancel(false)
  }

  if (done){
    return(
<div>
  <h2>Sucessfully Edited </h2>
  <button type='button' onClick={onCancel}>Go Back</button>

</div>
    );
  }
  


  return (
    <div>
        <form>
        <h2>Editing {data.fname } {data.lname} </h2> 
              <label>First Name</label>

              <input type='text' value={Mfname} onChange={(e) => { setMFname(e.target.value) }} />

              <label>Last Name</label>
              <input type='text' value={Mlname} onChange={(e) => { setMLname(e.target.value) }} />

              <label>Email</label>
              <input type='text' value={Memail} onChange={(e) => { setMEmail(e.target.value) }} />
           
              <label>Password</label>
              <input type='text' value={password} onChange={(e) => { setPassword(e.target.value) }} />
              <label>Class</label>
              <input type='text' value={Mmyclass} onChange={(e) => { setMMyclass(e.target.value) }} />

              <label>Gender</label>
              <select name='gender' value={Mgender} onChange={(e) => { setMGender(e.target.value) }}>
                <option value="Male" >Male</option>
                <option value="Female">Female</option>
              </select>

              <label>Block</label>
              <select name='block' value={Mblock} onChange={(e) => { setMblock(e.target.value) }}>
                <option value="unblock" >UnBlock</option>
                <option value="block">Block</option>
              </select>
              

              {/* <label>Role</label>
              <select value={Mrole} onChange={(e) => { setMRole(e.target.value); }}>
               
                <option value="Professor">Professor</option>
                <option value="Student">Student</option>
              
              </select> */}

              <button type='button' onClick={onEditMember}>Add Member</button>
              <button type='button' onClick={onCancel}>Cancel</button>

            </form>
    </div>
  )
}
