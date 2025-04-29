import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        default: "Untitled",
    },

    description: {
        type: String,
        default: '',
    },

    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: [true, "project id is required field"]
    },

    status: {
        type: String,
        enum: ['In Progress', 'Completed'],
        default: 'In Progress'
    },

    dateOfCompletion: {
        type: Date,
    }
}, {timestamps: true});

taskSchema.pre('save', function (next) {
    if (this.isModified('status') && this.status === 'Completed') {
        this.dateOfCompletion = new Date();
    }
    next();
});

export default mongoose.model("task", taskSchema);