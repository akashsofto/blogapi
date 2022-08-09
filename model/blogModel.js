const mongoose=require('mongoose');

var blogSchema=new mongoose.Schema({
    user:{
        type:String
    },
    title:{
     type:String
    },
    message:{
        type:String
    },
})

module.exports=mongoose.model('blog',blogSchema);
