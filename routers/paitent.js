var express = require("express");
const { Mongoose } = require("mongoose");
const paitent = require("../models/paitent");
const Protocol = require("../models/Protocol");

var router = express.Router();
Paitent = require("../models/paitent");



router.get("/:username", async(req, res) => {
    const paitent = await Paitent
        .findOne({ username: req.params.username }).populate({ path: "treatmentType", populate: { path: "protocol" } })

    res.json({
        username: paitent.username,
        password: paitent.password,
        name: paitent.name,
        treatmentType: paitent.treatmentType,
        accesses: paitent.accesses,
        protocol: paitent.treatmentType.protocol,
        reports: paitent.reports

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
        score: req.body.score,
        questions: req.body.questions,
        answers: req.body.answers,
        openAnswer: req.body.openAnswer,

    });

    paitent.save()

});

router.post("/:username/accesses", async(req, res) => {
    console.log("im here");
    const accessesIndex = req.body.stageLevel;
    const exerciseBoolIndex = req.body.exerciseLevel;
    const isStageFinish = req.body.isFinished;

    if (isStageFinish == true) {
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



        });
})




module.exports = router;