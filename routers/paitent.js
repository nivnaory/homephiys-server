var express=require("express");
const { Mongoose } = require("mongoose");
var router=express.Router();
Paitent=require("../models/paitent");

router.get("/:username",function(req,res){
    Paitent
    .findOne({username:req.params.username}).populate("treatmentTypes")
    .exec(function(err, paitent) {
        if (err) return handleError(err);
        if(!paitent){ 
        res.status(400).send();
        }
         res.json({ username:paitent.username,password:paitent.password,name:paitent.name,
          treatmentType:paitent.treatmentTypes});
        res.status(200)
      });
});
module.exports = router;


router.put("/:username/highScore",function(req,res){
  Paitent
  .findOne({username:req.params.username}).populate("treatmentTypes")
  .exec(function(err, paitent) {
    if (err) return handleError(err);
        if(!paitent){ 
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

