import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
// import AddMember from './AddMember';
import axios from 'axios';
import OnEditBtn from './OnEditBtn';
import Float from './Float';
import EditMember from './EditMember';
import DeleteMember from './DeleteMember';
import Footer from '../Home_Components/Footer';
import BlockMember from './BlockMember'



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
  const [block, setBlock] = useState(false);

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
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

            console.log("classes we have", response.data.admin_id);
            if (response.data.cname.length >= 1) {
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

  function onEditClick(row) {
    setOnEdit(true)
    setEditObj({
      class_id: row.classroom_id,
      cname: row.cname,
      descript: row.description
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
      gender: row.gender,
      class_id: row.classroom_id,
      password: row.password,
      professor_id: row.student_id,
      block: row.block
    });


    setEditMem(true)
    console.log(row.student_id);


  }

  function onBlockRow(row) {
    setBlockMem(true)
    setBlockMemData({
      fname: row.fname,
      lname: row.lname,
      professor_id: row.student_id
    })
  }


  /// DELETE Member
  function onDeleteRow(row) {
    setDelMem(true)
    setDeMemData({
      fname: row.fname,
      lname: row.lname,
      myclass: row.myclass,
      professor_id: row.student_id
    })

    console.log(row.student_id);



  }

  function onDeleteMemCancel(data) {
    setDelMem(false)
    setMyrun(!myrun)
  }

  function onBlockMemCancel(data) {
    setBlockMem(data)
  }


  if (delMem) {
    return (
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
      <nav style={{ backgroundColor: "#3d4da5" }} className="navbar navbar-expand-md navbar-dark p-3">
        <div className="container-fluid">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="#">
            <span className="me-2"><img src='images/logo.png' alt="Logo" /></span>
            <h4>Dashboard</h4>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Learn</a>
              </li>
            </ul>
            {/* Profile Icon */}
            <div className="d-flex">
              <span
                className="btn btn-light rounded-circle"
                onClick={() => setTooltipVisible(!tooltipVisible)}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                A
                {tooltipVisible && (

                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '110%', /* Positioning to the left of the button */
                      transform: 'translateY(-50%)',
                      backgroundColor: '#fff',
                      color: '#000',
                      padding: '10px 20px', /* Larger padding for a bigger tooltip */
                      borderRadius: '8px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                      whiteSpace: 'nowrap',
                      fontSize: '16px', /* Bigger font size */
                      marginRight: '10px' /* Space between the tooltip and button */
                    }}
                  >
                    #{fName} {lName}
                  </div>
                )}
              </span>
            </div>
          </div>
        </div>
      </nav>


        {/* /// classroom list */}

      <div style={{ margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h3>Your Classrooms</h3>
        {/* Scrollable container for classrooms */}
        <div style={{
          maxHeight: '400px', /* Adjust height based on desired space */
          overflowY: 'auto', /* Add vertical scroll */
          paddingRight: '10px' /* Space for scrollbar visibility */
        }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {rowing.length === 0 ? (
              <p style={{ fontStyle: 'italic', color: '#555' }}>No classrooms created yet.</p>
            ) : (
              rowing.map((row, id) => (
                <li
                  key={id}
                  onClick={() => classClicked(row.classroom_id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    margin: '10px 0',
                    backgroundColor: class_id === row.classroom_id ? 'lightblue' : '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{ flex: 1, fontWeight: 'bold', fontSize: '16px' }}>{row.cname}</div>
                  <div style={{ flex: 2, color: '#555', padding: '0 10px' }}>{row.description}</div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(row.classroom_id);
                      }}
                      style={{
                        color: '#f44336',
                        cursor: 'pointer',
                        margin: 0,
                        padding: '5px 10px',
                        border: '1px solid #f44336',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                      }}
                    >
                      Delete
                    </p>
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClick(row);
                      }}
                      style={{
                        color: '#4CAF50',
                        cursor: 'pointer',
                        margin: 0,
                        padding: '5px 10px',
                        border: '1px solid #4CAF50',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        textAlign: 'center'
                      }}
                    >
                      Edit
                    </p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <div>
        {/* <div>

          <form>
            <label>Classrom Name</label>
            <input type='text' value={cName} onChange={(e) => { setCNAme(e.target.value) }} />
            <input type='text' value={descript} onChange={(e) => { setDescript(e.target.value) }} />
            <button type='button' onClick={onClicked}>Create</button>
          </form>
        </div> */}

      
{/* /// create classroom  */}

<div style={{
          margin: '20px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
          <h3>Create Classroom</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Classroom Name Input */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="classroom-name" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Classroom Name</label>
              <input
                id="classroom-name"
                type='text'
                value={cName}
                onChange={(e) => { setCNAme(e.target.value) }}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Description Input */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="description" style={{ fontWeight: 'bold', marginBottom: '5px' }}>Description</label>
              <input
                id="description"
                type='text'
                value={descript}
                onChange={(e) => { setDescript(e.target.value) }}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type='button'
              onClick={onClicked}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#4CAF50',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                alignSelf: 'flex-start'
              }}
            >
              Create
            </button>
          </form>
        </div>
  

        <br />
        <hr />


        {/* Adding Member Code here ..... */}
        <div style={{
  margin: '0px',
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '100%'
}}>
  <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Add Member</h3>
  <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {/* First Name and Last Name (Same Row) */}
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{ flex: 1 }}>
        <label htmlFor="first-name" style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', display: 'block' }}>First Name</label>
        <input
          id="first-name"
          type='text'
          value={Mfname}
          onChange={(e) => { setMFname(e.target.value) }}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            width: '100%'
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <label htmlFor="last-name" style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', display: 'block' }}>Last Name</label>
        <input
          id="last-name"
          type='text'
          value={Mlname}
          onChange={(e) => { setMLname(e.target.value) }}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            width: '100%'
          }}
        />
      </div>
    </div>

    {/* Email and Class (Same Row) */}
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{ flex: 1 }}>
        <label htmlFor="email" style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', display: 'block' }}>Email</label>
        <input
          id="email"
          type='text'
          value={Memail}
          onChange={(e) => { setMEmail(e.target.value) }}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            width: '100%'
          }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <label htmlFor="class" style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', display: 'block' }}>Class</label>
        <input
          id="class"
          type='text'
          value={Mmyclass}
          onChange={(e) => { setMMyclass(e.target.value) }}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            width: '100%'
          }}
        />
      </div>
    </div>

    {/* Gender and Role (Same Row) */}
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{ flex: 1 }}>
        <label htmlFor="gender" style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', display: 'block' }}>Gender</label>
        <select
          id="gender"
          name='gender'
          value={Mgender}
          onChange={(e) => { setMGender(e.target.value) }}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            width: '100%'
          }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div style={{ flex: 1 }}>
        <label htmlFor="role" style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', display: 'block' }}>Role</label>
        <select
          id="role"
          value={Mrole}
          onChange={(e) => { setMRole(e.target.value); }}
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '14px',
            width: '100%'
          }}
        >
          <option value="Student">Student</option>
          <option value="Professor">Professor</option>
        </select>
      </div>
    </div>

    {/* Add Member Button */}
    <button
      type='button'
      onClick={onAddMember}
      style={{
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        alignSelf: 'flex-start'
      }}
    >
      Add Member
    </button>
  </form>
