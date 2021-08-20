import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Discipline = new Schema({
    name: {
        type: String
    },
    sport: {
        type: String
    }
});

export default mongoose.model('Discipline',Discipline,'disciplines');