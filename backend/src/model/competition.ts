import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Competition = new Schema({
    competitionName: {
        type: String
    },
    sport:{
        type: String
    },
    discipline: {
        type: String
    },
    format:{
        type: Number
    },
    sex: {
        type: String
    },
    type: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    location: {
        type: String
    },
    delegat: {
        type: String
    },
    formirano: {
        type: Number
    }
});

export default mongoose.model('Competition', Competition, 'competitions');