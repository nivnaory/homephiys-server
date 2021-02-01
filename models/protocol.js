mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");


var ProtocolSchema=new mongoose.Schema({
    subProtocols:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubProtocol'
      }],
    });
    module.exports=mongoose.model("Score",ProtocolSchema);

    var SubProtocol=new mongoose.Schema({
        name:String,
        descriptions: [{
            type: String
        }]
      });