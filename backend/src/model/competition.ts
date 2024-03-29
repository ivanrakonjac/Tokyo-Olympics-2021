import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Competition = new Schema({
    _id: {
        type: Object
    },
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
    },
    rasporedNapravljen: {
        type: Number
    },
    formatRezultata: {
        type: String
    },
    minTakmicara: {
        type: Number
    },
    maxTakmicara: {
        type: Number
    },
    maxTakmicaraUFinalu: {
        type: Number
    },
    datumFinala: {
        type: Date
    },
    vremeFinala: {
        type: String
    },
    numOfFinishedMatches: {
        type: Number
    },
    faza: {
        type: String
    }
});

export default mongoose.model('Competition', Competition, 'competitions');
