var express = require("express");
const { Mongoose } = require("mongoose");
var router = express.Router();
Therapist = require("../models/therapist");




router.get("/:username", async(req, res) => {

    const therapist = await Therapist
        .findOne({ username: req.params.username });
    if (therapist) {
        res.json(therapist);
    } else {
        res.send(404);
    }

});


router.put("/:username", async(req, res) => {

    const therapist = await Therapist
        .updateOne({ username: req.params.username }, {
            password: req.body.password
        });


});

module.exports = router;