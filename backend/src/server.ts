import express from 'express';
import cors from 'cors';
import bodyParser, { json } from 'body-parser';
import mongoose from 'mongoose';
import user from './model/user';
import sport from './model/sport';

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

    user.findOne({'email':email, 'password': password}, (err, user)=>{
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
   * Dodavanje sporta u bazu
   * 
   * @req sport 
   * @res 200 ok /400 not ok
   */
router.route('/addSport').post((req, res)=>{
    let s = new sport(req.body);
    s.save().then(u=>{
        res.status(200).json({'sport':'ok'});
    }).catch(err=>{
        res.status(400).json({'sport':'no'});
    })
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));