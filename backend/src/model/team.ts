import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Team = new Schema({
    _id: {
        type: Object
    },
    name: {
        type: String
    },
    competition: {
        type: String
    },
    sex:{
        type: String
    },
    sport: {
        type: String
    },
    discipline: {
        type: String
    },
    country: {
        type: String
    }
});

export default mongoose.model('Team', Team, 'teams');