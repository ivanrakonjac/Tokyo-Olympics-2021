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
const discipline_1 = __importDefault(require("./model/discipline"));
const competition_1 = __importDefault(require("./model/competition"));
const athlete_1 = __importDefault(require("./model/athlete"));
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
    user_1.default.findOne({ 'email': email, 'password': password, 'status': 'confirmed' }, (err, user) => {
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
 * Vraca sve usere ckojima status nije confirmed
 *
 * @returns collection of users
 */
router.route('/getUnconfirmedUsers').get((req, res) => {
    user_1.default.find({ 'status': { $ne: 'confirmed' } }, (err, users) => {
        if (err)
            console.log(err);
        else {
            if (users == null)
                return res.json(null);
            else
                res.json(users);
            ;
        }
    });
});
/**
 * Setuje status usera na confirmed
 *
 * @param {String} id usera
 * @returns status
 */
router.route('/setUserStatusAsConfirmed').post((req, res) => {
    let id = req.body.id;
    user_1.default.collection.updateOne({ '_id': mongoose_1.default.Types.ObjectId(id) }, { $set: { 'status': 'confirmed' } }).then(a => {
        res.status(200).json({ 'setUserStatusAsConfirmed': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'setUserStatusAsConfirmed': 'no' });
    });
});
/**
 * Delete user request
 *
 * @param {String} id usera
 * @returns status
 */
router.route('/deleteUser').post((req, res) => {
    let id = req.body.id;
    user_1.default.collection.deleteOne({ '_id': mongoose_1.default.Types.ObjectId(id) }).then(a => {
        res.status(200).json({ 'deleteUser': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'deleteUser': 'no' });
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
/**
 * Dodavanje sporta u bazu
 *
 * @req sport
 * @res 200 ok / 400 not ok
 */
router.route('/addSport').post((req, res) => {
    let s = new sport_1.default(req.body);
    s.save().then(s => {
        res.status(200).json({ 'sport': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'sport': 'no' });
    });
});
/**
 * Proverava da li postoji prosledjena disciplina
 *
 * @req sportDisciplineName
 * @res true - postoji, false - ne postoji
 */
router.route('/sportDisciplinaPostoji').post((req, res) => {
    let name = req.body.name;
    console.log(name);
    discipline_1.default.findOne({ 'name': name }, (err, discipline) => {
        if (err)
            console.log(err);
        else {
            if (discipline == null)
                return res.json(false);
            else
                res.json(true);
            ;
        }
    });
});
/**
 * Dodavanje discipline u bazu
 *
 * @req discipline
 * @res 200 ok / 400 not ok
 */
router.route('/addSportDiscipline').post((req, res) => {
    let d = new discipline_1.default(req.body);
    d.save().then(d => {
        res.status(200).json({ 'discipline': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'discipline': 'no' });
    });
});
/**
 * Dohvata imena svih disciplina
 *
 * @returns collection of all disciplines names
 */
router.route('/getAllDisciplinesNames').get((req, res) => {
    discipline_1.default.find({}, { name: 1, _id: 0 }, (err, disc) => {
        if (err)
            console.log(err);
        else
            res.json(disc);
    });
});
/**
 * Dohvata imena svih disciplina za prosledjeni sport
 *
 * @param sport
 * @returns collection of all disciplines names
 */
router.route('/getAllDisciplinesForSport').post((req, res) => {
    let sport = req.body.sport;
    discipline_1.default.find({ 'sport': sport }, { name: 1, _id: 0 }, (err, disc) => {
        if (err)
            console.log(err);
        else
            res.json(disc);
    });
});
/**
 * Dodavanje takmicenja u bazu
 *
 * @req competition
 * @res 200 ok / 400 not ok
 */
router.route('/addCompetition').post((req, res) => {
    let c = new competition_1.default(req.body);
    c.save().then(c => {
        res.status(200).json({ 'competition': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'competition': 'no' });
    });
});
/**
 * Dohvatanje imena takmicenja za prosledjene parametre
 *
 * @param discipline
 * @param sex
 * @res competition name
 */
router.route('/getCompetitionName').post((req, res) => {
    let discipline = req.body.discipline;
    let sex = req.body.sex;
    competition_1.default.findOne({ 'discipline': discipline, 'sex': sex }, { competitionName: 1, _id: 0 }, (err, competition) => {
        if (err)
            console.log(err);
        else
            res.json(competition);
    });
});
/**
 * Dohvata ime, sport, disciplinu, pol svih neformiranih takmicenja
 *
 * @returns collection of all unformed competitions
 */
router.route('/getAllUnformedCompetitions').get((req, res) => {
    competition_1.default.find({ 'formirano': 0 }, { competitionName: 1, sport: 1, discipline: 1, sex: 1, _id: 1 }, (err, disc) => {
        if (err)
            console.log(err);
        else
            res.json(disc);
    });
});
/**
 * Dohvata ime, sport, disciplinu, pol svih formiranih takmicenja
 *
 * @returns collection of all formed competitions
 */
router.route('/getAllFormedCompetitions').get((req, res) => {
    competition_1.default.find({ 'formirano': 1 }, { competitionName: 1, sport: 1, discipline: 1, sex: 1, _id: 1 }, (err, disc) => {
        if (err)
            console.log(err);
        else
            res.json(disc);
    });
});
/**
 * Formira takmicenje za prosledjeni id
 *
 * @param {String} id
 * @returns status
 */
router.route('/setCompetitionAsFormed').post((req, res) => {
    let id = req.body.id;
    competition_1.default.collection.updateOne({ '_id': mongoose_1.default.Types.ObjectId(id) }, { $set: { 'formirano': 1 } }).then(a => {
        res.status(200).json({ 'setCompetitionAsFormed': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'setCompetitionAsFormed': 'no' });
    });
});
/**
 * Dohvata ime sport za koji je sportista prijavljen (ako nije vraca null)
 *
 * @param athleteFirstname
 * @param athleteLastname
 * @returns sport of athlete
 */
router.route('/getSportOfAthlete').post((req, res) => {
    let athleteFirstname = req.body.athleteFirstname;
    let athleteLastname = req.body.athleteLastname;
    athlete_1.default.findOne({ 'firstname': athleteFirstname, 'lastname': athleteLastname }, { sport: 1, _id: 0 }, (err, sport) => {
        if (err)
            console.log(err);
        else
            res.json(sport);
    });
});
/**
 * Dodavanje sportiste u bazu
 *
 * @req athlete
 * @res 200 ok / 400 not ok
 */
router.route('/addAthlete').post((req, res) => {
    let a = new athlete_1.default(req.body);
    a.save().then(a => {
        res.status(200).json({ 'athlete': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'athlete': 'no' });
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map