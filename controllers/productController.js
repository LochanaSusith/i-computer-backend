
import {isAdmin} from './userController.js';
import Product from '../models/product.js';


export async function createProduct(req,res){

    if(!isAdmin(req)){
        res.status(401).json({message: 'unauthorized access'})
        return;
    }

    //creating product
    try{
        //check have a product with same name
        const existingProduct = await Product.findOne({ 
            productId: req.body.productId 
        });

        if(existingProduct){
            res.status(400).json({
                message: 'product with same productId already exists'
            })
            return;
        }

        const data = {};
        data.productId = req.body.productId;

        if(req.body.name == null){
            res.status(400).json({
                message: 'product name is required'
            })
            return;
        }
        data.name = req.body.name;
        data.description = req.body.description || "";
        data.alNames = req.body.alNames || [];
        if(req.body.price == null){
            res.status(400).json({
                message: 'product price is required'
            })
            return;
        }
        data.price = req.body.price;
        data.labelPrice = req.body.labelPrice || req.body.price;
        data.category = req.body.category || "other";
        data.images = req.body.images || [];
        data.isVisible = req.body.isVisible;
        data.brand = req.body.brand || "generic";
        data.model = req.body.model || "standard";

        const newProduct = new Product(data);
        await newProduct.save().then(
            ()=>{
                res.status(200).json({
                    message: 'product created successfully',
                    product: newProduct
                })
            }
        );

    }catch(err){
        res.status(500).json({
            message: 'internal server error',
            error: err.message
        })
    }
}

export async function getProducts(req,res){

    try{

        if(isAdmin(req)){
            const products = await Product.find();

            res.status(200).json({
                message: 'products fetched successfully',
                products: products
            })
        }else{
            const products = await Product.find({isVisible: true});

            res.status(200).json({
                message: 'products fetched successfully',
                products: products
            })
        }

    }catch(err){
        res.status(500).json({
            message: 'error fetching products',
            error: err.message
        })
    }
}

export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(401).json({message: 'unauthorized access'})
        return;
    }

    try{
        const productId = req.params.productId;
        await Product.deleteOne({productId: productId});
        res.status(200).json({message: 'product deleted successfully'})
        
    }catch(err){
        res.status(500).json({
            message: 'error deleting product',
            error: err.message
        })
    }
}

export async function updateProduct(req,res){

    if(!isAdmin(req)){
        res.status(401).json({message: 'unauthorized access'})
        return;
    }

    
    try{
        
        const productId = req.params.productId;


        const data = {};

        if(req.body.name == null){
            res.status(400).json({
                message: 'product name is required'
            })
            return;
        }
        data.name = req.body.name;
        data.description = req.body.description || "";
        data.alNames = req.body.alNames || [];
        if(req.body.price == null){
            res.status(400).json({
                message: 'product price is required'
            })
            return;
        }
        data.price = req.body.price;
        data.labelPrice = req.body.labelPrice || req.body.price;
        data.category = req.body.category || "other";
        data.images = req.body.images || [];
        data.isVisible = req.body.isVisible;
        data.brand = req.body.brand || "generic";
        data.model = req.body.model || "standard";

        await Product.updateOne({productId: productId},data);
        res.status(200).json({message: 'product updated successfully'});

    }catch(err){
        res.status(500).json({
            message: 'internal server error',
            error: err.message
        })
    }
}

export async function getProductById(req,res){


    try{

        const productId = req.params.productId;
        const product = await Product.findOne({productId: productId});

        if(product == null){
            res.status(404).json({message: 'product not found'});
            return;
        }
        
        if(!product.isVisible){

            if(!isAdmin(req)){
                res.status(401).json({message: 'unauthorized access'})
                return;
            }
        }
        res.status(200).json({
            message: 'product fetched successfully',
            product: product
        })   

    }catch(err){
        res.status(500).json({
            message: 'can\'t retrieve product',
            error: err.message
        })
    }
}