
var express=require("express");
var router=express.Router();
var passportPaitent=require("passport");
var passportDoctor=require("passport");
var passportTherapist=require("passport");
//const paitent = require("../models/paitent");
 Users = require("../models/users");
 Paitent=require("../models/paitent");
 Doctor=require("../models/doctor");
 Therapist=require("../models/therapist");
 
 
// Create new Patient only for the doctor!//here we need to handle that the user name will by unique and also the password
 router.post("/register", async (req,res) =>{
      
      var username=req.body.username
      if(!checkValidUserName(username)){
        res.json("eror  new user")
        throw new Error('eror user name')
      }
     var password=req.body.password;
     const newPaitent=new Paitent({username:username,password:password});
     const registerPaitent=await Paitent.register(newPaitent,password);
     res.json("register new user")
    })
     
//Create new doctor 
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

//Create new threapist
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
        res.json("register new therapist")
})






router.post('/login', function(req, res, next) {
  passportPaitent.authenticate('local', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) 
      { return res.status(401).send({ success : false, message : 'authentication failed' })};
      console.log("im here!!")
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.send({ success : true, message : 'authentication succeeded' });
      });      
    
    })(req, res, next);;
  });


router.post("/login/doctor",function(req,res,next){
  passportDoctor.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) 
    { return res.status(401).send({ success : false, message : 'authentication failed' })};

    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ success : true, message : 'authentication succeeded' });
    });      
  
  })(req, res, next);;
 });

//here we get the doctor from the login screed and check if exsist in the database
router.post("/login/therapist",(req,res,next)=>{
  passportTherapist.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) 
    { return res.status(401).send({ success : false, message : 'authentication failed' })};
    console.log("im here!!")
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ success : true, message : 'authentication succeeded' });
    });      
  
  })(req, res, next);;
 });


     module.exports = router;

//Check validation of username 
function checkValidUserName(username){
  let isnum = /^\d+$/.test(username);
  if(!isnum || username.length!=9)
    return false;

   return true;
}


/*
app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
*/