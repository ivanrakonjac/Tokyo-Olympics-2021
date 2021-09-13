import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ResultIndivid = new Schema({
    _id: {
        type: Object
    },
    competitionID: {
        type: String
    },
    athleteID: {
        type: String
    },
    competitionName: {
        type: String
    },
    athleteName: {
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
    mesto: {
        type: String
    },
    competitionFormat: {
        type: Number
    }
});

export default mongoose.model('ResultIndivid',ResultIndivid,'results');