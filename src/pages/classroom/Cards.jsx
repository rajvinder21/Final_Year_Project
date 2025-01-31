import React, { useEffect, useState } from 'react';
import axios, { Axios } from "axios";
import { useNavigate } from 'react-router-dom';

function Cards({data}) {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [list,setList] = useState([])
      const navigate = useNavigate();
   
  
  useEffect(() => {
    setIsLoading(true);
    console.log("called useeffect-1");
    async function getdata() {


      axios.get('/classroom/getpost', {
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
    navigate('/classroom/post/' +path )
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
    <h2>Posts</h2>
   
   <div className="row mt-3">
  {list.length === 0 ? (
    <p className="text-muted fs-5">No classrooms created yet</p>
  ) : (
    list.map((row, id) => (
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
                <h5 className="card-title mb-3 text-truncate hover-underline" onClick={()=>{clickTitle(row.post_id)}}>
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
</div>

<style>
{`
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
  {(list.length == 0) ? <p> not created any classroom</p> : list.map((row, id) => <div key={id} className="col-md-6 col-lg-6 mb-3">
    <div className="card p-3 shadow-sm">
      {/* Creator Info */}
      <div className="text-muted small mb-2">Created by: <strong>{row.author}</strong></div>

      {/* Card Title */}
      <h5 className="card-title">{row.title}</h5>

      {/* Card Description */}
      <p className="card-text text-muted">
        {row.description}
      </p>

      {/* File Section */}
      <div className="d-flex align-items-center mb-2">
        <i className="bi bi-file-earmark-text me-2"></i>
        <a href={row.link} className="text-primary text-decoration-none">
         {row.file_name}
        </a>
      </div>

      {/* Date and Time */}
      <div className="text-muted small text-end">Posted on: {row.date}</div>
    </div>
  </div>


  )}


  
 
 
</div>
      
    </div>
  );
}

export default Cards