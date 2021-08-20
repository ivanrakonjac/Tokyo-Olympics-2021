import express from 'express';
import cors from 'cors';
import bodyParser, { json } from 'body-parser';
import mongoose from 'mongoose';
import user from './model/user';

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

router.route('/register').post((req, res)=>{
    let u = new user(req.body);
    u.save().then(u=>{
        res.status(200).json({'user':'ok'});
    }).catch(err=>{
        res.status(400).json({'user':'no'});
    })
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));