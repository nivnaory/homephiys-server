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
                                                                                                                                        
const { MongoClient } = require("mongodb");
const uri="mongodb+srv://nivniv1993:nivniv@homephiys.jtdlb.mongodb.net/test?retryWrites=true&w=majority"
const client=new MongoClient(uri)


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



/*
async function main()
{
try {
    // Connect to the MongoDB cluster
     await client.connect();
    // Make the appropriate DB calls
    const db = client.db('test');
    const collection = db.collection('TreatmentType');
    app.locals.collection = collection;
    
    console.log("connect DB");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

    
}
*/
mongoose.connect(uri,{
 useNewUrlParser:true,
 useCreateIndex:true,
 }).then(()=>{
  console.log("Connect to DB");
 }).catch(err =>{
  console.log("Eror",err.message);
 }); 


//main().catch(console.error);
app.use(express.json())
const userRoute=require("./routers/auth");
//const paitent = require("./models/paitent");
//const passport = require("passport");
app.use("/user",userRoute)
module.exports.connectionDB = client

app.listen(5000, () => console.log("Example app listening on port 5000!"));
