var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var TinKMSchema =new Schema({   
    
    tieude:{type:String},
    noidung:{type:String},
    hinhanh:{type:String},   
});


module.exports=mongoose.model('TinKM',TinKMSchema);