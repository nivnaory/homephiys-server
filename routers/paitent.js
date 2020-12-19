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
        //console.log(paitent.treatmentTypes[0].type)
        /*
        res.json({ username:paitent.username,password:paitent.password,name:paitent.name,
          treatmentType_type:paitent.treatmentTypes[0].type, 
          treatmentType_type_treatmentId:paitent.treatmentTypes[0].Id,
          StageList:paitent.treatmentTypes[0].stageList});
          */
         res.json({ username:paitent.username,password:paitent.password,name:paitent.name,
          treatmentType:paitent.treatmentTypes});
        res.status(200)
      });
});


module.exports = router;