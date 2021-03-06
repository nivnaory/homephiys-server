var express = require("express");
const { Mongoose } = require("mongoose");
var router = express.Router();
Therapist = require("../models/therapist");
Patient = require("../models/patient");




router.get("/:username", async(req, res) => {
    const therapist = await Therapist
        .findOne({ username: req.params.username });
    if (therapist) {
        res.json(therapist);
    } else {
        res.sendStatus(404);
    }

});


router.get("/:username/allPatient", async(req, res) => {
    const allPatient = await Patient
        .find({}).populate({ path: "treatmentType", populate: { path: "protocol" } })

    if (allPatient) {
        res.json(allPatient);
    } else {
        res.sendStatus(400);
    }

});

router.put("/:username/password", async(req, res) => {
    const therapist = await Therapist
        .updateOne({ username: req.params.username }, {
            password: req.body.password
        });
    if (therapist) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;