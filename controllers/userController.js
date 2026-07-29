import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function createUser(req,res){

    const hashedPassword = bcrypt.hashSync(req.body.password,10);

    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword
    })
    user.save().then(
        ()=>{
            res.json({message: 'user created successfully'})
        }
    ).catch(
        (err)=>{
            res.json({
                message: 'error creating user',
                error: err.message
            })
        }
    )
}

export function loginUser(req,res){

    User.findOne({
        email: req.body.email
    }).then(
        (user)=>{
            if(user == null){
                res.json({message: 'user not found'})
            }else{
                const isPasswordValid = bcrypt.compareSync(req.body.password,user.password);

                if(isPasswordValid){
                    const token = jwt.sign({
                        email:user.email,
                        fristName:user.firstName,
                        lastName:user.lastName,
                        role:user.role,
                        image:user.image,
                        isEmailVerified:user.isEmailVerified
                    },"i-computer-54!") 

                    res.json({message: 'login successful',
                        token: token
                    });
                }else{
                    res.json({message: 'invalid password'});
                }
            }
        }
    ).catch(
        ()=>{
            res.status(500).json({message: 'internal server error'})
        }
        
    )
}

export function isAdmin(req){
    if(req.user == null){
        return false;
    }
    if(req.user.role == "admin"){
        return true;
    }else{
        return false;
    }
}