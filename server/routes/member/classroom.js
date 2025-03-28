import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import moment from "moment/moment.js";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary';
import { uploadFile,downloadFile } from "../../service/cloudserver.js";
import { createPostWithFile,createAssignment,
  getPosts,getAssignments, editPost,
   delPost, delAssign,getMemberName } from "../../db.js";
import { v4 as uuidv4 } from "uuid";

 






import { getMemberClassroom, getMember } from "../../db.js";


const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/", async (req, res) => {
  console.log("successfully get in classroom");
    

  const data = {
    confirm: false
  }
  res.send(data)
})



router.get("/getclassroom", async (req, res) => {
  const token = req.cookies.jwt;
  let member_id;

  jwt.verify(token, 'attackontitan', (err, decodedToken) => {
    if (err) {
      console.log("restrcited routes");
      console.log(err);

    } else {
      member_id = decodedToken.id
    }

  })

  const classrooms = await getMemberClassroom(member_id)
  const memberData = await getMemberName(member_id)
  console.log(memberData);
  
  const data = {
    classrooms: classrooms[0],
    member_id: member_id,
    memberData:memberData
  }
  res.send(data)

})

router.get("/getmember", async (req, res) => {
  const class_id = req.headers.classroom_id;
  console.log(class_id);

  const result = await getMember(class_id);
  // console.log(result);



  res.status(200)
  res.send(result)


})

router.post('/postedit', upload.single("file"), async (req,res)=>{
  const post_id = req.body.post_id ;
  const class_id = req.body.classroom_id;
  const title = req.body.title;
  const descript = req.body.descript;
  const professor_id = req.body.professor_id;
  // const file = req.file;
  const file_name = req.body.freeName;
  const gettime =  moment().format('YYYY/MM/DD HH:mm:ss')
  
  console.log("successfull",post_id);

  if (req.file) {

   
    console.log(file_name);
    

    try {
      const fileUrl = req.file.path; 
      const fileId = req.file.filename; 
      console.log(fileId,fileUrl);

      const fileresult = await uploadFile(fileUrl,class_id)
      console.log(fileresult,fileresult.secure_url);   
      const link = fileresult.secure_url
      // adding data to database
      const data = await editPost(post_id,title,descript,link,file_name,professor_id,gettime)
      console.log("database log with file:- ", data)
    } catch (error) {
      console.log("we got err",error);
      
    }


  
   
    res.send()
    res.status(200)

  }

  else {

    const data = await editPost(post_id,title,descript, '#','No File',professor_id,gettime)
    console.log("database log without file:- ", data)
 

   
    res.send()
    res.status(200)
  }

  
  
})



router.get('/delpost', async (req,res)=>{
  const post_id = req.headers.post_id ;

  const result = await delPost(post_id);
  console.log(result);

  
    
  

 

   res.status(200)
   res.send(result)
   
  


})

router.get('/delassignment', async (req,res)=>{
  const assign_id = req.headers.assign_id ;

  const result = await delAssign(assign_id);
  console.log(result);

  
    
  

 

   res.status(200)
   res.send(result)
   
  


})




router.get('/getpost', async (req,res)=>{
  const classroom_id = req.headers.classroom_id ;

  const result = await getPosts(classroom_id);
  // console.log(result);

  
    
  

 

   res.status(200)
   res.send(result)
   
  


})

router.get('/getassignment', async (req,res)=>{
  const classroom_id = req.headers.classroom_id ;

  const data = await getAssignments(classroom_id);
  // console.log(data);
  

 
  res.send(data)
  res.status(200)
  

})







router.post("/createPost", upload.single("file"), async (req, res) => {
  const post_id = "post-"+ uuidv4();
  const class_id = req.body.classroom_id;
  const title = req.body.title;
  const descript = req.body.descript;
  const professor_id = req.body.professor_id;
  const file = req.file;
  const file_name = req.body.freeName;
  const gettime = moment().format('YYYY/MM/DD HH:mm:ss')

 
  

  if (req.file) {

   
    console.log(file_name);
    

    try {
      const fileUrl = req.file.path; 
      const fileId = req.file.filename; 
      console.log(fileId,fileUrl);

      const fileresult = await uploadFile(fileUrl,class_id)
      console.log(fileresult,fileresult.secure_url);   
      const link = fileresult.secure_url
      // adding data to database
      const data = await createPostWithFile(post_id,class_id,title,descript,link,file_name,professor_id,gettime)
      console.log("database log with file:- ", data)
    } catch (error) {
      console.log("we got err",error);
      
    }


  
   
    res.send()
    res.status(200)

  }

  else {

    const data = await createPostWithFile(post_id,class_id,title,descript, '#','No File',professor_id,gettime)
    console.log("database log without file:- ", data)
 

   
    res.send()
    res.status(200)
  }

  


})


router.post("/createAssignment", upload.single("file"), async (req, res) => {
  const assign_id = "assign-"+ uuidv4();
  const class_id = req.body.classroom_id;
  const title = req.body.title;
  const descript = req.body.descript;
  const professor_id = req.body.professor_id;
  const file = req.file;
  const file_name = req.body.freeName;
  const gettime = moment().format('YYYY/MM/DD HH:mm:ss')
  const submission = req.body.submission ;

 


  if (req.file) {

   
    console.log(file_name);
    

    try {
      const fileUrl = req.file.path; 
      const fileId = req.file.filename; 
      console.log(fileId,fileUrl);

      const fileresult = await uploadFile(fileUrl,class_id)
      console.log(fileresult,fileresult.secure_url);   
      const link = fileresult.secure_url
      // adding data to database
      const data = await createAssignment(assign_id,class_id,title,descript,link,file_name,professor_id,gettime,submission)
      console.log("database log with file:- ", data)
    } catch (error) {
      console.log("we got err",error);
      
    }


  
    res.status(200)
    res.send()


  }

  else {

    const data = await createAssignment(assign_id,class_id,title,descript, '#','No File',professor_id,gettime,submission)
    console.log("database log without file:- ", data)
 

    res.status(200)
    res.send()
  }

  


})







export default router;