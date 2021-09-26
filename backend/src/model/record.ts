import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Record = new Schema({
    _id: {
        type: Object
    },
    year: {
        type: String
    },
    city:{
        type: String
    },
    country: {
        type: String
    },
    discipline:{
        type: String
    },
    athlete: {
        type: String
    },
    nationality: {
        type: String
    },
    record:{
        type: String
    }
});

export default mongoose.model('Record', Record, 'records');