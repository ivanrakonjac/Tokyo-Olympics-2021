import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Match = new Schema({
    _id: {
        type: Object
    },
    competitionName: {
        type: String
    },
    team1:{
        type: String
    },
    team2: {
        type: String
    },
    faza:{
        type: String
    },
    brPoenaTim1: {
        type: Number
    },
    brPoenaTim2: {
        type: Number
    }
});

export default mongoose.model('Match', Match, 'matches');