mongoose=require("mongoose");



    var SubProtocolSchema=new mongoose.Schema({
        name:String,
        level:Number,
        descriptions: [{
            type: String
        }]
        
      });

      var ProtocolSchema=new mongoose.Schema({
        name:String,
        subProtocols:[SubProtocolSchema],
        },
      {collection : 'Protocols'});
  
      module.exports=mongoose.model("Protocol",ProtocolSchema);