const express=require("express");
const mysql=require("mysql");
const cors=require("cors");
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const random = require('random')
const PORT=process.env.PORT || 5000;
const app=express();

app.use(cors());
app.use(express.json())
app.use(fileUpload());

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'login_react'
})

app.get("/",(req,res)=>{
   
    
    res.send("welcome to the node-express-mysql ok");
})

app.post("/upload",(req,res)=>{

    const data={
        name:req.body.name,
         email:req.body.email,
         
         image:req.body.image,
         
    
    };
    let sql="INSERT INTO `img_upload` SET ?";
    db.query(sql,data,(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
             console.log("inserted");
             res.send(result);
            // res.send()

        }
    })

})

app.post('/imgupload', (req, res) => {
   
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let targetFile = req.files.imgfile;
    let newimgFile = req.files.newimg;

    let extName = path.extname(targetFile.name);
    let newextName = path.extname(newimgFile.name);

   
    const num= random.int(10000,999999);
  
     let uploadDir = path.join(__dirname, '../client','public','upload', num+targetFile.name);
     let newuploadDir = path.join(__dirname, '../client','public','upload', num+newimgFile.name);

    let imgList = ['.png','.jpg','.jpeg'];
    // Checking the file type
    if(!imgList.includes(extName)  ){
      
        return res.json({submit:false,msg:"Only jpg ,jpeg and png"})
    }
    if(!imgList.includes(newextName)  ){
      
        return res.json({submit:false,msg:"Only jpg ,jpeg and png"})
    }

    if(targetFile.size > 2000000 ){
       
       return res.json({submit:false,msg:"File should be less then 2 MB "})
    }
    if( newimgFile.size > 2000000){
       
        return res.json({submit:false,msg:"File should be less then 2 MB "})
     }

    

    targetFile.mv(uploadDir, (err) => {
        if (err)
        {
            return res.status(500).send(err);
        }
        else{

            newimgFile.mv(newuploadDir,(err)=>{
                if (err)
                {
                    return res.status(500).send(err);
                }
                else{

                    const imgname=num+targetFile.name
                    const newimgname=num+newimgFile.name
                    const data={
                        name:req.body.name,
                         email:req.body.email,
                         
                         image:imgname,
                         newimg:newimgname,
                         
                    
                    };
                    let sql="INSERT INTO `img_upload` SET ?";
                    db.query(sql,data,(err,result)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                        else{
                              console.log("inserted");
                            //  res.send(result);
                            // // res.send()
                            res.json({submit:true,fliname:targetFile.name,name:data.name,email:data.email,newimg:newimgFile.name})
                
                        }
                    })

                }

            })





           
        }
            

      
    });
  
});


app.listen(PORT , ()=>{
    console.log("app running");
})