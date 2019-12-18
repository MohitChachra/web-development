const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');
const mongoose = require('mongoose');
const port = 3000;
const publicDirPath = path.join(__dirname,'./public');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(publicDirPath));

mongoose.connect('mongodb://localhost:27017/multer-test',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
},()=>{
    console.log("db connected")
})

var userSchema = new mongoose.Schema({
    username:{
        type:String
    },
    url:{
        type:String
    }
})

var userModel = new mongoose.model('userModel',userSchema);

//configruing storage
const storage = multer.diskStorage({
    destination:'./public/uploads',
    filename:function(req,file,cb){
        console.log(file)
        cb(null,req.body.username+Date.now()+path.extname(file.originalname));
    }
})


//if you want to obtain the buffer the dont give storage just simplly use filter
const upload = multer({
    // storage:storage,
    // fileFilter:function(req,file,cb){
    //     var ext = path.extname(file.originalname);
    //     if(ext != '.pdf')
    //     {
    //         return cb(new Error('not allowed file type'));
    //     }
    //     cb(null,true)
    // },
    // limits:{
    //     fileSize:1000000
    // }
}).any('file');

app.post('/upload',upload,async (req,res)=>{
    try{
        console.log(req.files);
        // await new userModel({
        //     username:req.body.name,
        //     url:'/uploads/'+req.file.filename
        // }).save()
    }catch(e)
    {
        console.log(e);
    }
})

app.listen(port,()=>{
    console.log('app is runnig at ' + port);
})