import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ResultIndivid = new Schema({
    _id: {
        type: Object
    },
    competition: {
        type: String
    },
    athlete: {
        type: String
    },
    res1: {
        type: String
    },
    res2: {
        type: String
    },
    res3: {
        type: String
    },
    res4: {
        type: String
    },
    res5: {
        type: String
    },
    res6: {
        type: String
    },
    sum: {
        type: Number
    },
});

export default mongoose.model('ResultIndivid',ResultIndivid,'results');