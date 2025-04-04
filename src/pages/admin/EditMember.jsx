import React, { useState } from 'react'
import { use } from 'react';
import axios from 'axios';

export default function EditMember({data, onEditMemberCancel}) {
      const [Mfname, setMFname] = useState(data.fname);
      const [Mlname, setMLname] = useState(data.lname);
      const [Memail, setMEmail] = useState(data.email);
      const [Mgender, setMGender] = useState(data.gender);
      const [Mmyclass, setMMyclass] = useState(data.myclass);

      let role = (data.student_id && typeof data.student_id === 'string' && data.student_id.slice(0, 4) === "prof")
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
        role: data.professor_id.startsWith("prof") ? "Professor": "Student",
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

<div style={{
    width: '500px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  }}>
    <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Sucessfully Edited </h2>
  <button type='button' onClick={onCancel}>Go Back</button>

</div>
    );
  }
  


  return (
    <div>
      <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Full viewport height to center vertically
  backgroundColor: '#f5f5f5'
}}>
  <div style={{
    width: '500px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  }}>
    <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Editing {data.fname} {data.lname}</h2>
    <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {/* First Name */}
      <div>
        <label htmlFor="first-name" style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>First Name</label>
        <input
          id="first-name"
          type="text"
          value={Mfname}
          onChange={(e) => { setMFname(e.target.value) }}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="last-name" style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Last Name</label>
        <input
          id="last-name"
          type="text"
          value={Mlname}
          onChange={(e) => { setMLname(e.target.value) }}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Email</label>
        <input
          id="email"
          type="text"
          value={Memail}
          onChange={(e) => { setMEmail(e.target.value) }}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Password</label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Class */}
      <div>
        <label htmlFor="class" style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Class</label>
        <input
          id="class"
          type="text"
          value={Mmyclass}
          onChange={(e) => { setMMyclass(e.target.value) }}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Gender */}
      <div>
        <label htmlFor="gender" style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Gender</label>
        <select
          id="gender"
          name="gender"
          value={Mgender}
          onChange={(e) => { setMGender(e.target.value) }}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Block */}
      <div>
        <label htmlFor="block" style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Block</label>
        <select
          id="block"
          name="block"
          value={Mblock}
          onChange={(e) => { setMblock(e.target.value) }}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          <option value="unblock">UnBlock</option>
          <option value="block">Block</option>
        </select>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
        <button
          type="button"
          onClick={ (e)=>{onEditMember(e)}}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</div>

    </div>
  )
}
