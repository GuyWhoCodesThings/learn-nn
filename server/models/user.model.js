import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    problems: {
        type: [
            {
                url: String,
                status: String, // "completed", "started"
                code: String,
                time: Number,
            }
        ],
        default: []
    },
}, {timestamps: true})

const User = mongoose.model("User", userSchema);
 
export default User;