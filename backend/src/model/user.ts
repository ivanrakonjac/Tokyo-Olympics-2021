import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    _id: {
        type: Object
    },
    username: {
        type: String
    },
    password:{
        type: String
    },
    firstName: {
        type: String
    },
    lastName:{
        type: String
    },
    country: {
        type: String
    },
    email: {
        type: String
    },
    type:{
        type: Number
    },
    status:{
        type: String
    },
    brojTakmicenja:{
        type: Number
    }
});

export default mongoose.model('User', User, 'users');