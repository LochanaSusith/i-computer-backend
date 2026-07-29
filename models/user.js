import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    isBlocked: {
        type: String,
        default: false,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
        required: true
    },
    image: {
        type: String,
        default: null,
        required: false
    }
})

const User = mongoose.model('User', userSchema);
export default User;
