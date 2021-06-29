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
    let extName = path.extname(targetFile.name);

    // let baseName = path.basename(targetFile.name, extName);
    const num= random.int(10000,999999);
    // let uploadDir = path.join(__dirname, '../client','public','upload');
     let uploadDir = path.join(__dirname, '../client','public','upload', num+targetFile.name);

    let imgList = ['.png','.jpg','.jpeg','.gif'];
    // Checking the file type
    if(!imgList.includes(extName)){
        //  fs.unlinkSync(targetFile.tempFilePath);
        // return res.status(422).send("Invalid Image");
        return res.json({submit:false,msg:"not an image"})
    }

    if(targetFile.size > 1000000){
        //  fs.unlinkSync(targetFile.tempFilePath);
        // return res.status(413).send("File is too Large (max 4mb)");
       return res.json({submit:false,msg:"File is too Large (max 4mb)"})
    }

    

    targetFile.mv(uploadDir, (err) => {
        if (err)
        {
            return res.status(500).send(err);
        }
        else{
            const data={
                name:req.body.name,
                 email:req.body.email,
                 
                 image:targetFile.name,
                 
            
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
                    res.json({submit:true,fliname:targetFile.name,name:data.name,email:data.email})
        
                }
            })
        }
            

      
    });
  
});


app.listen(PORT , ()=>{
    console.log("app running");
})