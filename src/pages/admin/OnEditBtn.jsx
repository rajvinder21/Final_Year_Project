import React, { useState } from 'react';
import axios from 'axios';

export default function OnEditBtn({ data, onSubmit, onNotSuccess }) {
  const [name, setName] = useState(data.cname || "")
  const [descript, setDescript] = useState(data.descript || "")
  const [done, setDone] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  let success;
  console.log("clicgfdgfgked", data);
  
  function onEdit(e) {

    e.preventDefault();
    // console.log(fname, lname);


    async function mysend() {
      setIsLoading(true);
      axios.post('/dashboard/editClass', {

        class_id: data.class_id,
        cname: name,
        descript: descript


      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      )
        .then((response) => {
          console.log("edit class", response);
          if (response.data.success == true) {
            success = true
            setDone(true)
          }



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
    if (!isError) {
      if (success) {
        setDone(true)
      }

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
    onNotSuccess(false)
  }


  if (done) {
    return (
      <div>
        <h2>Sucessfully Edited </h2>
        <button type='button' onClick={onCancel}>Go Back</button>

      </div>
    );
  }
  return (
    <div >
      <h3>Editing {name}</h3>
      <form>
        <label>Classroom Name</label>
        <input type='text' value={name} onChange={(e) => { setName(e.target.value) }} />
        <label>Description </label>
        <input type='textarea' value={descript} onChange={(e) => { setDescript(e.target.value) }} />
        <button type="button" onClick={onEdit}>Submit</button>
        <button type='button' onClick={onCancel}>Cancel</button>
      </form>
    </div>
  )
}
