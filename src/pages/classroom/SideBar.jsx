import React, { useEffect, useState } from 'react';
import axios, { Axios } from "axios";


export default function SideBar({classSelect, SetMember}) {

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [classrooms, setclassrooms] = useState([]);
  const [selectClass, setSelectClass] = useState('')


  useEffect(() => {

    async function myget() {
      setIsLoading(true)
      axios.get('/classroom/getclassroom')

        .then((response) => {
          console.log("ggetclassroom", response);


          setclassrooms(response.data.classrooms);
          classSelect(response.data.classrooms[0].classroom_id)
          setSelectClass(response.data.classrooms[0].classroom_id)
          SetMember(response.data.member_id)



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

  }, [])



  if (isLoading) {
    return <div><li><p className="text-decoration-none">No Classrooms</p></li></div>;
  }

  function onClassSelect(id) {
    classSelect(id)
    setSelectClass(id)
  }

  console.log("this is seleted",selectClass);


  
  return (
    <div className="sidebar" id="sidebar">
      <h4>Classroom</h4>
      <ul className="list-unstyled">

        {/* Here classroom name showsss */}
        {(classrooms.length == 0) ? <p> not created any classroom</p> : classrooms.map((row, id) => <li key={id} onClick={() => { onClassSelect(row.classroom_id) }}
        style={{
            padding: '10px',
            backgroundColor: selectClass === row.classroom_id ? 'lightblue' : 'transparent',
            
            cursor: 'pointer'
          }}
        ><a href="#" className="text-decoration-none" onClick={onClassSelect }>+ {row.cname} </a> </li>)}



        {/* <li><a href="#" className="text-decoration-none">+ Science</a></li>
        <li><a href="#" className="text-decoration-none">+ IT</a></li>
        <li><a href="#" className="text-decoration-none">+ Maths</a></li> */}
      </ul>
    </div>
  );
}
