var express = require("express");
const { Mongoose } = require("mongoose");
const Protocol = require("../models/Protocol");

var router = express.Router();
Paitent = require("../models/paitent");



router.get("/:username", async(req, res) => {
    const paitent = await Paitent
        .findOne({ username: req.params.username }).populate("treatmentTypes").populate("protocol")
    res.json({
        username: paitent.username,
        password: paitent.password,
        name: paitent.name,
        treatmentType: paitent.treatmentTypes,
        protocol: paitent.protocol
            //reports:paitnetn.reports
    });
    //
    res.status(200)
});


router.post("/:username/report", async(req, res) => {
    //create new reportt

    const paitent = await Paitent.findOne({ username: req.params.username })
    paitent.reports.push({
        stageLevel: req.body.stageLevel,
        exerciseLevel: req.body.exerciseLevel,
        questions: req.body.questions,
        answers: req.body.answers,
        openAnswer: req.body.openAnswer,
        totelScore: req.body.totalScore
    });
    console.log("im here!");
    paitent.save()

});

router.put("/:username/highScore", function(req, res) {
    Paitent
        .findOne({ username: req.params.username }).populate("treatmentTypes")
        .exec(function(err, paitent) {
            if (err) return handleError(err);
            if (!paitent) {
                res.status(400).send();
            }
            console.log(paitent)
                //console.log(paitent.scoreList[0].highScore)
                /*need to update the scoreList in the current exercise 
       how to do it:
      find on the scoreList the exerciseId from the paitnet/treatmentType/staeg/exercise/exerciseId

     */
        });
})




module.exports = router;