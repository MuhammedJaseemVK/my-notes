import mongoose from 'mongoose';

const noteSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:5
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        default:'Personal',
    }
},{timestamps});

export default mongoose.model('note',noteSchema);