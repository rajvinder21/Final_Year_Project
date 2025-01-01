import React, { useState } from 'react'
import axios from 'axios';

export default function Float({data, onDataChange,onSuccess}) {
const [class_id, setClass_id] = useState(data)
const [pass, setPass] = useState('');
const [complete, setComplete] = useState('0')


function onCancel() {
    onDataChange(false)
}


function onDelete() {
    // const class_id = sendId ;

    if (pass == "" || pass == " ") {
        return false
    }
    console.log(class_id);
    async function myfunc() {
        axios.post('/dashboard/delclass', {
            class_id:class_id,
            password: pass
        }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
        .then((respone)=>{
            console.log("this is respone",respone);
            if (respone.data.success == true) {
                onSuccess();
                setComplete('1')
                onDataChange(false)
            }

            else{
                setComplete('2')
            }
            
           
        })
        .catch( (err)=>{
            console.log(err);
            
        })

        .finally(()=>{
            onDataChange(false)
        })
    }

    myfunc()
    
}

if (complete == "1") {
    return (
        <div>
            <h3>success fully deleted</h3>
        </div>
    );
}


if (complete == "2") {
    return (
        <div>
            <h3>You typed password   </h3> 
            <button type='button' onClick={onCancel}>Cancel</button>
        </div>
    );
}


  return (
    <div >
        <p>do you really want to delete </p>
        <label>For Confirmation Enter Your Password</label>
        <input type='password' value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
        <button type='button' onClick={onDelete}>Delete</button><br/>
        <button type='button' onClick={onCancel}>Cancel</button>
    </div>
  )
}
