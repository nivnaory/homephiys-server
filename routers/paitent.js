var express = require("express");
const { Mongoose } = require("mongoose");
const paitent = require("../models/paitent");
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
        protocol: paitent.protocol,
        access: paitent.accesses
            //reports:paitnetn.reports
    });
    //
    res.status(200)
});


router.post("/:username/report", async(req, res) => {
    //create new report
    const paitent = await Paitent.findOne({ username: req.params.username })
    paitent.reports.push({
        stageLevel: req.body.stageLevel,
        exerciseLevel: req.body.exerciseLevel,
        questions: req.body.questions,
        answers: req.body.answers,
        openAnswer: req.body.openAnswer,
        totelScore: req.body.totalScore
    });

    paitent.save()

});

router.post("/:username/access", async(req, res) => {
    console.log("im here Niv the dick");


    const accessesIndex = req.body.stageLevel;
    const exerciseBoolIndex = req.body.exerciseLevel;
    const isStageFinish = req.body.isFinished;
    console.log(isStageFinish)

    if (isStageFinish == true) {
        console.log("i'm here in isStageFinish")
        const update = {
            $set: {
                [`accesses.${accessesIndex}.stageBool`]: true

            }
        };
        await Paitent.updateOne({ username: req.params.username }, update);
    }


    const update = {
        $set: {
            [`accesses.${accessesIndex}.exerciseBool.${exerciseBoolIndex}`]: true
        }
    };
    await Paitent.updateOne({ username: req.params.username }, update);

    console.log("i'm here Final")



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



        });
})




module.exports = router;