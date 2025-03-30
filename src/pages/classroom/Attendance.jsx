import React from 'react';
import axios, { Axios } from "axios";

function Attendance() {
 const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lectureList,setLectureList] = useState([])


useEffect(() => {
  console.log("whyyy",data);
  
  setIsLoading(true);
  console.log("called useeffect-1");
  async function getdata() {


    axios.get('/classroom/getassignment', {
      headers:{
        classroom_id: data
      }
    })
      .then(function (response) {
        
         console.log(response.data[0]);
         
         setLectureList(response.data[0])

         

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


  return (
    <div>
    <h2>Attendance</h2>
     <div className="overflow-auto max-w-full border border-gray-400 rounded-lg shadow-lg">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 bg-gray-200 border border-gray-400 px-4 py-2">Students</th>
            {lectureList.map((lecture, index) => (
              <th key={index} className="border border-gray-400 px-4 py-2 bg-gray-100">{lecture.name} {lecture.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>

          {students.map((student, rowIndex) => (
            <tr key={rowIndex}>
              <td className="sticky left-0 bg-white border border-gray-400 px-4 py-2 font-semibold">{student}</td>
              {dates.map((_, colIndex) => (
                <td key={colIndex} className="border border-gray-400 px-4 py-2 text-center">
                  ✅ / ❌
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Attendance