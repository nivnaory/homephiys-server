const express = require("express");
const app = express();
const mongoose = require("mongoose");
passportPaitent=require("passport"),
passportDoctor=require("passport"),
passportTherapist=require("passport"),
localStrategy=require("passport-local"),
Paitent=require("./models/paitent"),
Doctor=require("./models/doctor"),
Therapist=require("./models/therapist")
//Users=require("./models/users")

// Replace the following with your Atlas connection string                                                                                                                                        

const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology',true);



//only for the paitnet 
app.use(passportPaitent.initialize());
app.use(passportPaitent.session());
passportPaitent.use( new  localStrategy(Paitent.authenticate()));
passportPaitent.serializeUser(Paitent.serializeUser());
passportPaitent.deserializeUser(Paitent.deserializeUser());


//initiate passport only for the doctor
app.use(passportDoctor.initialize());
app.use(passportDoctor.session());
passportDoctor.use( new  localStrategy(Doctor.authenticate()));
passportDoctor.serializeUser(Doctor.serializeUser());
passportDoctor.deserializeUser(Doctor.deserializeUser());


//initiate passport only for the therapis 
app.use(passportTherapist.initialize());
app.use(passportTherapist.session());
passportTherapist.use( new  localStrategy(Therapist.authenticate()));
passportTherapist.serializeUser(Therapist.serializeUser());
passportTherapist.deserializeUser(Therapist.deserializeUser());



mongoose.connect("mongodb+srv://nivniv1993:nivniv@homephiys.jtdlb.mongodb.net/test?retryWrites=true&w=majority",{
 useNewUrlParser:true,
 useCreateIndex:true,
 }).then(()=>{
  console.log("Connect to DB");
 }).catch(err =>{
  console.log("Eror",err.message);
 }); 
app.use(express.json())
const userRoute=require("./routers/auth");
const paitent = require("./models/paitent");
const passport = require("passport");
app.use("/user",userRoute)


app.listen(5000, () => console.log("Example app listening on port 5000!"));
