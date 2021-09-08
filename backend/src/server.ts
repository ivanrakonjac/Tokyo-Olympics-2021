import express from 'express';
import cors from 'cors';
import bodyParser, { json } from 'body-parser';
import mongoose from 'mongoose';
import user from './model/user';
import sport from './model/sport';
import discipline from './model/discipline';
import competition from './model/competition';
import athlete from './model/athlete';
import country from './model/country';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Tokyo_2021');

const conn = mongoose.connection;

conn.once('open', ()=>{
    console.log('mongo open');
})

const router = express.Router();

router.route('/login').post((req, res)=>{
    let email = req.body.email;
    let password = req.body.password;

    console.log(email);
    console.log(password);

    user.findOne({'email':email, 'password': password, 'status': 'confirmed'}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    } )
});

/**
 * Provera ima li vec vodje za prosledjenu zemlju
 * 
 * @returns res.json()
 * false - ne postoji
 * true - postoji
 */
router.route('/vodjaDelegacijePostoji').post((req, res)=>{
    let country = req.body.country;

    console.log(country);

    user.findOne({'country':country}, (err, user)=>{
        if(err) console.log(err);
        else{
            if (user == null) return res.json(false);
            else res.json(true);;
        }
    } )
});

/**
 * Vraca sve usere ckojima status nije confirmed
 * 
 * @returns collection of users
 */
 router.route('/getUnconfirmedUsers').get((req, res)=>{

    user.find({'status': {$ne: 'confirmed'} }, (err, users)=>{
        if(err) console.log(err);
        else{
            if (users == null) return res.json(null);
            else res.json(users);;
        }
    } )
});

/**
 * Setuje status usera na confirmed
 *
 * @param {String} id usera
 * @returns status
 */
 router.route('/setUserStatusAsConfirmed').post((req, res) => {
    let id = req.body.id;

    user.collection.updateOne({'_id': mongoose.Types.ObjectId(id)}, {$set: {'status': 'confirmed'}}).then(a=>{
        res.status(200).json({'setUserStatusAsConfirmed':'ok'});
    }).catch(err=>{
        res.status(400).json({'setUserStatusAsConfirmed':'no'});
    })
   
});

/**
 * Delete user request
 *
 * @param {String} id usera
 * @returns status
 */
 router.route('/deleteUser').post((req, res) => {
    let id = req.body.id;

    user.collection.deleteOne({'_id': mongoose.Types.ObjectId(id)}).then(a=>{
        res.status(200).json({'deleteUser':'ok'});
    }).catch(err=>{
        res.status(400).json({'deleteUser':'no'});
    })
   
});

/**
 * Registracija novog korisnika (Delegat / Vodja delegacije)
 * @param user
 * @returns res.json()
 */
router.route('/register').post((req, res)=>{
    let u = new user(req.body);
    u.save().then(u=>{
        res.status(200).json({'user':'ok'});
    }).catch(err=>{
        res.status(400).json({'user':'no'});
    })
});

/**
 * Get sve delegate
 * 
 * @returns collection of delegates
 */
 router.route('/getAllDelegates').get((req, res)=>{

    user.find({'type': 1, 'brojTakmicenja' : {$lt: 3} }, (err, delegates)=>{
        if(err) console.log(err);
        else{
            if (delegates == null) return res.json(null);
            else res.json(delegates);;
        }
    } )
});

/**
 * Dohvata imena svih sportova
 * 
 * @returns collection of all sports names
 */
router.route('/getAllSports').get((req, res)=>{
    sport.find({},{name:1, _id: 0 },(err, sports)=>{
        if(err) console.log(err);
        else res.json(sports);
    });
}); 

/**
 * Proverava da li postoji prosledjeni sport
 * 
 * @req sportName 
 * @res true-sport postoji, false ne postoji 
 */
 router.route('/sportPostoji').post((req, res)=>{
    let sportName = req.body.sportName;

    console.log(sportName);

    sport.findOne({'name':sportName}, (err, user)=>{
        if(err) console.log(err);
        else{
            if (user == null) return res.json(false);
            else res.json(true);;
        }
    } )
});

/**
 * Get sport obj by name
 * 
 * @req sportName 
 * @res sport obj 
 */
 router.route('/sportByName').post((req, res)=>{
    let sportName = req.body.sportName;

    console.log(sportName);

    sport.find({'name':sportName}, (err, sport)=>{
        if(err) console.log(err);
        else{
            res.json(sport);
        }
    } )
});

  /**
   * Dodavanje sporta u bazu
   * 
   * @req sport 
   * @res 200 ok / 400 not ok
   */
