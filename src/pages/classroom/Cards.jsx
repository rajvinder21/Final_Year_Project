import React, { useEffect, useState } from 'react';
import axios, { Axios } from "axios";
import { useNavigate } from 'react-router-dom';
import "./classroom.css"
function Cards({ data, postClick }) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listt, setList] = useState([])
  const [lectList, setLectList] = useState([])
  const [active, setActive] = useState("posts");
  const [meeting_id, setMeeting_id] = useState([])

  const navigate = useNavigate();


  useEffect(() => {
    setIsLoading(true);
    console.log("called useeffect-1");

    let class_id = btoa(data)
    console.log("dl classs check", class_id);

    localStorage.setItem("class", class_id)

    async function getdata() {

      axios.get('/classroom/getpost', {
        headers: {
          classroom_id: data
        }
      })
        .then(function (response) {
          console.log(response.data[0]);
          setList(response.data[0])
        })
        .catch((err) => {
          console.log(err, "this we got");
          setIsError(true)

        })
        .finally(() => {
          setIsLoading(false)


        })
    }

    async function getlectdata() {

      axios.get('/classroom/videolecture', {
        headers: {
          classroom_id: data
        }
      })
        .then(function (response) {
          console.log("dl imported lecture ", response.data);
          setMeeting_id(response.data.videos)
        })
        .catch((err) => {
          console.log(err, "this we got");
          setIsError(true)

        })
        .finally(() => {
          setIsLoading(false)


        })
    }
    getdata()
    getlectdata()



  }, [data])

  function clickTitle(path) {
    // navigate('/classroom/post/' +path )
    postClick(path)

    console.log(path);

  }

  // lecture clicked 

  function onClickLecture() {
    setActive("lectures")


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
      <br />
      {/* <h2>Posts</h2> <h2>Lectures</h2> */}
      <div className="flex gap-4">
        <button
          onClick={() => setActive("posts")}
          disabled={active === "posts"}
          className={`border border-black px-4 py-2 text-lg ${active === "posts" ? "bg-gray-200 cursor-not-allowed" : "bg-white"
            }`}
        >
          Posts
        </button>
        <button
          onClick={() => onClickLecture()}
          disabled={active === "lectures"}
          className={`border border-black px-4 py-2 text-lg ${active === "lectures" ? "bg-gray-200 cursor-not-allowed" : "bg-white"
            }`}
        >
          Lectures
        </button>
      </div>

      {active === "posts" ? (<div className="row mt-3">
        {listt.length === 0 ? (
          <p className="text-muted fs-5">No classrooms created yet</p>
        ) : (
          listt.map((row, id) => (
            <div key={id} className="col-12 mb-4">
              <div className="card shadow-sm h-100 border-hover">
                <div className="row g-0">
                  {/* Left Icon Section */}
                  <div className="col-md-2 d-flex align-items-center justify-content-center bg-light-blue">
                    <i className="bi bi-journal-bookmark-fill fs-1 text-primary"></i>
                  </div>

                  {/* Right Content Section */}
                  <div className="col-md-10">
                    <div className="card-body p-4">
                      {/* Header Section */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <small className="text-muted">Created by:</small>
                          <h6 className="mb-0 text-primary">{row.author}</h6>
                        </div>
                        <small className="text-muted">{row.date}</small>
                      </div>

                      {/* Title */}
                      <h5 className="card-title mb-3 text-truncate hover-underline" onClick={() => { clickTitle(row) }}>
                        {row.title}
                      </h5>

                      {/* Description */}
                      <p className="card-text text-muted line-clamp-2 mb-4">
                        {row.description}
                      </p>

                      {/* File Attachment */}
                      <div className="d-flex align-items-center file-link-hover">
                        <i className="bi bi-paperclip me-2"></i>
                        <a href={row.link} target='_blank' className="text-decoration-none text-primary">
                          {row.file_name}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>) : <div>
        <h2>Lecture</h2>
        <div className=" container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Recorded Lectures</h2>
      <div className="video-width">
        {meeting_id.map((meet) => (
          <div key={meet.id} className="border rounded-lg  bg-white">
            <h3 className="font-semibold mb-2">{meet.createdAt}</h3>
            <div className="flex justify-center">
              <video controls className=" rounded-md" width={'80%'}>
                <source src={meet.fileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>}


      <style>
        {`

   .video-width{
   width:70%;
   }

  .border-hover {
    transition: all 0.3s ease;
    border: 1px solid rgba(0,0,0,0.1);
  }
  
  .border-hover:hover {
    border-color: #0d6efd;
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }
  
  .bg-light-blue {
    background-color: rgba(13,110,253,0.05);
    border-right: 1px solid rgba(0,0,0,0.1);
  }
  
  .hover-underline:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .file-link-hover:hover {
    transform: translateX(5px);
    transition: transform 0.2s ease;
  }
`}
      </style>

      <div className="row mt-3">
        {/* Card 1 */}






      </div>

    </div>
  );
}

export default Cards