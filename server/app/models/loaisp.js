var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var LoaiSpSchema =new Schema({   
    
    tenloaisp:{type:String},
});


module.exports=mongoose.model('LoaiSp',LoaiSpSchema);