import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Country = new Schema({
    name:{
        type: String
    },
    brojSportista:{
        type: Number
    },
    brojZlatnihMedalja: {
        type: Number
    },
    brojSrebrnihMedalja: {
        type: Number
    },
    brojBronzanihMedalja: {
        type: Number
    }
});

export default mongoose.model('Country', Country, 'countries');