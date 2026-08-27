import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import authorizeUser from './lib/jwtMiddleware.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL).then(
    ()=>{
        console.log('connected to database');
    }
).catch(
    () => {
        console.log(' error connecting to database');
    }
)

let app = express();


app.use(cors());
app.use(express.json());

//authontication part
app.use(authorizeUser);

//endpoints
app.use('/users',userRouter);
app.use('/products',productRouter);


app.listen(3000, ()=>{console.log('server is running on port 3000')});