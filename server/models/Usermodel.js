import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
},
{
    timestamps: true
})

const User = mongoose.model('User', UserSchema)

export default User