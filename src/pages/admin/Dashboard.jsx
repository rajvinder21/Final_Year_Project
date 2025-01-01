import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
// import AddMember from './AddMember';
import axios from 'axios';
import OnEditBtn from './OnEditBtn';
import Float from './Float';
import EditMember from './EditMember';
import DeleteMember from './DeleteMember';
import BlockMember from './BlockMember';



function Dashboard() {

  const [isLoading, setIsLoading] = useState(false);
  const [cName, setCNAme] = useState('')
  const [descript, setDescript] = useState('');
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false)
  const [change, setChange] = useState(false)
  const [selectedItem, setSelectedItem] = useState(false)
  const [getMemberr, setGetMember] = useState([])

  const [fName, setFName] = useState('..Loading ');
  const [lName, setLName] = useState('..');
  const [rowing, setRowing] = useState([])
  const [id, setId] = useState('');
  const [class_id, setClass_id] = useState('')
  const [block ,setBlock] = useState(false);

  // floating window
  const [float, setFloat] = useState(false)
  const [floatId, setFloatId] = useState('');

  //editing floating window
  const [onEdit, setOnEdit] = useState(false);
  const [editObj, setEditObj] = useState({ class_id: null, cname: null, descript: null })

  // adding member code ..................
  const [Mfname, setMFname] = useState('');
  const [Mlname, setMLname] = useState('');
  const [Memail, setMEmail] = useState('');
  const [Mgender, setMGender] = useState('Male');
  const [Mmyclass, setMMyclass] = useState('');
  const [Mrole, setMRole] = useState('Student');
  const [myrun, setMyrun] = useState(false)
  const [Mblock, setMblock] = useState("")
  const [rowid, setRowid] = useState('')

  const [rowData, setRowData] = useState({})
  const [editMem, setEditMem] = useState(false);
  // Deleting Member
  const [delMem, setDelMem] = useState(false)
  const [delMemData, setDeMemData] = useState({})
  // blocking member
  const [blockMem, setBlockMem] = useState(false);
  const [blockMemData, setBlockMemData] = useState({})

  useEffect(() => {
    setIsLoading(true);
    console.log("called useeffect-1");
    async function getdata() {


      axios.get('/dashboard')
        .then(function (response) {
          const confirm = response.data.confirm;

          if (confirm) {
            navigate("/admin-login")
            console.log("wgot dat ", confirm);
          }

          console.log("logged", response.data);

          if (response.data.fName != undefined) {


            setFName(response.data.fName)
            setLName(response.data.lName)
            setId(response.data.admin_id)

            console.log("classes we have",response.data.admin_id);
          if(response.data.cname.length >= 1 ){
            setRowing(response.data.cname)
            
            
            setClass_id(response.data.cname[0].classroom_id)
          }

            // here getting classroom_id which we will have to send ADDMEMBER Function
          //  console.log("this is class_id by default", response.data.cname[0].classroom_id);
            // const Classroom_id = useContext(response.data.cname[0].classroom_id)
           


            // localStorage.setItem("class_id", response.data.cname[0].classroom_id)

          }

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



  }, [change])



  useEffect(() => {
    // const item = localStorage.getItem('class_id')
    // setClass_id(item)
    async function myget() {
      setIsLoading(true)
      axios.get('/dashboard/getmember',
        {
          headers: {
            'class_id': class_id
          }
        })
        .then((response) => {
          console.log("we got this respone ello", response.data);
          setGetMember(response.data)

          console.log(response.data);



        })
        .catch((err) => {
          console.log(err);


        })
        .finally(() => {
          setIsLoading(false)

        })
    }
    myget()

  }, [class_id, myrun])


  //  code For Adding Member ...................

  function onAddMember(e) {

    e.preventDefault();
    // console.log(fname, lname);

    // const item = localStorage.getItem("class_id")
    async function mysend() {
      setIsLoading(true);
      axios.post('/dashboard/addmember', {
        fname: Mfname,
        lname: Mlname,
        email: Memail,
        class_id: class_id,
        gender: Mgender,
        role: Mrole,
        myclass: Mmyclass


      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      )
        .then((response) => {
          console.log("add member", response);
          setMEmail("")
          setMFname("")
          setMGender("Male")
          setMLname("")
          setMMyclass("")


        })
        .catch((err) => {
          console.log("add member", err);
          setIsError(true)

        })

        .finally(() => {
          setIsLoading(false)
          setMyrun(!myrun)

        })

    }


    mysend()
    console.log("clicked");


  }

  if (isLoading) {
    return <div><h1>this is loading </h1></div>;
  }

  if (isError) {
    return <div><h1>surprise we got error </h1></div>
  }

  function onClicked(e) {
    e.preventDefault();
    setChange(!change)
    console.log("clicked");

    async function mysend() {
      setIsLoading(true)

      axios.post("/dashboard", {
        cName: cName,
        descript: descript,
        admin_id: id
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      )

        .then((response) => {
          console.log(response);

        })
        .catch((err) => {
          setIsError(true)
          console.log(err);


        })
        .finally(() => {
          setIsLoading(false)
          setCNAme('')
          setDescript("")
        })
    }

    mysend()

  }

  function classClicked(myid) {
    setClass_id(myid)
    // localStorage.setItem("class_id", myid)
    console.log("we got id", myid);
    // setChange(!change)


  }

  // ***** this floating window FOR DELETion code be aware

  const tableStyle = {
    width: '100%',
    border: '1px solid black',
    borderCollapse: 'collapse',
  };

  function onDelete(myid) {

    console.log("clicked button", myid);

    setFloatId(myid);

    setFloat(true)
  }

  function onDataChange(data) {

    setFloat(data)

  }

  function onSuccess() {
    setChange(!change)
  }

  // ****************ON EDIT BUTTON CLICKED CODE
  function rowSelect(data) {
    setRowid(data)
    console.log(data);
    
  }

  function onEditClick(cname, myid, descript) {
    setOnEdit(true)
    setEditObj({
      class_id: myid,
      cname: cname,
      descript: descript
    })
  }

  function onSubmit() {
    console.log("eren jeger");

  } 
  
  
  function onNotSuccess(data) {
    setOnEdit(data)
    setChange(!change)
    
  }


  // ********** On clicked Button of Row MEMBER AREA *********


  //EDit
  function onEditMemberCancel(data) {
    setEditMem(data)
   setMyrun(!myrun)
  }

  function onEditRow(row) {

    setRowData({
      fname: row.fname,
      lname: row.lname,
      email: row.email,
      myclass: row.myclass,
      gender: row.gemder,
      class_id: row.classroom_id,
      password: row.password,
      professor_id: row.professsor_id,
      block:row.block
    });


    setEditMem(true)
   console.log(row.professsor_id);
   

  }

  function onBlockRow(row) {
    setBlockMem(true)
    setBlockMemData({
      fname: row.fname,
      lname: row.lname,
      professor_id:row.professsor_id
    })
  }


  /// DELETE Member
  function onDeleteRow(row) {
    setDelMem(true)
    setDeMemData({
      fname: row.fname,
      lname: row.lname,
      myclass: row.myclass,
      professor_id: row.professsor_id
    })

    console.log(row.professsor_id);
    


  }

  function onDeleteMemCancel(data) {
    setDelMem(false)
    setMyrun(!myrun)
  }

  function onBlockMemCancel(data) {
    setBlockMem(data)
  }


  if (delMem) {
    return(
    <div>
      <DeleteMember data={delMemData} onDeleteMemCancel={onDeleteMemCancel} />
    </div>);
  }



  if (editMem) {
    return (
      <div>
        <EditMember data={rowData} onEditMemberCancel={onEditMemberCancel} />
      </div>
    );
  }

  if (blockMem) {
    return (
      <div>
        <BlockMember data={blockMemData} onBlockMemCancel={onBlockMemCancel} />
      </div>
    );
  }



// editing deleting Classroom dont touch 
  if (float) {
    return (
      <div>
        <Float data={floatId} onDataChange={onDataChange} onSuccess={onSuccess} />
      </div>
    );
  }


  if (onEdit) {
    return (
      <div>
        <OnEditBtn data={editObj} onSubmit={onSubmit} onNotSuccess={onNotSuccess} />
      </div>
    );
  }


  // HTml start from here ..................
  return (

    <div>
      <h1>Dashboard</h1>
      <h3>welcome {fName} {lName}, </h3>

      <div>
        <h3>Your Classrooms </h3>
        <ul>
          {/* Here classroom name showsss */}
          {(rowing.length == 0) ? <p> not created any classroom</p> : rowing.map((row, id) => <li key={id} onClick={() => { classClicked(row.classroom_id) }} style={{
            padding: '10px',
            backgroundColor: class_id === row.classroom_id ? 'lightblue' : 'transparent',
            
            cursor: 'pointer'
          }}>{row.cname} <p>{row.description}</p>  <div style={{ float: "right", display: "flex" }}><p onClick={() => { onDelete(row.classroom_id) }}>Delete </p><p onClick={() => { onEditClick(row.cname, row.classroom_id, row.description) }}> Edit</p> </div> </li>)}
        </ul>

        <div>

          <form>
            <label>Classrom Name</label>
            <input type='text' value={cName} onChange={(e) => { setCNAme(e.target.value) }} />
            <input type='text' value={descript} onChange={(e) => { setDescript(e.target.value) }} />
            <button type='button' onClick={onClicked}>Create</button>
          </form>
        </div>
        <br />
        <hr />


        {/* Adding Member Code here ..... */}

        <div>
          <form>
            <label>First Name</label>

            <input type='text' value={Mfname} onChange={(e) => { setMFname(e.target.value) }} />

            <label>Last Name</label>
            <input type='text' value={Mlname} onChange={(e) => { setMLname(e.target.value) }} />

            <label>Email</label>
            <input type='text' value={Memail} onChange={(e) => { setMEmail(e.target.value) }} />
            <label>Class</label>
            <input type='text' value={Mmyclass} onChange={(e) => { setMMyclass(e.target.value) }} />

            <label>Gender</label>
            <select name='gender' value={Mgender} onChange={(e) => { setMGender(e.target.value) }}>
              <option value="Male" >Male</option>
              <option value="Female">Female</option>
            </select>

            <label>Role</label>
            <select value={Mrole} onChange={(e) => { setMRole(e.target.value); }}>
              <option value="Student">Student</option>
              <option value="Professor">Professor</option>
            </select>

            <button type='button' onClick={onAddMember}>Add Member</button>

          </form>

          <hr />



        </div>




      </div>
      <div>
        {/* This table show the student data  */}
        <table style={tableStyle} >
          <thead>
            <tr>
              {/* <th>No</th> */}
              <th>Fname</th>
              <th>Lname</th>
              <th>Gender</th>
              <th>Email Address</th>
              <th>Password</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {(getMemberr.length == 0) ? <tr ><td>not created any classroom</td></tr> : getMemberr.map((row, id) => <tr key={id} onClick={() => { rowSelect(row.professsor_id) }} style={{
              padding: '10px',
              backgroundColor: rowid === row.professsor_id ? 'lightblue' : 'transparent',
              backgroundColor: row.block === "block" ? 'red': "none",
              cursor: 'pointer',
            }}  >
              <td>{row.fname}</td>
              <td>{row.lname}</td>
              <td>{row.gemder}</td>
              <td>{row.email}</td>
              <td>{row.password}</td>
              <td>{(row.professsor_id && typeof row.professsor_id === 'string' && row.professsor_id.slice(0, 4) === "prof")
                ? "Professor"
                : "Student"}</td>
              <td onClick={() => { onEditRow(row) }} >edit</td>
              <td onClick={() => { onDeleteRow(row) }}>remove</td>
              <td>{row.block == "block" ? "block": "unblocked" }</td>
            </tr>

            )}
          </tbody>

        </table>
      </div>

      <div>

      </div>

    </div>


  )
}

export default Dashboard