router.route('/addSport').post((req, res)=>{
    let s = new sport(req.body);
    s.save().then(s=>{
        res.status(200).json({'sport':'ok'});
    }).catch(err=>{
        res.status(400).json({'sport':'no'});
    })
});

/**
 * Proverava da li postoji prosledjena disciplina
 * 
 * @req sportDisciplineName 
 * @res true - postoji, false - ne postoji 
 */
 router.route('/sportDisciplinaPostoji').post((req, res)=>{
    let name = req.body.name;

    console.log(name);

    discipline.findOne({'name':name}, (err, discipline)=>{
        if(err) console.log(err);
        else{
            if (discipline == null) return res.json(false);
            else res.json(true);;
        }
    } )
});

  /**
   * Dodavanje discipline u bazu
   * 
   * @req discipline 
   * @res 200 ok / 400 not ok
   */
   router.route('/addSportDiscipline').post((req, res)=>{
    let d = new discipline(req.body);
    d.save().then(d=>{
        res.status(200).json({'discipline':'ok'});
    }).catch(err=>{
        res.status(400).json({'discipline':'no'});
    })
});

/**
 * Dohvata imena svih disciplina
 *
 * @returns collection of all disciplines names
 */
 router.route('/getAllDisciplinesNames').get((req, res) => {
    discipline.find({}, { name: 1, _id: 0 }, (err, disc) => {
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

    discipline.find({'sport': sport}, { name: 1, _id: 0 }, (err, disc) => {
        if (err)
            console.log(err);
        else
            res.json(disc);
    });
});

/**
 * Get sportName of discipline
 *
 * @param discipline
 * @returns sport 
 */
 router.route('/getSportNameOfDiscipline').post((req, res) => {
    let disciplineName = req.body.disciplineName;

    discipline.findOne({'name': disciplineName}, { sport: 1, _id: 0 }, (err, disc) => {
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
router.route('/addCompetition').post((req, res)=>{
let c = new competition(req.body);
    c.save().then(c=>{
        res.status(200).json({'competition':'ok'});
    }).catch(err=>{
        res.status(400).json({'competition':'no'});
    })
});

/**
 * Dohvatanje imena takmicenja za prosledjene parametre
 * 
 * @param discipline
 * @param sex 
 * @res competition name
 */
 router.route('/getCompetitionName').post((req, res)=>{

    let discipline = req.body.discipline;
    let sex = req.body.sex;

    competition.findOne({'discipline': discipline, 'sex': sex}, { competitionName: 1, _id: 0 }, (err, competition) => {
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
    competition.find({'formirano':0}, { competitionName: 1, sport: 1, discipline: 1, sex: 1, _id: 1 }, (err, disc) => {
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
    competition.find({'formirano':1}, { competitionName: 1, sport: 1, discipline: 1, sex: 1, _id: 1 }, (err, disc) => {
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

    competition.collection.updateOne({'_id': mongoose.Types.ObjectId(id)}, {$set: {'formirano': 1}}).then(a=>{
        res.status(200).json({'setCompetitionAsFormed':'ok'});
    }).catch(err=>{
        res.status(400).json({'setCompetitionAsFormed':'no'});
    })
   
});

/**
 * Dohvata ime sport za koji je sportista prijavljen (ako nije vraca null)
 * 
 * @param athleteFirstname 
 * @param athleteLastname
 * @returns sport of athlete
 */
router.route('/getSportOfAthlete').post((req, res)=>{
    let athleteFirstname = req.body.athleteFirstname;
    let athleteLastname = req.body.athleteLastname;

    athlete.findOne({'firstname':athleteFirstname, 'lastname':athleteLastname}, {sport: 1, _id:0}, (err, sport) => {
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
 router.route('/addAthlete').post((req, res)=>{
    let a = new athlete(req.body);
        a.save().then(a=>{
            res.status(200).json({'athlete':'ok'});
        }).catch(err=>{
            res.status(400).json({'athlete':'no'});
        })
    });

/**
 * Dodaj zemlju
 * @param country
 * @returns res.json()
 */
 router.route('/addCountry').post((req, res)=>{
    let c = new country(req.body);

    c.save().then(c=>{
        res.status(200).json({'country':'ok'});
    }).catch(err=>{
        res.status(400).json({'country':'no'});
    })
});




app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));

