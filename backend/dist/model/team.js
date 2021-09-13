"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Team = new Schema({
    _id: {
        type: Object
    },
    name: {
        type: String
    },
    competition: {
        type: String
    },
    sex: {
        type: String
    },
    sport: {
        type: String
    },
    discipline: {
        type: String
    },
    country: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Team', Team, 'teams');
//# sourceMappingURL=team.js.map