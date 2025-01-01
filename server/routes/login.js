import express from "express";
import { getUser } from "../db.js";
// import mysql from 'mysql2/promise';
const router = express.Router();

router.get("/", (req,res)=> {
  res.write("heelo world")
  res.send()
})

router.post("/", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const notes = await getUser(email, password)




  if (notes.length == 0) {
    res.setHeader('navigate', "/login")
    console.log("wrong");
    
    
  }

  else {
    const text = (notes[0].admin_id).slice(0,5)

    if (notes[0].admin_id == "admin" ) {
      
    }
    console.log(text);
    
    res.setHeader('navigat', "/dashboard")
  }
  console.log("we go row log", notes);
  res.setHeader("heelo","eeo")
  res.sendStatus(200)
  res.send()
});


export default router;



