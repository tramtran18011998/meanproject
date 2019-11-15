var mongoose =require('mongoose');
var Schema =mongoose.Schema;
var bcrypt =require('bcrypt-nodejs');
var AccountSchema =new Schema({   
    
    tendn: {type:String, required:true, index:{unique:true}},
    matkhau:{type:String,required:true,select:false},
    quyenhan:{type:String},
});

AccountSchema.pre('save',function(next){
    var account=this;
    if(!account.isModified('matkhau')) return next();
    bcrypt.hash(account.matkhau,null,null,function(err,hash){
        if(err) return next(err);
        account.matkhau=hash;
        next();
    });
});
AccountSchema.methods.comparePassword=function(matkhau){
    var account =this;
    return bcrypt.compareSync(matkhau, account.matkhau);
   
}
module.exports=mongoose.model('Account',AccountSchema);