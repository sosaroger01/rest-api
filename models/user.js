const {Schema,model} =require("mongoose");

const UserSchema=Schema({
    name:{
        type:String,
        required: [true,"El nombre es obligatorio"]
    },
    email:{
        type:String,
        required: [true,"El correo es obligatorio"],
        unique: true
    },
    password:{
        type:String,
        required: [true,"La contraseña es obligatoria"],
    },
    img:{
        type:String,
    },
    role:{
        type:String,
        required: [true,"El rol es obligatorio"],
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    status:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
});

UserSchema.methods.toJSON= function(){
    const {__v,password,...users}=this.toObject();
    return users;
}

module.exports= model("User",UserSchema);