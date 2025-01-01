import express from "express";
import { getOtp } from "../../db.js"
const router = express.Router();

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