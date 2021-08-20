"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./model/user"));
const sport_1 = __importDefault(require("./model/sport"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/Tokyo_2021');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
router.route('/login').post((req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email);
    console.log(password);
    user_1.default.findOne({ 'email': email, 'password': password }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
/**
 * Provera ima li vec vodje za prosledjenu zemlju
 *
 * @returns res.json()
 * false - ne postoji
 * true - postoji
 */
router.route('/vodjaDelegacijePostoji').post((req, res) => {
    let country = req.body.country;
    console.log(country);
    user_1.default.findOne({ 'country': country }, (err, user) => {
        if (err)
            console.log(err);
        else {
            if (user == null)
                return res.json(false);
            else
                res.json(true);
            ;
        }
    });
});
/**
 * Registracija novog korisnika (Delegat / Vodja delegacije)
 * @param user
 * @returns res.json()
 */
router.route('/register').post((req, res) => {
    let u = new user_1.default(req.body);
    u.save().then(u => {
        res.status(200).json({ 'user': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'user': 'no' });
    });
});
/**
 * Dohvata imena svih sportova
 *
 * @returns collection of all sports names
 */
router.route('/getAllSports').get((req, res) => {
    sport_1.default.find({}, { name: 1, _id: 0 }, (err, sports) => {
        if (err)
            console.log(err);
        else
            res.json(sports);
    });
});
/**
 * Proverava da li postoji prosledjeni sport
 *
 * @req sportName
 * @res true-sport postoji, false ne postoji
 */
router.route('/sportPostoji').post((req, res) => {
    let sportName = req.body.sportName;
    console.log(sportName);
    sport_1.default.findOne({ 'name': sportName }, (err, user) => {
        if (err)
            console.log(err);
        else {
            if (user == null)
                return res.json(false);
            else
                res.json(true);
            ;
        }
    });
});
router.route('/addSport').post((req, res) => {
    let s = new sport_1.default(req.body);
    s.save().then(u => {
        res.status(200).json({ 'sport': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'sport': 'no' });
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map