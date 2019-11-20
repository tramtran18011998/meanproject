var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var KhachHangSchema =new Schema({   
    
    tendn:{type:String},
    hoten:{type:String},
    diachi:{type:String},
    email:{type:String},
    sdt:{type:String},
    tichluy:{type:Number},
    
});


module.exports=mongoose.model('KhachHang',KhachHangSchema);