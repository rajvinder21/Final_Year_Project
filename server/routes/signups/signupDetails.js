import express from "express";
import { createSignUp,createClassroom } from "../../db.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";




router.post("/", async (req, res, next) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const DOB = req.body.DOB;
  const address = req.body.address;
  const zip = req.body.zip;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const country = req.body.country;
  const states = req.body.states;
  const uuid = req.headers.uuid;
  const email = req.headers.email;
  const pass = req.headers.pass;
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let join = `${year}-${month}-${day} `;


 // database codee 
console.log(join,uuid,email,pass);
const notes = await createSignUp(uuid, email, pass, fName, lName, zip, phone, country, address, states, gender, DOB, join);
//creating default classroom 
const id = "classroom-" + uuidv4();
const cname = "Default Classroom";
const descript = "This is default classroom, it generates on signin ";
const result = createClassroom(id, cname, uuid, descript);



  res.sendStatus(200)
  res.send()

  console.log(uuid, phone, zip);


 




});


export default router;