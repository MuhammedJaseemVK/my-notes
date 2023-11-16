import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        default: 'Personal',
    }
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);