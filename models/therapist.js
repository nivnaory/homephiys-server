mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//define User Entity
//need to decide if there is username
var TherapistSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    /*
    patients:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Paitent']}
      */
}, { collection: 'Therapists' });


TherapistSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Therapist", TherapistSchema);