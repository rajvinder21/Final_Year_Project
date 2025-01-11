import jwt from "jsonwebtoken";





const key = "helloworld";
const adminAuth = (req,res,next)=>{
    console.log("hello");
    
    const token = req.cookies.jwt ;

    if (token) {
        jwt.verify(token, 'attackontitan',(err,decodedToken)=>{
            if (err) {
                console.log("restrcited routes");
                console.log(err);

                 
            } else {
                // console.log(decodedToken);
                // console.log(decodedToken);
                
                next();
                
            }

        })
    } else {
        console.log("no thanks");
        const data = {
         confirm : true}
         res.json(data)
        
    }
}


const maxAge = 1*24*60*60;

const createToken = (id,email)=> {
    console.log("create token is called", );
    
    return jwt.sign({id,email},"attackontitan",{expiresIn: maxAge })
}

export  {adminAuth,createToken};