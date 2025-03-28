import React, { ChangeEvent, useEffect, useState } from 'react';
import axios, { Axios } from "axios";


export default function PostModel({data,postEdit, handleCloseModal }) {
    const [activeTab, setActiveTab] = useState("post"); // "post" or "assignment"
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle ] = useState(postEdit.title ||"");
    const [descript, setDescript] = useState(postEdit.description ||"");
    const [file, setFile] = useState(null);
    const [date,setDate] = useState('');
    let freeName ; 


    const onEdit = (e)=>{
      console.log("no issue here and there");
      
      const formData = new FormData();
      formData.append("post_id",postEdit.post_id)
      formData.append("classroom_id", postEdit.classroom_id);
      formData.append("title", title);
      formData.append("descript", descript);
      formData.append("professor_id", postEdit.author);
      formData.append("file", file);
      formData.append('freeName',freeName);
   
    
      e.preventDefault();
      async function mysend() {
        setIsLoading(true)
        try {
          await axios.post("classroom/postedit", formData,
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
         
        }

  
      }
  
      mysend()
  
  
    

      handleCloseModal()
    }





    const onPost = (e)=>{
      console.log(data);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("descript", descript);
      formData.append("classroom_id", data.class);
      formData.append("professor_id", data.member);
      formData.append("file", file);
      formData.append('freeName',freeName);
   
    
      e.preventDefault();
      async function mysend() {
        setIsLoading(true)
        try {
          await axios.post("classroom/createPost", formData,
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
         
        }

  
      }
  
      mysend()
  
  
    

      handleCloseModal()
    }


    const onSubmit = (e)=>{
      const formData = new FormData();
      formData.append("title", title);
      formData.append("descript", descript);
      formData.append("classroom_id", data.class);
      formData.append("professor_id", data.member);
      formData.append('submission',date)
      formData.append("file", file);
      formData.append('freeName',freeName);
      console.log(date);
      
    
      e.preventDefault();
      async function mysend() {
        setIsLoading(true)
        try {
          await axios.post("classroom/createAssignment", formData,
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
        }
      }
  
      mysend()
  
      handleCloseModal()
    }

    const handleFileChange = (e) => {
      
        setFile(e.target.files[0]);
      
    }

    if (isError) {
      console.log("this is place");
  
      return <div><h1>something went wrong </h1></div>;
    }
  
    if (isLoading) {
      return <div><h1>this is loading </h1></div>;
    }
  

    return (
    
    
          <div
            className="position-fixed top-50 start-50 translate-middle bg-white p-4 shadow-lg rounded"
            style={{ width: "90%", maxWidth: "500px", zIndex: 1050 }}
          >
            {/* Prompt Header */}
            <h5 className="mb-4">Create New {activeTab === "post" ? "Post" : "Assignment"}</h5>
  
            {/* Tab Buttons */}
            <div className="d-flex justify-content-center mb-4">
              <button
                className={`btn ${activeTab === "post" ? "btn-primary" : "btn-outline-primary"} me-2`}
                onClick={() => setActiveTab("post")}
              >
                Post
              </button>

              {postEdit.title == undefined ? <button
                className={`btn ${activeTab === "assignment" ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setActiveTab("assignment")}
              >
                Assignment
              </button> :<></> }
              
            </div>
  
            {/* Form Fields */}
            <form>
              {/* Title Field */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  placeholder="Enter title"
                  value={title}
                  onChange={ (e)=>{setTitle(e.target.value)}}

                />
              </div>
  
              {/* Description Field */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="3"
                  placeholder="Enter description"
                  value={descript}
                  onChange={(e)=>{setDescript(e.target.value)}}
                ></textarea>
              </div>

              <div className="mb-3">
                    <label htmlFor="fileUpload" className="form-label">
                      File Upload (if needed)
                    </label>
                    <input
                      type="file"
                      id="fileUpload"
                      className="form-control"
                     
                      onChange={handleFileChange}
                    />

                    {file && ( 

                    

                     <div className='text-sm'>
                      <p>File size: {(file.size/1024).toFixed(2)} <br/>
                      File type: {file.type} 
                      {freeName = file.name}
                     </p>
                    </div> 

                  )}
                  </div>

  
              {/* Assignment-Specific Fields */}
              {activeTab === "assignment" && (
                <>
                  {/* Submission Date */}
                  <div className="mb-3">
                    <label htmlFor="submissionDate" className="form-label">
                      Submission Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      id="submissionDate"
                      className="form-control"
                      onChange={(e)=>{setDate(e.target.value)}}
                    />
                  </div>
  
                
                </>
              )}
  
              {/* Actions */}
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>

                {activeTab === "assignment" && (
                  <>
                  <button type="submit" onClick={onSubmit} className="btn btn-primary">
                  Submit
                </button>
                  </>
                )} 

                {activeTab === "post" && (
                  <>
                  <button type="submit" onClick={ postEdit.title == undefined ? onPost: onEdit} className="btn btn-primary">
                  Post
                </button>
                  </>
                )} 

              </div>
            </form>
          </div>
    )
}
