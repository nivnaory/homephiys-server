var express = require("express");
const { Mongoose } = require("mongoose");

var router = express.Router();
var passportTherapist = require("passport");


Patient = require("../models/patient");
Doctor = require("../models/doctor");
Therapist = require("../models/therapist");
TreatmentType = require("../models/treatmentType")


router.post("/register/patient/", async(req, res) => {

    const newPatient = new Patient(req.body);

    if (!checkValidUserName(req.body.username)) {
        res.json("error  new user")
        throw new Error('error user name')
    }

    // get treatment type as array
    //need to handle this  the foundation of the treatment type. 
    mongoose.connection.db.collection("TreatmentType", function(err, collection) {
        collection.findOne({ treatmentId: 1 }, function(err, treatmentType) {
            newPatient.treatmentType = treatmentType._id;
            initateAccessArray(newPatient, treatmentType.stageList);

        });

    });


    const patientRegister = await Patient.register(newPatient, req.body.password)
    res.json("register new user")

});


router.post("/register/therapist", async(req, res) => {
    if (!checkValidUserName(req.body.username)) {
        res.json("eror  new user")
        throw new Error('eror user name')
    }
    const newTherapist = new Therapist(req.body);
    const therapist = await Therapist.register(newTherapist, req.body.password);

    res.json("register new therapist")
})


router.post('/login/patient', async function(req, res) {
    Patient.findOne({ username: req.body.username, password: req.body.password })
        .exec(function(err, patient) {
            console.log(patient);
            if (err) return handleError(err);
            if (!patient) {

                res.status(400).send();
            }
            //send the id to the flutter 
            res.status(200).send()

        });
});


//here we get the doctor from the login screed and check if exsist in the database
router.post("/login/therapist", (req, res) => {
    Therapist
        .findOne({ username: req.body.username, password: req.body.password })
        .exec(function(err, therapist) {

            if (err) return handleError(err);
            if (!therapist) {

                res.status(400).send();
            }
            //send the id to the flutter 
            res.status(200).send()

        });
});

/*
//Delete User from doctor  only doctor can delete one of the user 
router.delete("/paitent/:id", async(req, res) => {
    Paitent.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.json("Paitent not found ")
        }
        res.json("Paitnet deletd")
    })
});
*/
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