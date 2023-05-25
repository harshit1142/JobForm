const express=require("express");
const ejs=require("ejs");
const bodyParser = require("body-parser");
const { log } = require("console");
const  mongoose  = require("mongoose");

const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.listen(9000,function(err)
{
    console.log("Server Started");
});

mongoose.connect('mongodb://127.0.0.1:27017/Formdb');
const formSchema=new mongoose.Schema({
   fname:String,
   lname:String,
   email:String,
   dob:String,
   year:String,
   url:String,
})
const Form=mongoose.model("Form",formSchema);

app.get("/",function(req,res){
   res.render("main");
});
app.get("/form",function(req,res){
   res.render("form");
});
app.post("/form",function(req,res){
  var fname=(req.body.fname);
  var lname=(req.body.lname);
  var email=(req.body.email);

   const form=new Form({
      fname:(req.body.fname),
    lname:(req.body.lname),
    email:(req.body.email),
      dob:(req.body.dob),
    year:(req.body.year),
          url:(req.body.url)   
   })
   
   form.save();
  console.log("ADDED");
  res.render("thanks",{fname:fname,lname:lname});
});
app.get("/soon",function(req,res){
   res.render("updated");
});
