import React from 'react'

function Post({ data, closePost,onPostEdit,onPostDel}) {

 function onClickEdit(row) {
  // console.log("we areeeee loging",row);
  onPostEdit(row)
  
 }

 function onClickDel(row) {
  onPostDel(row)
  console.log("del clicked");
  
 }


  return (
    <>


     
      <h2>Posts</h2>
      <button className="close-button" onClick={closePost} >
        <i className="bi bi-x"></i>
      </button>
      <button className="close-button" onClick={()=>{onClickEdit(data)}} >
        <i className="bi  bi-pencil-square"></i>
      </button>
      <button className="close-button" onClick={()=>{onClickDel(data)}} >
        <i className="bi bi-trash3-fill"></i>
      </button>

      <div className="content-container">
        <h1 className="post-heading">{data.title}</h1>

        <p className="post-paragraph">{data.description}</p>
        <div className="divider"></div>

        <div className="row bottom-info">
          <div className='post-date'>
            <span className="post-date">Post on:- {data.date}</span>
          </div>
          <div className='post-paragraph'>
            <span className="post-author">
              Created by <strong>{data.author}</strong>
            </span>
          </div>
          <div className='post-paragraph'>
            <a href={data.link} target="" className="file-link">
              <i className="bi bi-file-earmark file-icon"></i>
              {data.file_name}
            </a>
          </div>



          {/* <div className="col-12 col-md-4">
          <span className="post-date">{data.date}</span>
        </div>
        <div className="col-12 col-md-4 text-md-center">
          <span className="post-author">
            Created by <strong>{data.author}</strong>
          </span>
        </div>
        <div className="col-12 col-md-4 text-md-end">
          <a href={data.link}   className="file-link">
            <i className="bi bi-file-earmark file-icon"></i>
            {data.file_name}
          </a>
        </div> */}
        </div>
       
      </div>
       {/* Custom CSS using a style tag */}
       <style>{`
     
     .content-container {
       max-width: 700px;
       margin: 40px ;
       padding: 0 15px;
       text-align:left
     }
     .post-heading {
       font-weight: 700;
       margin-bottom: 1rem;
       font-size: 2rem;
     }
      .close-button {
      
         font-size: 1.25rem;
         cursor: pointer;
         margin-left:1rem;
         
       }
     .post-paragraph {
       margin-bottom: 1rem;
       line-height: 1.6;
       font-size: 1rem;
       color: #333;
       white-space: pre-line;
     }
     .divider {
       border-top: 1px solid #ccc;
       margin: 2rem 0 1rem;
     }
     .post-date,
     .post-author {
       font-size: 0.9rem;
       color: #555;
     }
     .file-link {
       text-decoration: none;
       font-size: 0.9rem;
       color: #555;
     }
     .file-link .file-icon {
       margin-right: 6px;
     }
     .bottom-info > div {
       margin-bottom: 0.5rem;
     }
   `}</style>
    </>
  )
}

export default Post