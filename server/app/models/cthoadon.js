var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var CTHoadonSchema =new Schema({   
    
    mahd:{type:String},
    masp:{type:String},
    soluong:{type:Number},
    gia:{type:Number},
    thanhtien:{type:Number},

});


module.exports=mongoose.model('CTHoadon',CTHoadonSchema);