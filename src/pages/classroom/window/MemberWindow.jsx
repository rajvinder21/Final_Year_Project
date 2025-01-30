import React, { useEffect, useState } from 'react';
import axios, { Axios } from "axios";


export default function MemberWindow({data}) {
 const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [class_id , setClass_id ] = useState(data)
  const [memberlist, setMemberList] = useState([])
console.log("w e got data",data);

  useEffect(() => {
   console.log("member window", data);
   
    async function myget() {
      setIsLoading(true)
      axios.get('/classroom/getMember', {
        headers : {
          classroom_id: data
        }
      })

        .then((response) => {
          console.log("ggetmember", response.data);
          setMemberList(response.data)


        
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

  }, [data])



  if (isLoading) {
    return <div><h2 className="text-decoration-none">Loading ...</h2></div>;
  }



  return (
    <div>
    <h2 className="text-center mb-4">Classroom Member</h2>
    
   
    <div className="table-responsive">
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-primary text-center">

      
           <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
    
        {(memberlist.length == 0) ?<tr ><td>You have no members</td></tr> : memberlist.map((row, id) => <tr key={id}  >
            <td>{id}</td>
            <td>{row.fname}</td>
            <td>{row.lname}</td>
            <td>{row.gender}</td>
            <td>{row.myclass}</td>
          </tr>
        
        )}
        </tbody>
      </table>
    </div>
  </div>

  )
}
