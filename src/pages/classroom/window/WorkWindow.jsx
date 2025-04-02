import React, { useEffect, useState } from 'react';
import axios, { Axios } from "axios";



export default function WorkWindow({data, assignClick,modeldata}) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submit, setSubmit] = useState(false)
  const [show, setShow] = useState(false)
  const [list,setList] = useState([]);
  const [check , setCheck] = useState([])
  const [file, setFile] = useState(null);
  const  [assign, setAssign] = useState([])


useEffect(() => {
  console.log("whyyy",data);
  
  setIsLoading(true);
  console.log("called useeffect-1");
  async function getdata() {


    axios.get('/classroom/getassignment', {
      headers:{
        classroom_id: data,
        member_id:modeldata.member 
      }
    })
      .then(function (response) {
        if (modeldata.member.startsWith("prof")) {
          console.log(response.data.assign);

          setList(response.data.assign)

        } else {
          console.log(response.data);
          
          const findDissimilarElements = (assign, list) => {
            return list.filter(item => 
              !assign.some(assignItem => assignItem.assign_id === item.assign_id)
            );
          };
          
          // Ensure response data exists before processing
          if (response?.data?.assign && response?.data?.list) {
            const dissimilarElements = findDissimilarElements( response.data.list,response.data.assign);
            console.log(dissimilarElements);
            
            setList(dissimilarElements);
          } else {
            console.error("Response data is missing assign or list.");
          }
          
          
        }

        


         

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
  setAssign(path)
   if (modeldata.member.startsWith("prof")) {
    assignClick(path)
   } else {
    filePrompt(path)

   }
  

  console.log("DL ofr checking member who", (modeldata.member).startsWith("prof"));

}

const onSubmit = (e)=>{
  console.log(data);
  const formData = new FormData();
  formData.append("assign_id",assign.assign_id);
  formData.append("classroom_id", modeldata.class_id);
  formData.append("student_id", modeldata.member);
  formData.append("student_name", modeldata.memberName);
  formData.append("file", file);
 

  e.preventDefault();

  async function mysend() {
    setIsLoading(true)
    try {
      await axios.post("classroom/submitassignment", formData,
         {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        } )
        .then((res) => {
          console.log(res);

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
      setShow(false)
    }


  }

  mysend()
 
}


function filePrompt(assign) {
  setShow(true)
}

const handleFileChange = (e) => {
      
  setFile(e.target.files[0]);

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

   {/* <AssignCard data={data} assignClick={assignClick} ModelData={Modeldata}/>  */}
   
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
              <h5 className="card-title card-title-styled" onClick={()=>{clickTitle(row)}} >{row.title}</h5>
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

    {show && ( <div className="p-6 border border-gray-300 rounded-lg shadow-lg w-96 mx-auto mt-10 relative">
      <button 
        onClick={() => setShow(false)} 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✖
      </button>
      <h2 className="text-xl font-semibold mb-4">Upload Assignment</h2>
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="mb-4 block w-full border p-2 rounded"
      />
      <button 
        onClick={(e)=>{onSubmit(e)}} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Submit
      </button>
      
      {submit && (
        <p className="text-green-600 font-semibold mt-3">Assignment submitted successfully! ✅</p>
      )}
    </div>)}   
    </div>
  )
}
