const express = require("express");
const app = express();
const mongoose = require("mongoose");
passportPaitent = require("passport"),
    passportDoctor = require("passport"),
    passportTherapist = require("passport"),
    localStrategy = require("passport-local"),
    Paitent = require("./models/paitent"),
    Doctor = require("./models/doctor"),
    Therapist = require("./models/therapist")

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://nivniv1993:nivniv@homephiys.jtdlb.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri)


// Replace the following with your Atlas connection string                                                                                                                                        

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(() => {
    console.log("Connect to DB");
}).catch(err => {
    console.log("Eror", err.message);
});


//main().catch(console.error);
app.use(express.json());
var usersRoute = require("./routers/auth"),
    paitentRoute = require("./routers/paitent");
app.use("/user", usersRoute);
app.use("/paitent", paitentRoute);

module.exports.connectionDB = client

app.listen(5000, () => console.log("Example app listening on port 5000!"));