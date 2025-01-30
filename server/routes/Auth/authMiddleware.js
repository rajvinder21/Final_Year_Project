import jwt from "jsonwebtoken";





const key = "helloworld";
const adminAuth = (req,res,next)=>{
    console.log("hello");
    
    const token = req.cookies.jwt ;

    if (token) {

        try {
            jwt.verify(token, 'attackontitan', (err, decodedToken) => {
                if (err) {
                    console.log("Restricted routes");
                    console.log(err);
                    const data = {
                        confirm : true } 
                        res.json(data)
                    // Handle token-specific error (e.g., invalid or expired token)
                } else {
                    // Token is valid, proceed to the next middleware
                    // console.log(decodedToken);
                    next();
                }
            });
        } catch (error) {
            console.log("An unexpected error occurred during token verification:", error);
            
            // Handle unexpected errors (e.g., syntax errors, runtime issues)
        }
    } else {
        console.log("no thanks");
        const data = {
         confirm : true } 
         res.json(data)
        
    }
}


const maxAge = 1*24*60*60;

const createToken = (id,email)=> {
    console.log("create token is called", );
    
    return jwt.sign({id,email},"attackontitan",{expiresIn: maxAge })
}

export  {adminAuth,createToken};