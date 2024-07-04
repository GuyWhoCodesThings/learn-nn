import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    args: {
        type: [String],
    },
    returns: {
        type: [String],
    },
    starterCode: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    hints: {
        type: [String],
        default: [],
    },
    constraints: {
        type: [String],
        default: [],
    },
    tests: {
        content: {
            type: String,
            required: true,
        },
        values: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
    },
});

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
