import React, { useEffect, useState } from 'react';
import axios, { Axios } from "axios";


export default function SideBar({classSelect, SetMember,SetMemberData}) {

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [classrooms, setclassrooms] = useState([]);
  const [selectClass, setSelectClass] = useState('');
 
  


  useEffect(() => {

    async function myget() {
      setIsLoading(true)
      axios.get('/classroom/getclassroom')

        .then((response) => {
          console.log("ggetclassroom", response.data.classrooms[0].classroom_id);


          setclassrooms(response.data.classrooms);
          classSelect(response.data.classrooms[0])
          setSelectClass(response.data.classrooms[0])
          
          SetMember(response.data.member_id)
          SetMemberData(response.data.memberData[0])




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
        {(classrooms.length == 0) ? <p> not created any classroom</p> : classrooms.map((row, id) => <li key={id} onClick={() => { onClassSelect(row) }}
        style={{
            padding: '10px',
            backgroundColor: selectClass.classroom_id === row.classroom_id ? 'lightblue' : 'transparent',
            
            cursor: 'pointer'
          }}
        ><a href="#" className="text-decoration-none" onClick={onClassSelect }>+ {row.cname} </a> </li>)}



        {/* <li><a href="#" className="text-decoration-none">+ Science</a></li>
        <li><a href="#" className="text-decoration-none">+ IT</a></li>
        <li><a href="#" className="text-decoration-none">+ Maths</a></li> */}
      </ul>
      
<style>
{`


`}
</style>

    </div>
  );
}
