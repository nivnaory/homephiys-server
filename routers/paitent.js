var express=require("express");
const { Mongoose } = require("mongoose");
var router=express.Router();
Paitent=require("../models/paitent");


router.get("/homeexercise/:id",function(req,res){
    Paitent
    .findById(req.params.id).populate("treatmentType")
    .exec(function(err, paitent) {
        if (err) return handleError(err);
        if(!paitent){ 
        res.status(400).send();
        }
        console.log(paitent)
      });
});

module.exports = router;