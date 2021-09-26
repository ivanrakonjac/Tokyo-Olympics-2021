"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Record = new Schema({
    _id: {
        type: Object
    },
    year: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    discipline: {
        type: String
    },
    athlete: {
        type: String
    },
    nationality: {
        type: String
    },
    record: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Record', Record, 'records');
//# sourceMappingURL=record.js.map