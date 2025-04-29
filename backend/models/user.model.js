import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'email is required field'],
        unique: [true, 'email must be unique'],
        index: true
    },

    password: {
        type: String,
        required: [true, "password is required field"],
    },

    name: {
        type: String,
        required: [true, "name is a required field"],
    },

    country: {
        type: String,
        required: [true, 'country field is required'],
        enum: ['IN', 'US', 'UK']
    },

    refreshToken: {
        type: String,
        default: "",
    }

}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

export default mongoose.model("user", userSchema);