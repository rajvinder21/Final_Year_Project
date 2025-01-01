// import mysql from "mysql2"; 

import { v4 as uuidv4 } from "uuid";
import mysql from 'mysql2';
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
  const [result] = await pool.query(`INSERT INTO students(student_id,fname,lname,email,password,myclass,classroom_id,gender) VALUES(?,?,?,?,?,?,?,?)`, [student_id, fname, lname, email, password, myclass, class_id, gender])
  return result;
}


async function createProfessors(fname, lname, email, myclass, gender, class_id, password, professor_id) {
  const [result] = await pool.query(`INSERT INTO professors(professsor_id,fname,lname,email,password,myclass,classroom_id,gemder) VALUES(?,?,?,?,?,?,?,?)`, [professor_id, fname, lname, email, password, myclass, class_id, gender])
  return result;
}


async function getMember(class_id) {
  const [result] = await pool.query(`select professsor_id,fname,lname,email,password,myclass,classroom_id,gemder,block from professors where classroom_id = ? UNION 
select student_id,fname,lname,email,password,myclass,classroom_id,gender,block from students where classroom_id = ?`, [class_id, class_id])

  return result;
}

async function editClass(class_id, cname, descript) {
  const [result] = await pool.query(`UPDATE classroom_admin SET cname = ?, description = ? WHERE classroom_id = ?`,[cname, descript, class_id] );
  return result ;
}


/// here classroom deleting 
async function deladmin(class_id, password) {
  const [result] = await pool.query(`SELECT classroom_admin.classroom_id, admins.password FROM admins INNER JOIN classroom_admin 
    ON classroom_admin.admin_id = admins.admin_id WHERE classroom_admin.classroom_id = ?;`, [class_id])


  console.log("this shown db", result);

  if (result.password == password) {
    const [result, field] = await pool.query(`DELETE FROM classroom_admin WHERE classroom_id = ? ;`, [class_id])
    console.log("checking here db.js", result, field);

    if (result.affectedRows = 1) {

      const [result] = await pool.query(`DELETE FROM students WHERE classroom_id = ? ;`, [class_id])
      const [resultt] = await pool.query(`DELETE FROM professors WHERE classroom_id = ? ;`, [class_id])
      // more delete of classroom will be there 
      return true
    }



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
  const [result, field] = await pool.query(`UPDATE professors SET fname = ?, lname = ?, email =? , myclass = ?, gemder =? , password = ?, block= ? WHERE professsor_id = ?;`, [fname, lname, email, myclass, gender, password, block, student_id])
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

export {
  getUser, createSignUp, getAdminDetail, setTempSignup, getOtp,
  createClassroom, getClassroom, createStudent,
  createProfessors, getMember, deladmin, editClass,
  editStudent, editProfessor,
  delStudent, delProfessor
};



