import express from "express";
import { login } from "../db.js";
import jwt from "jsonwebtoken";


// import mysql from 'mysql2/promise';
const router = express.Router();

router.get("/", (req,res)=> {
  res.write("heelo world")
  res.send()
})

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const notes = await login(email, password);
  console.log( notes);
  

  if (notes.length == 0) {
    res.setHeader('success', false)
    console.log("wrong");
    
   }

  else {
    res.setHeader('success', true)
    const id = (notes[0].student_id) || (notes[0].professsor_id )
    const fname = notes[0].fname ;
    const lname = notes[0].lname ;
    const class_id = notes[0].classroom_id ;
    
    
    console.log(id);
    
    // res.setHeader('navigat', "/dashboard")
  }
  // console.log("we go row log", notes);
  
  res.sendStatus(200)
  res.send()
});


export default router;



