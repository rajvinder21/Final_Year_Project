import express from "express";
import nodemailer from "nodemailer" ;
import { getOtp } from "../../db.js"
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
   
  });


router.get("/", async (req, res, next) => { 
    const admin_id = req.headers.admin_id ;

    const row = await getOtp(admin_id);
    console.log("i got call from verfiivatopm chek",row[0].otp);
    let otp = row[0].otp ;
    let email = row[0].email ; 
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Your Virtual Classsrom Signup OTP Code",
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 500px; margin: auto; text-align: center;">
          <h2 style="color: #007bff;">🔐 Your OTP Code</h2>
          <p style="font-size: 16px; color: #333;">Use the following OTP to verify your account:</p>
          <div style="font-size: 24px; font-weight: bold; color: #d9534f; padding: 10px; border: 2px dashed #d9534f; display: inline-block; margin: 10px 0;">
            ${otp}
          </div>
          <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #666;">If you did not request this OTP, please ignore this email.</p>
          <p style="font-size: 12px; color: #888; margin-top: 10px;">&copy; VirtualClassroom 2025</p>
        </div>
      `,
      };
    
      try {
        await transporter.sendMail(mailOptions);
        console.log("we are done some where");
        
       
      } catch (error) {
        console.log("i got call from verfiivatopm chek",error);
        
        res.status(500).json({ error: "Error sending OTP", details: error.message });
      }

    
   

})


router.post("/", async (req, res, next) => {
    const otp = req.body.otp;
    const admin_id = req.body.admin_id;
    console.log("we got otp", otp, admin_id);
    let success = false;


    if (admin_id != "no data") {
        const row = await getOtp(admin_id)
        console.log(row[0].otp);
        
        if (row[0].otp == otp) {
            success = true
        }

    }

    res.send({ success: success })



});

export default router;