"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ResultIndivid = new Schema({
    _id: {
        type: Object
    },
    competitionID: {
        type: String
    },
    athleteID: {
        type: String
    },
    competitionName: {
        type: String
    },
    athleteName: {
        type: String
    },
    res1: {
        type: String
    },
    res2: {
        type: String
    },
    res3: {
        type: String
    },
    res4: {
        type: String
    },
    res5: {
        type: String
    },
    res6: {
        type: String
    },
    sum: {
        type: Number
    },
    mesto: {
        type: String
    },
    competitionFormat: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('ResultIndivid', ResultIndivid, 'results');
//# sourceMappingURL=resultIndivid.js.map