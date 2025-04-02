// import mysql from "mysql2"; 

import { v4 as uuidv4 } from "uuid";
import mysql from 'mysql2';
import { populate } from "dotenv";
// import mysql from 'mysql';



const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "mydb"
}).promise()


async function getUser(email, password) {
  const [rows] = await pool.query(`SELECT * FROM admins WHERE email = ? AND password = ?`, [email, password])
  return rows;


}

async function setTempSignup(email, pass, uuid, otp) {

  const [result] = await pool.query('SELECT * FROM temp_admins WHERE email = ?', [email])
  if (result.length == 0) {
    const [results] = await pool.query(`INSERT INTO temp_admins(admin_id,email,password,otp) VALUES(?,?,?,?)`, [uuid, email, pass, otp])
    return results
  }
  return false

}

async function getOtp(admin_id) {
  const [result] = await pool.query(`SELECT otp FROM temp_admins WHERE admin_id= ?`, [admin_id])
  return result
}

async function createSignUp(uuid, email, pass, fName, lName, zip, phone, country, address, states, gender, DOB, join) {
  const [result] = await pool.query(`INSERT INTO admins(admin_id, email , password ,fName ,lName ,zip_code ,PHONE_NO ,country ,addresss ,state ,gender,DOB,join_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`, [uuid, email, pass, fName, lName, zip, phone, country, address, states, gender, DOB, join])

  const id = result.insertId
  return id
}




async function getAdminDetail(id) {

  const [result] = await pool.query('SELECT * from admins WHERE admin_id = ?', [id])
  return result


}


async function createClassroom(id, cName, admin_id, descript) {

  const [result] = await pool.query(`INSERT INTO classroom_admin(classroom_id,cName,admin_id,description) VALUES(?,?,?,?)`, [id, cName, admin_id, descript])
  return result
}

async function getClassroom(id) {
  const [result] = await pool.query('SELECT cname, classroom_id,description FROM classroom_admin WHERE admin_id = ?', [id])
  return result
}


const notes = await getUser()
// console.log(notes);


async function createStudent(fname, lname, email, myclass, gender, class_id, password, student_id) {
  // checking if data is already there
  const [res] = await pool.query(`SELECT * FROM students WHERE email = ?`, [email])
  console.log(res);

  if (res.length == 0) {
    const [result] = await pool.query(`INSERT INTO students(student_id,fname,lname,email,password,myclass,gender) VALUES(?,?,?,?,?,?,?)`, [student_id, fname, lname, email, password, myclass, gender])
    const [results] = await pool.query(`INSERT INTO member_participants(member_id, classroom_id) VALUES(?,?)`, [student_id, class_id])
    return results
  }

  const [results] = await pool.query(`INSERT INTO member_participants(member_id, classroom_id) VALUES(?,?)`, [res[0].student_id, class_id])
  return results
}


async function createProfessors(fname, lname, email, myclass, gender, class_id, password, professor_id) {

  const [res] = await pool.query(`SELECT * FROM professors WHERE email = ?`, [email])
  console.log("here we are checking something", res);

  if (res.length == 0) {
    const [result] = await pool.query(`INSERT INTO professors(professsor_id,fname,lname,email,password,myclass,gender) VALUES(?,?,?,?,?,?,?)`, [professor_id, fname, lname, email, password, myclass, gender])
    const [results] = await pool.query(`INSERT INTO member_participants(member_id, classroom_id) VALUES(?,?)`, [professor_id, class_id])
    return results
  }

  const [results] = await pool.query(`INSERT INTO member_participants(member_id, classroom_id) VALUES(?,?)`, [res[0].professsor_id, class_id])
  return results

}


async function getMember(class_id) {

  const [result] = await pool.query(`SELECT s.* FROM member_participants mp
JOIN students s ON s.student_id = mp.member_id
WHERE mp.classroom_id = ?
UNION
SELECT p.* FROM member_participants mp
JOIN professors p ON p.professsor_id = mp.member_id
WHERE mp.classroom_id = ?;`, [class_id, class_id])

  return result

}

async function editClass(class_id, cname, descript) {
  const [result] = await pool.query(`UPDATE classroom_admin SET cname = ?, description = ? WHERE classroom_id = ?`, [cname, descript, class_id]);
  return result;
}


