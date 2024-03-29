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
    },
    numOfPlayers: {
        type: Number
    },
    grupa: {
        type: String
    },
    bodovi: {
        type: Number
    },
    razlika: {
        type: Number
    }
});
    
export default mongoose.model('Team', Team, 'teams');