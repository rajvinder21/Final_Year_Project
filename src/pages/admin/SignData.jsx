// SignData.jsx
import React, { useEffect, useState } from 'react';
import SignupVerify from './SignupVerify';


const SignData = ({data}) => {
  // Step 1: Set up state using useState

  const [adminId, setAdminId] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
console.log("bro we got this ", data);

  // Step 2: Define a function that updates the state
//   const updateSignData = (newAdminId, newPass, newEmail) => {
//     setAdminId(newAdminId);
//     setPass(newPass);
//     setEmail(newEmail);
//   };

()=>{
    setAdminId(data.admin_id);
        setPass(data.pass);
        setEmail(data.email);
}

  return (
    <div>
      <h1>SignData Component</h1>
      
   
    </div>
  );
};

export default SignData;
