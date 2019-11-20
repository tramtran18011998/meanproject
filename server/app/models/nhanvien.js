var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var NhanVienSchema =new Schema({      
    tendn:{type:String},
    hoten:{type:String},
    gioitinh:{type:String},
    diachi:{type:String},
    email:{type:String},
    sdt:{type:String},
});


module.exports=mongoose.model('NhanVien',NhanVienSchema);