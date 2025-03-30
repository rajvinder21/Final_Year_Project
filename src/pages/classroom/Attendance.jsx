import React, {  useEffect, useState } from 'react';
import axios, { Axios } from "axios";

function Attendance({data}) {
 const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lectureList,setLectureList] = useState([]);
  const [students, setStudents] = useState([]);
  const [dates, setDates] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [letWait, setLetWait] = useState(true);


useEffect(() => {
  console.log("whyyy",data);
  
  setIsLoading(true);
  console.log("called useeffect-1");
  async function getdata() {


    axios.get('/classroom/getlecture', {
      headers:{
        classroom_id: data
      }
    })
      .then(function (response) {
        
         console.log(response.data);
         setStudents(response.data.students);
         setDates(response.data.lectures);
         setAttendance(response.data.attendances);
         let attend = response.data.attendances ;
         if (attend.length > 0) {
          setLetWait(false)
         } else {
          setLetWait(true)
         }
         
        //  setLectureList(response.data[0])

         

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

if (isError) {
  return <div><h1>this is error </h1></div>;
}

if (isLoading) {
  return <div><h1>this is loading </h1></div>;
}

if (letWait) {
  return <div><h1>nothing to see here </h1></div>;
}

function getName(id) {
  let name = students.find((item) => item.professor_id === id || item.student_id === id);

  if (!name) return "Unknown";  

  return `${name.fname} ${name.lname}`;  
}

  return (
    <div>
    <h2>Attendance</h2>

    {dates.length > 0 ?  (<div className="overflow-auto max-w-full  rounded-lg ">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 bg-gray-200  px-4 py-2">Students</th>
            {dates.map((date, index) => (
              <th key={index} className=" px-4 py-2 bg-gray-100">{date.name} {date.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>

          {attendance.map((attend, rowIndex) => (
            <tr key={rowIndex}>
              <td className="sticky left-0 bg-white  px-4 py-2 font-semibold">{getName(attend.student)} </td>
              {dates.map((date, colIndex) => (
                <td key={colIndex} className=" px-4 py-2 text-center">
                {attend[date.date]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>): <>no data </>}
     
    </div>
  )
}

export default Attendance