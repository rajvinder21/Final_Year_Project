import express from "express";
import { getUser } from "../../db.js";
import { createToken } from "../Auth/authMiddleware.js";
const router = express.Router();

router.post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const notes = await getUser(email, password);

    if (notes.length == 0) {
        res.setHeader('navigate', "/login")
        console.log("wrong");
    }

    else {
        const adminid = notes[0].admin_id ;
        const emailid = notes[0].email ;
        console.log(adminid,email);
        const token = createToken(adminid,emailid)
        res.cookie('jwt',token, {maxAge: 1*24*60*60*1000}),
        res.setHeader('navigat', "/dashboard")

    }

    console.log("we got admin row log", notes);
    
    res.sendStatus(200)
    res.send()

})

export default router;