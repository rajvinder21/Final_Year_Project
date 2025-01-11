import express from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import Randomstring from "randomstring";

import { getAdminDetail, createClassroom, getClassroom,
  createStudent, createProfessors, getMember, deladmin,editClass,
   editStudent,editProfessor,
  delStudent,delProfessor } from "../../db.js";
import e from "express";
const router = express.Router();

/// creating classroooms here
router.post('/', async (req, res, next) => {
  const cName = req.body.cName;
  const admin_id = req.body.admin_id;
  const descript = req.body.descript; 
  const uuid = "classroom-" + uuidv4();
 

  console.log(cName, admin_id, uuid);
  const user = await createClassroom(uuid, cName, admin_id,descript)

  res.send()

})

/// sending admin details here and classrooms 
router.get("/", async (req, res) => {

  const token = req.cookies.jwt;
  let id;

  jwt.verify(token, 'attackontitan', (err, decodedToken) => {
    if (err) {
      console.log("restrcited routes");
      console.log(err);


    } else {
      id = decodedToken.id



    }

  })

  const user = await getAdminDetail(id);


  const row = await getClassroom(id)
  


  const daata = {
    "fName": user[0].fName,
    "lName": user[0].lName,
    "cname": row,
    "admin_id": user[0].admin_id,
    "description":user[0].description
  }




  res.send(daata)



})


router.post("/addmember", async (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const gender = req.body.gender;
  const role = req.body.role;
  const myclass = req.body.myclass;
  const class_id = req.body.class_id;

  const password = Randomstring.generate({
    length:10,
    charset: ['numeric', '!','abc']
  }) ;
  const student_id = "student-"+ uuidv4();
  const professor_id = "prof"+ uuidv4();
console.log(password);

 
  if (role == "Student"){

    const user = await createStudent(fname, lname, email, myclass, gender, class_id,password,student_id)
    console.log(user);
    
  }
  else if (role == "Professor") {
    const users = await createProfessors(fname, lname, email, myclass, gender, class_id,password,professor_id)
    console.log("we set profesffor",users);
  }
  else{
  console.log("express not match dashjs");
  
  }

  
  // const user = createMember
  
  const dat = {
    topic : 'sucess'
  }
  res.json(dat)
  res.send() 

})


router.get("/getmember", async (req,res,next)=>{
const class_id = req.headers.class_id ;
console.log(req.headers.class_id);

const user = await getMember(class_id)
console.log("Db member data ",user);
// console.log("got requested");


  res.send(user)

})

router.post("/editmember", async (req,res)=>{
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const gender = req.body.gender;
  const role = req.body.role;
  const myclass = req.body.myclass;
  const classroom_id = req.body.classroom_id;
  const professor_id = req.body.professor_id
  const password = req.body.password;
  const block = req.body.block ;
  let success = false;

  if(role === "Student"){
    console.log("studnet want edit",fname, lname, email, myclass, gender,password,professor_id );
    const result = await editStudent(fname, lname, email, myclass, gender,password,block,professor_id)
    if (result.chagedRow == 1){
      success = true; 
    }
  }

  if(role === "Professor"){
    console.log("professor want edit");
    const result = await editProfessor(fname, lname, email, myclass, gender,password,block,professor_id)
    if (result.changedRow == 1){
      success = true; 
    }
    
  }
const myjson={
  success: success
}
res.json(myjson)
res.send()

})


router.delete('/delmember', async (req,res)=>{
  let success = false;
  const professor_id = req.headers.professor_id ;
  const role = req.headers.myrole
  if(role === "Student"){
    const result = await delStudent(professor_id)

    if (result.affectedRows == 1){
      success = true; 
    }
    
  }

  if(role === "Professor"){
    const result = await delProfessor(professor_id)
    if (result.affectedRows == 1){
      success = true; 
    }
    
  }
  
  console.log("delete ",professor_id);
  res.json({
    success: success
  })
  
  res.send()

})



router.delete('/blockmember', async (req,res)=>{
  let success = false;
  const professor_id = req.headers.professor_id ;
  const role = req.headers.myrole
  if(role === "Student"){
    const result = await blockStudent(professor_id)

    if (result.affectedRows == 1){
      success = true; 
    }
    
  }

  if(role === "Professor"){
    const result = await blockProfessor(professor_id)
    if (result.affectedRows == 1){
      success = true; 
    }
    
  }
  
  console.log("block ",professor_id);
  res.json({
    success: success
  })
  
  res.send()

})


router.post("/editClass", async (req,res)=>{
  const class_id = req.body.class_id ;
  const cname = req.body.cname ;
  const descript = req.body.descript ;
  let success = false ;

  const result = await editClass(class_id,cname,descript)
  console.log(result);
  
  if (result.changedRows == 1){
    success = true; 
  }

  res.json({
    success: success
  })
  res.send()
})


router.post("/delclass", async (req,res)=>{
    const class_id = req.body.class_id ;
    const password = req.body.password ;
    
    console.log(class_id);
    
    const result = await deladmin(class_id)
    console.log("delete admin result",result);
   
    

    if (result) {
      const data = {
        success: true
      }
      res.send(data)
    }

  else{
      const data = {
        success:false
      }
      res.send(data)
    
  }


    
})




export default router;