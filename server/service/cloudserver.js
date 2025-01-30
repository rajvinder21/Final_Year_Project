import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import fs from "fs";
import axios from 'axios';



dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET_KEY
});


    
async function uploadFile(path,folder) {
    
    
    const uploadResult = await cloudinary.uploader
    .upload(path, {
        folder: '/'+folder,                      
        resource_type: 'auto',
        }
    )
    .catch((error) => {
        console.log(error);
    });
 

 return uploadResult;
}
 
async function downloadFile(token) {
    const url = cloudinary.utils.sign_url(token, {
        resource_type: 'raw',
        expires_at: Math.floor(Date.now() / 2000) + 3600,
        
      });

    return url
}
  
// const storage = new CloudinaryStorage({
  //   cloudinary: cloudinary,
  //   params: {
  //     folder: 'Home', 
  //     resource_type: 'auto', 
  //     format: async (req, file) => {'txt','png','jpeg','jpg'},  
  //   },
  // });


 export {uploadFile, downloadFile } ;