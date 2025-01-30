import express from "express";
import { login } from "../db.js";
import { createToken } from "./Auth/authMiddleware.js";
// import jwt from "jsonwebtoken";


// import mysql from 'mysql2/promise';
const router = express.Router();

router.get("/", (req, res) => {
  res.write("heelo world")
  res.send()
})

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const notes = await login(email, password);
  console.log(notes);


  if (notes.length == 0) {
    res.setHeader('success', false)
    console.log("wrong");

  }

  else {
    res.setHeader('success', true)
    const member_id = (notes[0].student_id) || (notes[0].professsor_id)
    const fname = notes[0].fname;
    const lname = notes[0].lname;

    const token = createToken(member_id,email)
    res.cookie('jwt',token, {maxAge: 1*24*60*60*1000}),


    console.log(member_id);


  }

  res.sendStatus(200)
  res.send()
});


export default router;



