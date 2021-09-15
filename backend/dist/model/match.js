"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Match = new Schema({
    _id: {
        type: Object
    },
    competitionName: {
        type: String
    },
    team1: {
        type: String
    },
    team2: {
        type: String
    },
    faza: {
        type: String
    },
    brPoenaTim1: {
        type: Number
    },
    brPoenaTim2: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Match', Match, 'matches');
//# sourceMappingURL=match.js.map