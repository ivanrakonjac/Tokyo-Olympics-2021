"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Competition = new Schema({
    _id: {
        type: Object
    },
    competitionName: {
        type: String
    },
    sport: {
        type: String
    },
    discipline: {
        type: String
    },
    format: {
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
    }
});
exports.default = mongoose_1.default.model('Competition', Competition, 'competitions');
//# sourceMappingURL=competition.js.map