const express=require('express');
const mongoose=require('mongoose');
const path = require("path")
const app=express();
const Db=require('./model/db');
const Blog=require('./model/blogModel');
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.post('/blog',(req,res)=>{
    var blog=new Blog({
    user:req.body.user,
    title:req.body.title,
    message:req.body.message
    })
    console.log(blog);

    blog.save().then(
        (blog) => {
          
          
          res.status(201).json({
            message: 'Thing inserted successfully!'
          });
        }
      ).catch(
          
        (error) => {
          
          console.log(error);
          res.status(400).json({

            error: error
          });
        }
      );
    
    
})

app.get('/getblog',(req,res)=>{
    Blog.find().then(
        (data) => {
          
          
          res.status(201).json(data);
        }
      ).catch(
          
        (error) => {
          
          console.log(error);
          res.status(400).json({

            error: error
          });
        }
      );
    
})

app.get("/home", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "index.html"))
})
app.get("/script", (req, res)=>{
    res.sendFile(path.join(__dirname, "public", "main.js"))
})



app.get("/getblog/:id",(req,res)=>{
    Blog.findById(req.params.id).then(
        (data) => {
          
          
          res.status(201).json(data);
        }
      ).catch(
          
        (error) => {
          
          console.log(error);
          res.status(400).json({

            error: error
          });
        }
      );
    

})

app.put("/editblog/:id",(req,res)=>{
    
    

        const blog = new Blog({
            _id:req.params.id,
          user: req.body.user,
          title: req.body.title,
          message: req.body.message
        });
        console.log(blog);
        Blog.updateOne({_id: req.params.id}, blog).then(
          () => {
            
            
            res.status(201).json({
              message: 'Thing updated successfully!'
            });
          }
        ).catch(
            
          (error) => {
            
            console.log(error);
            res.status(400).json({

              error: error
            });
          }
        );
      });
   

app.delete("/delete/:id",(req,res)=>{
    Blog.findByIdAndRemove(req.params.id).then(
        () => {
          
          
          res.status(201).json({
            message: 'Thing deleted successfully!'
          });
        }
      ).catch(
          
        (err) => {
          
          console.log(err);
          res.status(400).json({

            error: err
          });
        }
      );
})

app.listen((3000),()=>{
    console.log("app is listening at 3000");
})





