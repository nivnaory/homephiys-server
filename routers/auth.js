var express = require("express");
const { Mongoose } = require("mongoose");

var router = express.Router();
var passportTherapist = require("passport");
//const paitent = require("../models/paitent");

Paitent = require("../models/paitent");
Doctor = require("../models/doctor");
Therapist = require("../models/therapist");
TreatmentType = require("../models/treatmentType")


router.post("/register/paitent/", async(req, res) => {
    console.log("niv the dick")
    const newPaitent = new Paitent(req.body);
    newPaitent
    if (!checkValidUserName(req.body.username)) {
        res.json("error  new user")
        throw new Error('error user name')
    }

    // get treatment type as array
    //need to handle this  the foundation of the treatment type. 
    mongoose.connection.db.collection("TreatmentType", function(err, collection) {
        collection.findOne({ treatmentId: 1 }, function(err, treatmentType) {
            newPaitent.treatmentType = treatmentType._id;
            initateAccessArray(newPaitent, treatmentType.stageList);

        });

    });


    const paitentRegister = await Paitent.register(newPaitent, req.body.password)
    res.json("register new user")

});

//Create new doctor 
router.post("/register/doctor", async(req, res) => {
    if (!checkValidUserName(req.body.username)) {
        res.json("eror  new user")
        throw new Error('eror user name')
    }
    const newDoctor = new Doctor(req.body)
    const doctorRegister = Doctor.register(newDoctor, req.body.password)
    res.json("register new doctor")
})

//Create new threapist
router.post("/register/therapist", async(req, res) => {
    if (!checkValidUserName(req.body.username)) {
        res.json("eror  new user")
        throw new Error('eror user name')
    }
    const newTherapist = new Therapist(req.body);
    const therapstRegister = await Therapist.register(newTherapist, req.body.password);

    res.json("register new therapist")
})



router.post('/login/paitent', async function(req, res, next) {
    Paitent
        .findOne({ username: req.body.username, password: req.body.password })
        .exec(function(err, paitent) {

            if (err) return handleError(err);
            if (!paitent) {

                res.status(400).send();
            }
            //send the id to the flutter 
            res.status(200).send()

        });
});

//here we go to database and check if the doctor  exsist on the database 
router.post("/login/doctor", function(req, res, next) {
    Doctor
        .findOne({ username: req.body.username }).exec(function(err, doctor) {
            if (err) return handleError(err);
            if (!doctor) {
                res.json("docotor not found!");
            }
            res.json("doctor found succesfully!")
        });
});
//here we get the doctor from the login screed and check if exsist in the database
router.post("/login/therapist", (req, res, next) => {
    passportTherapist.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).send({ success: false, message: 'authentication failed' }) };

        req.login(user, loginErr => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.send({ success: true, message: 'authentication succeeded' });
        });

    })(req, res, next);;
});


//Delete User from doctor  only doctor can delete one of the user 
router.delete("/paitent/:id", async(req, res) => {
    Paitent.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.json("Paitent not found ")
        }
        res.json("Paitnet deletd")
    })
});
module.exports = router;


//Check validation of username 
function checkValidUserName(username) {
    let isnum = /^\d+$/.test(username);
    if (!isnum || username.length != 9)
        return false;

    return true;
}

function initateAccessArray(paitent, paitentStageList) {
    for (i = 0; i < paitentStageList.length; i++) {
        if (i == 0)
            paitent.accesses.push({
                stageBool: true,
                exerciseBool: [true, false, false]
            });
        else
            paitent.accesses.push({
                stageBool: false,
                exerciseBool: [false, false, false]
            });
    }
}