const mongoose=require('mongoose');
const Blog=require('./blogModel')
mongoose.connect('mongodb://localhost:27017/blogDB',{useNewUrlParser:true},
(err)=>{
    if(!err){
        console.log("mongodb connection successful");
    }else{
        console.log("error in connection"+err)
    }
});
