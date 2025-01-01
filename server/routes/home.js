import express from "express";

const router = express.Router();

router.get("/",  (req, res) => {
    const data = {
        data : "we got data"
    }
    res.send(data)
})


export default router;