
var express=require("express");
var router=express.Router();
var passport=require("passport");
 User=require("../models/user");
 Doctor=require("../models/doctor");
 Therapist=require("../models/therapist");


 
//only for the doctor!//here we need to handle that the user name will by uniequ and also the password
 router.post("/register",function(req,res){
     var username=req.body.username;
     var password=req.body.password;
     var newUser={username:username,password:password};
     User.create(newUser,function(err,newUser){
      if (err){
          console.log(err);
      }else{
      console.log("cerate new user "); 
      res.json("register new user")
      }
        });
     });  

//create new doctor 
 router.post("/register/doctor",function(req,res){
      var doctorUserName=req.body.username;
      var doctorPassword=req.body.password;
      var newDoctor={username:doctorUserName,password:doctorPassword};
      Doctor.create(newDoctor,function(err,newDocto){
       if (err){
           console.log(err);
       }else{
       res.json("register new doctor ")
       }
         });
      });  


//create new threapist
router.post("/register/therapist",function(req,res){
    var therapistUserName=req.body.username;
    var therapistPassword=req.body.password;
    var newTherapist={username:therapistUserName,password:therapistPassword};
        Therapist.create(newTherapist,function(err,newTherapis){
         if (err){
             console.log(err);
         }else{
         console.log("cerate new therapist "); 
         res.json("register new therapist")
         }
           });
        });  
      




//here we get the user from the login screed and check if exsist in the database
router.get("/login/user",async (req,res)=>{
console.log("im here!")
await User.findOne({username:'erez'},function(req,res){
  if(err){
    console.log("not found")
    res.json("User not found")
   }
   res.json("User Found")
    });
 });


//here we get the doctor from the login screed and check if exsist in the database
router.get("/login/docotr",async (req,res)=>{
  
  await User.findOne({username:'erez'},function(req,res){
    if(err){
      console.log("not found")
      res.json("User not found")
     }
     res.json("User Found")
      });
   });

//here we get the therapist from the login screed and check if exsist in the database   
router.get("/login/therapist",async (req,res)=>{
    await User.findOne({username:'erez'},function(req,res){
      if(err){
       console.log("not found")
       res.json("User not found")
       }
       res.json("User Found")
        });
     });
     module.exports = router;
