import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Athlete = new Schema({
    _id: {
        type: Object
    },
    firstname: {
        type: String
    },
    lastname:{
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
    team: {
        type: String
    }
});

export default mongoose.model('Athlete', Athlete, 'athletes');