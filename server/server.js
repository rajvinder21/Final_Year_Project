import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;
// app.use(express.static('build'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
import signup from "./routes/signups/signup.js";
import signupDetails from "./routes/signups/signupDetails.js"
import login from "./routes/login.js";
import home from "./routes/home.js"

import adminLogin from "./routes/signups/admin-login.js"
import dashboard from "./routes/admin/dashboard.js";
import signupVerify from "./routes/signups/signupVerify.js";
import classroom from "./routes/member/classroom.js"

import { adminAuth } from "./routes/Auth/authMiddleware.js";
import video from "./routes/videocall/video.js"




// signup 
app.use('/signup', signup);

app.use('/signup-verify', signupVerify)

app.use("/signup-details", signupDetails)


// admin login routes+

app.use('/admin-login',adminLogin)

// normal login route
app.use("/login", login)


// admin dashboard

app.use("/dashboard", adminAuth, dashboard)


// classrom 

app.use("/classroom",adminAuth,classroom)

app.use('/videocall',video)



app.listen(PORT, () => {
  console.log("virtual classs is live noww at " + PORT);

})