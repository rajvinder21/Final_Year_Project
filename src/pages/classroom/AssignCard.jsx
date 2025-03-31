import React, { useEffect, useState } from 'react';
import axios, { Axios } from "axios";

import './assignCard.css';


function AssignCard({data}) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [list,setList] = useState([])


useEffect(() => {
  console.log("whyyy",data);
  
  setIsLoading(true);
  console.log("called useeffect-1");
  async function getdata() {


    axios.get('/classroom/getassignment', {
      headers:{
        classroom_id: data
      }
    })
      .then(function (response) {
        
         console.log(response.data[0]);

         setList(response.data[0])

         

      })
      .catch((err) => {
        console.log(err);
        setIsError(true)

      })
      .finally(() => {
        setIsLoading(false)


      })
  }

  getdata()



}, [data])

function clickTitle(path) {
  (data.member).startsWith("prof") ? 
  AssignClick(path) : filePrompt(path)

  console.log(path);

}


  // code of if get error and loading 

  if (isError) {
    return <div><h1>this is error </h1></div>;
  }

  if (isLoading) {
    return <div><h1>this is loading </h1></div>;
  }

  
    return (
       <div>

<br/>
<h2>Assignments</h2>
       {/* this is Assignment Carddd */}
       {(list.length == 0) ? <p> not created any classroom</p> : list.map((row, id) => <div key={id} className="container my-4">
      <div className="card horizontal-card mb-3">
        <div className="row g-0">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <i className="bi bi-exclamation-triangle card-icon"></i> {/* Caution icon */}
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title card-title-styled" onClick={clickTitle(row)} >{row.title}</h5>
              <p className="card-text card-description">{row.description}</p>
              <p className="card-text created-date"><strong>Created on:</strong> {row.date}</p> 
            </div>
          </div>
          <div className="col-md-2 d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-warning mb-2 time-remaining-button">{row.submission}</button>
            <p className="text-muted download-text"><a href={row.link} target='_blank'>Download File</a></p>
          </div>
        </div>
      </div>
    </div>

  )}
  


        </div>
    )
}

export default AssignCard