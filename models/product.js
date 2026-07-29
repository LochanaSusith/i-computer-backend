import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    productId :{
        type : String,
        required : true,
        unique : true,
    },
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    alNames : {
        type : [String],
        default : []
    },
    price :{
        type : Number,
        required : true,
    },
    labelPrice : {
        type : Number,
        
    },
    category : {
        type : String,
        default : "other"
    },
    images : {
        type : [String],
        default : []
    },
    isVisible : {
        type : Boolean,
        default : true,
        required : true,
    },
    brand : {
        type : String,
        default : "generic"
    },
    model : {
        type : String,
        default : "standard"
    }
   
});
const Product = mongoose.model('Product',productSchema);

export default Product;