import mongoose  from "mongoose";

export const connectDB = async () =>{
    try {
        mongoose.connection.on('connected', ()=> console.log('Connection Successful'))
        await mongoose.connect(`${process.env.MONGODB_URI}/bloodDonApp`)
    } catch (error) {
        console.log('Error while conecting to mongodb', error.message)
    }
}