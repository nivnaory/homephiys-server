
mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose")
var passportLocalMongoose=require("passport-local-mongoose");
const UsersSchema = new mongoose.Schema({
    paitents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'paitent' }],
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'doctor' }],
    therapist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'therapist' }]
  });
UsersSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("Users",UsersSchema);