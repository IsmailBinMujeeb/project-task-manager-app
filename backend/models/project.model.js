import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({

    title: {
        type: String,
        default: 'Untitled',
    },

    description: {
        type: String,
        default: '',
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'owner field is required'],
        index: true
    },

    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        default: []
    }],
}, { timestamps: true });

export default mongoose.model("project", projectSchema);