</div>





      </div>
      <div style={{
  margin: '20px',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
}}>
  <h3 style={{ fontSize: '18px', marginBottom: '15px' }}>Members</h3>
  <table style={{
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff'
  }}>
    <thead>
      <tr style={{
        backgroundColor: '#f5f5f5',
        fontWeight: 'bold'
      }}>
        <th style={{ textAlign: 'left', padding: '10px' }}>Fname</th>
        <th style={{ textAlign: 'left', padding: '10px' }}>Lname</th>
        <th style={{ textAlign: 'left', padding: '10px' }}>Gender</th>
        <th style={{ textAlign: 'left', padding: '10px' }}>Email Address</th>
        <th style={{ textAlign: 'left', padding: '10px' }}>Password</th>
        <th style={{ textAlign: 'left', padding: '10px' }}>Role</th>
        <th style={{ textAlign: 'left', padding: '10px' }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {getMemberr.length === 0 ? (
        <tr>
          <td colSpan="7" style={{
            textAlign: 'center',
            padding: '10px',
            fontStyle: 'italic',
            color: '#555'
          }}>
            No members available.
          </td>
        </tr>
      ) : (
        getMemberr.map((row, id) => (
          <tr 
            key={id} 
            onClick={() => { rowSelect(row.student_id) }}
            style={{
              padding: '10px',
              backgroundColor: row.block === "block" ? '#ffcccb' : rowid === row.student_id ? 'lightblue' : 'transparent',
              cursor: 'pointer'
            }}
          >
            <td style={{ padding: '10px' }}>{row.fname}</td>
            <td style={{ padding: '10px' }}>{row.lname}</td>
            <td style={{ padding: '10px' }}>{row.gender}</td>
            <td style={{ padding: '10px' }}>{row.email}</td>
            <td style={{ padding: '10px' }}>{row.password}</td>
            <td style={{ padding: '10px' }}>
              {(row.student_id && typeof row.student_id === 'string' && row.student_id.slice(0, 4) === "prof") 
                ? "Professor" 
                : "Student"}
            </td>
            <td style={{ padding: '10px' }}>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEditRow(row);
                }}
                style={{
                  marginRight: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteRow(row);
                }}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#f44336',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>


      <div>
<Footer/>
      </div>

    </div>


  )
}

export default Dashboard
