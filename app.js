const express = require("express");
const app = express();
const mongoose = require("mongoose");
passport=require("passport"),
localStrategy=require("passport-local"),
User=require("./models/user")
// Replace the following with your Atlas connection string                                                                                                                                        

const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        

mongoose.set('useNewUrlParser', true);




app.use(passport.initialize());
app.use(passport.session());
passport.use( new  localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect("mongodb+srv://nivniv1993:nivniv@homephiys.jtdlb.mongodb.net/test?retryWrites=true&w=majority",{
 useNewUrlParser:true,
 useCreateIndex:true,
 }).then(()=>{
  console.log("Connect to DB");
 }).catch(err =>{
  console.log("Eror",err.message);
 }); 
//const client = new MongoClient(url); 
 // The database to use
 
 //const dbName = "test";
 //const col = db.collection("people")
 //async function run() {      
   // await client.connect();
     //       console.log("Connected correctly to server");   
              //const db = client.db(dbName);
   // } 

 

//run().catch(console.dir);
app.use(express.json())
const userRoute=require("./routers/auth");
app.use("/user",userRoute)




/*
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

        

         // Construct a document      
                                                                                                                                                               
         let personDocument = {
             "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);

run().catch(console.dir);
*/

app.listen(5005, () => console.log("Example app listening on port 5005!"));
