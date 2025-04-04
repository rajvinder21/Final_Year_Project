import React from 'react'

export default function BlockMember({ data, onBlockMemCancel }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [done, setDone] = useState(false)
  let role = (data.professor_id && typeof data.professor_id === 'string' && data.professor_id.slice(0, 4) === "prof")
    ? "Professor"
    : "Student";
  const [Mrole, setMRole] = useState(role);

  function onCancel() {
    onBlockMemCancel(false)

  }

  function onBlock() {

    // do something 
    console.log("iddd", data.professor_id);

    e.preventDefault();



    async function mysend(e) {
      setIsLoading(true);
      axios.delete('/dashboard/blockmember', {
        headers: {
          'professor_id': data.professor_id,
          "myrole": Mrole
        }
      }
      )
        .then((response) => {
          console.log("del member", response);

        })
        .catch((err) => {
          console.log("del member", err);
          setIsError(true)

        })

        .finally(() => {
          setIsLoading(false)


        })

    }


    mysend()
    if (!isError) {
      setDone(true)
    }
    console.log("clicked");


  }

  // if (isLoading) {
  //   return <div><h1>this is loading </h1></div>;
  // }

  // if (isError) {
  //   return <div><h1>surprise we got error </h1></div>
  // }

  if (done) {
    return (
      <div>
        <h2>Sucessfully blocked {data.fname} {data.lname} </h2>
        <button type='button' onClick={onCancel}>Go Back</button>

      </div>
    );
  }




  return (
    <div>
      <h3>Do you want to block {data.fname} {data.lname}</h3>
      <button onClick={onCancel}>No</button>
      <button onClick={onBlock} >Yes</button>
    </div>
  )
}
