
var express=require("express");
var router=express.Router();
var passport=require("passport");
 User=require("../models/user");
 Doctor=require("../models/doctor");
 Therapist=require("../models/therapist");


 
//only for the doctor!//here we need to handle that the user name will by unique and also the password
 router.post("/register", async (req,res) =>{
      var username=req.body.username
      if(!checkValidUserName(username)){
        res.json("eror  new user")
        throw new Error('eror user name')
      }
     var password=req.body.password;
     const newUser=new User({username:username,password:password});
     const registerUser=await User.register(newUser,password);
     console.log(registerUser)
     res.json("register new user")
    })
     
//create new doctor 
 router.post("/register/doctor",async (req,res)=>{
      var doctorUsername=req.body.username;
      if(!checkValidUserName(doctorUsername)){
        res.json("eror  new user")
        throw new Error('eror user name')
      }
      var doctorPassword=req.body.password;
      const  newDoctor=new Doctor({username:doctorUsername,password:doctorPassword});
      const doctorRegister= await Doctor.register(newDoctor,doctorPassword);
      console.log(doctorRegister)
      res.json("register new doctor")
 })

//create new threapist
router.post("/register/therapist",async(req,res)=>{
    var therapistUsername=req.body.username;
    if(!checkValidUserName(therapistUsername)){
      res.json("eror  new user")
      throw new Error('eror user name')
    }
    var therapistPassword=req.body.password;
    const  newTherapist=new Therapist({username:therapistUsername,password:therapistPassword});
        const therapstRegister= await Therapist.register(newTherapist,therapistPassword);
        console.log(therapstRegister)
        res.json("register new doctor")
})


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



//Check validation of username 
function checkValidUserName(username){
  let isnum = /^\d+$/.test(username);
  if(!isnum || username.length!=9)
    return false;

   return true;
}