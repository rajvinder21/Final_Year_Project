import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();


router.get('/get-token',  (req,res)=>{
  
    
   
    
    console.log('hello');
    
    const data = { 
        token:process.env.VIDEO_TOKEN
    }
    res.send(data)
   
})

export default router;