mongoose = require("mongoose");
const { Collection } = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//define User Entity
//need to decide if there is username
var DoctorSchema = new mongoose.Schema({
        username: String,
        password: String,
        name: String,
        patients: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        }]
    },
    //collection:'Doctors'
    //need to add more attr here!\
    { collection: 'Doctors' });

DoctorSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Doctor", DoctorSchema);