const {Schema,model} =require("mongoose");

const ProductSchema=Schema({
    name:{
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    status:{
        type:Boolean,
        default:true,
        required:true
    },
    price:{
        type:Number,
        default:0,
    },
    category:{
        type:Schema.Types.ObjectId,
        ref: "Category",
        required:true
    },
    description:{
        type:String
    },
    available:{
        type:Boolean,
        default:true
    },
    created_by:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    img:{
        type:String
    }
});

ProductSchema.methods.toJSON= function(){
    const {__v,status,...product}=this.toObject();
    return product;
}


module.exports= model("Product",ProductSchema);