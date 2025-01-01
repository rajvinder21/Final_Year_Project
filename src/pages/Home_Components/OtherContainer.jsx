
function OtherContainer(){
    return(
        <div>
            <div>
        <div className="page1-Container">
          <div className="row">
            <div className="page1-Container-Title col">
              <h1 className="page1-Title ">Virtual <br />Classroom</h1>
            </div>
            <div className="page1-Container-Image col">
              <img src="images/first-bg.png" alt="" />
            </div>
          </div>
        </div>
        {/* second container */}
        <div className="page1-Container-2">
          <div className="row">
            <div className="page1-Container-2-Image col">
              <img src="images/second-bg.jpg" alt="" />
            </div>
            <div className="col">
              <div className="page1-Title-Container">
                <h1 className="page1-Title-2 ">We Provide <u>Smart</u>
                  <br />Online Education
                </h1>
              </div>
              <div className="page1-para-container">
                <p className="page1-Container2-para">Our Classroom Come With Assigned Projects,<br />
                  Direct Interactions With Mentor, Relevant<br />
                  Resources, And Tools That Help You Dive Into-<br />Depth Learning From Anywhere</p>
              </div>
            </div>
          </div>
        </div>
        {/* Third Section Page one  */}
        <div className="page1-Container-3 ">
          {/* first row  */}
          <div className="row align-items-md-stretch myrow">
            {/* first col container  */}
            <div className="chat-box-plus col-md-6 brown-box ">
              <div className="card-body">
                <h5 className="brown-box-title">Our Features Special <br />
                  For You </h5>
                <a className="join-btn btn btn-light">Join</a>
              </div>
            </div>
            {/* second col container -2  */}
            <div className=" chat-box col-md-6  ">
              <div className="row align-items-md-stretch">
                <img className src="images/chatroom.png" />
                <div className="col">
                  <h3 className="chat-title">Chatroom</h3>
                  <p>Platform Provide
                    Chatroom For Student,
                    Interact And Discuss At
                    The Same Time
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* second row  */}
          <div className=" row align-items-md-stretch myrow2 ">
            <div className="chat-box-plus chat-box  col-md-6  ">
              <div className="row align-items-md-stretch">
                <img className src="images/attendence.png" />
                <div className="col">
                  <h3 className="chat-title">Attendance</h3>
                  <p>System Automatically 
                    Captures And Manage 
                    data, Generating 
                    Comprehensive Graph
                  </p>
                </div>
              </div>
            </div>
            {/* fourth container  */}
            <div className="chat-box col-md-6   ">
              <div className="row align-items-md-stretch">
                <img className src="images/recorded video.png" />
                <div className="col">
                  <h3 className="chat-title">Video Lesson</h3>
                  <p>Recorded Version of 
                    Lectures From Live 
                    Session, To Boost Your 
                    Growth Of The Student
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
}

export default OtherContainer;