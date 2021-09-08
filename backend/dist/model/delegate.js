"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Delegate = new Schema({
    _id: {
        type: Object
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    country: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: Number
    },
    status: {
        type: String
    },
    brojTakmicenja: {
        type: Number
    },
    takmicenje_1_id: {
        type: Object
    },
    takmicenje_2_id: {
        type: Object
    },
    takmicenje_3_id: {
        type: Object
    },
});
exports.default = mongoose_1.default.model('Delegate', Delegate, 'users');
//# sourceMappingURL=delegate.js.map