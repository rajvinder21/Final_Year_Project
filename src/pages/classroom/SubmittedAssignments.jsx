import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";

const SubmittedAssignments = ({data,member, closeAssignt}) => {
  const [list,setList] = useState([]);
   const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
 
  useEffect( ()=>{
    async function myget() {
      console.log(data.assign_id);
      
      setIsLoading(true)
      axios.get('/classroom/getassignresult', {
        headers:{
          "assign_id":data.assign_id ,
        }
      })

        .then((response) => {
          console.log( response)
          setList(response.data)


        })
        .catch((err) => {
          console.log(err);
          setIsError(true)


        })
        .finally(() => {
          setIsLoading(false)

        })
    }
    myget()

  },[])


function onClose() {
  closeAssignt();

}

if (isError) {
  return <div><h1>this is error </h1></div>;
}

if (isLoading) {
  return <div><h1>this is loading </h1></div>;
}


  return (
    <div className="container mt-4">
    <h3 onClick={()=>{onClose()}}>Close</h3>
      <h2 className="text-2xl font-bold mb-4">Submitted Assignments</h2>
      <table className="table table-striped">
        <thead className="bg-primary text-white">
          <tr>
            <th>#</th>
            <th>Student Name</th>
            
            <th>Submission Date</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {list.map((assignment, index) => (
            <tr key={assignment.id}>
              <td>{index + 1}</td>
              <td>{assignment.Student_name}</td>
              <td>{assignment.date}</td>
              <td><a href={assignment.link}>Link</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedAssignments;