/// here classroom deleting 
async function deladmin(class_id, password) {

  const [result] = await pool.query(`SELECT classroom_admin.classroom_id, admins.password FROM admins INNER JOIN classroom_admin 
    ON classroom_admin.admin_id = admins.admin_id WHERE classroom_admin.classroom_id = ?;`, [class_id])


  console.log("this shown db", result);

  if (result.password == password) {
    const [result, field] = await pool.query(`DELETE FROM classroom_admin WHERE classroom_id = ? ;`, [class_id])
    console.log("checking here db.js", result, field);
    return true;

    // if (result.affectedRows = 1) {

    //   const [result] = await pool.query(`DELETE FROM students WHERE classroom_id = ? ;`, [class_id])
    //   const [resultt] = await pool.query(`DELETE FROM professors WHERE classroom_id = ? ;`, [class_id])
    //   // more delete of classroom will be there 
    //   return true
    // }



  }
  return false

}


// Member 
// edit member 
async function editStudent(fname, lname, email, myclass, gender, password, block, student_id) {
  const [result, field] = await pool.query(`UPDATE students SET fname = ?, lname = ?, email =? , myclass = ?, gender =? , password = ?, block=?  WHERE student_id = ?;`, [fname, lname, email, myclass, gender, password, block, student_id])
  console.log("we get result from db editstudnet", result, field);

  return result;
}

async function editProfessor(fname, lname, email, myclass, gender, password, block, student_id) {
  const [result, field] = await pool.query(`UPDATE professors SET fname = ?, lname = ?, email =? , myclass = ?, gender =? , password = ?, block= ? WHERE professsor_id = ?;`, [fname, lname, email, myclass, gender, password, block, student_id])
  console.log("we get result from db editprofessor", result, field);

  return result;
}

/// Deleting MEmberrr

async function delStudent(student_id) {
  const [result] = await pool.query(`DELETE FROM students WHERE student_id = ? ;`, [student_id]);
  return result
}

async function delProfessor(professor_id) {
  const [result] = await pool.query(`DELETE FROM professors WHERE professsor_id = ? ;`, [professor_id]);
  return result
}



//////////////NormaL user code 

async function login(email, password) {
  const [result] = await pool.query(`SELECT * FROM (SELECT * FROM students UNION ALL SELECT * FROM professors) AS combined_users
WHERE email = ? AND password = ? ;`, [email, password])

  return result;
}

async function getMemberClassroom(member_id) {
  const result = await pool.query(`SELECT * FROM classroom_admin
WHERE classroom_id IN (SELECT classroom_id FROM member_participants WHERE member_id = ? );`, [member_id])
  return result
}

async function getMemberName(member_id) {
  const firstFour = member_id.slice(0, 4);
  if (firstFour == "prof") {
    const [result] = await pool.query('SELECT * from professors where professsor_id = ?', [member_id])
    return result
  }

  const [result] = await pool.query('SELECT * from students where student_id = ?', [member_id])
  return result

}

async function createPostWithFile(post_id, class_id, title, descript, link, filename, author, date) {

  const result = await pool.query(`INSERT INTO posts(post_id,classroom_id,title,description,link,file_name,author,date) VALUES(?,?,?,?,?,?,?,?)`, [post_id, class_id, title, descript, link, filename, author, date])
  return result
}

async function createAssignment(assign_id, class_id, title, descript, link, filename, author, date, submission) {

  const result = await pool.query(`INSERT INTO assignments(assign_id,classroom_id,title,description,link,file_name,author,date,submission) VALUES(?,?,?,?,?,?,?,?,?)`, [assign_id, class_id, title, descript, link, filename, author, date, submission])
  return result
}

async function submitAssignment(assign_id, link, student_id,student_name, date,late) {

  const result = await pool.query(`INSERT INTO assign_completes(assign_id,link,student_id,Student_name,date,late) VALUES(?,?,?,?,?,?)`, [assign_id, link, student_id,student_name, date, late])
  return result
}

async function checkassign(member_id) {
  const [result] = await pool.query(`SELECT * FROM student_assignments WHERE student_id = ?`, [member_id])
  return result ;
}

