import express from "express";

import { v4 as uuidv4 } from "uuid" ;
import { setTempSignup } from "../../db.js";
import Randomstring from "randomstring";

const app = express();

const router = express.Router();



router.post("/", async (req, res) =>{
   
    const email = req.body.email;
    const password = req.body.password ;
    const uuid = "admin-"+uuidv4(); 
 const otp = Randomstring.generate({
    length:6,
    charset: ['numeric']
  }) ;
  
  console.log("we go data",email,password,uuid,otp);
  
  // res.status(result)  
  // res.setHeader('uuid',uuid)
let data ={
  success: true,
  uuid: uuid
}

  // adding to temp database with otp 
  const row = await setTempSignup(email,password,uuid,otp);
  console.log(row);

  

  if(row == false){
    data ={
      success: false,
      uuid:"no data"
    }
  }


  res.send(data)


});

export default router;