async function studentAssign(member_id, assign_id, assign_status) {
  const [result] = await pool.query(`INSERT INTO student_assignments(student_id ,assign_id, status)`, [member_id,assign_id,assign_status])
  return result ;
}

async function getPosts(class_id) {
  const result = await pool.query(`SELECT * FROM posts WHERE classroom_id = ?`, [class_id])
  return result;
}

async function getAssignments(class_id) {
  const [result] = await pool.query(`SELECT * FROM assignments WHERE classroom_id = ?`, [class_id])
  return result;
}

async function checkMeet(class_id, date) {
  const result = await pool.query(`SELECT * FROM meets where date = date`);
  return result;
}



async function createMeet(class_id, meeting_id, date) {
  const [check, field] = await pool.query('SELECT * FROM meets WHERE date = ? and classroom_id = ?', [date,class_id])
  console.log(check.length);

  if (check.length == 0) {
    const result = await pool.query(`INSERT INTO meets(classroom_id,meeting_id,date) VALUES(?,?,?)`, [class_id, meeting_id, date])
    return meeting_id;
  }
  else {
    return check[0].meeting_id
  }

}

async function editPost(post_id, title, descript, link, file_name, professor_id, gettime) {
  console.log(professor_id, post_id, gettime);

  const [result] = await pool.query(`UPDATE posts SET title = ?, description = ?, link = ? , file_name = ?, date = ?   WHERE post_id = ? and author=?;`, [title, descript, link, file_name, gettime, post_id, professor_id])
  return result;
}

async function delPost(post_id) {

  const [result] = await pool.query(`DELETE FROM posts where post_id = ?`, [post_id])
  return result;
}

async function delAssign(assign_id) {

  const [result] = await pool.query(`DELETE FROM assignments where assignment_id = ?`, [assign_id])
  return result;
}

async function createLecture(lecture_id, lecture_name, professor_id, classroom_id, start_time, end_time, date) { 
  const [result] = await pool.query(`INSERT INTO lectures(lecture_id, classroom_id, name, professor_id, start_time, end_time, date ) VALUES(?,?,?,?,?,?,?)`, [lecture_id, classroom_id, lecture_name, professor_id, start_time, end_time, date])
  return result;
} 

async function takeAttend(lecture_id,member_id,attendance_status) {
  const [result] = await pool.query(`INSERT INTO attendance(lecture_id,member_id,attendance_status) VALUES(?,?,?)`,[lecture_id,member_id,attendance_status])
}

async function getLecture(classroom_id) {
  const [result] = await pool.query("SELECT * FROM lectures WHERE classroom_id = ?", [classroom_id])
  return result ;
}

async function takerecord(classroom_id,lecture_id,lecture_name,meetingId,date,atendstat) {
  const [result] = await pool.query("INSERT INTO records(classroom_id,lecture_id,lecture_name, meeting_id,date,status) VALUES(?,?,?,?,?,?)",[classroom_id,lecture_id,lecture_name,meetingId,date,atendstat])
  return result;
}

async function startRecord(lecture_id,statusAttend) {
  const [result] = await pool.query("UPDATE records SET status = ? WHERE lecture_id = ?",[statusAttend, lecture_id]);
  return result;
}

async function getAllAttendance() {
  const [result] = await pool.query(`SELECT * FROM attendance`);
  return result ;
}

async function videolecture(class_id) {
  const [result] = await pool.query(`SELECT * FROM records WHERE classroom_id= ? and  status = ? `,[class_id,"true"])
  return result;
}


 

export {
  getUser, createSignUp, getAdminDetail, setTempSignup, getOtp, login,
  createClassroom, getClassroom, createStudent,
  createProfessors, getMember, deladmin, editClass,
  editStudent, editProfessor,
  delStudent, delProfessor,    /// they all are used in admin panel 
  getMemberClassroom, getMemberName,      //// func use in classrooms
  createPostWithFile, createAssignment,submitAssignment, /// function for postss 

  getPosts, getAssignments, delAssign,
  createMeet, checkMeet, editPost, delPost,
  createLecture, takeAttend , getLecture,studentAssign,
  takerecord,startRecord, getAllAttendance,
  videolecture, checkassign
};


