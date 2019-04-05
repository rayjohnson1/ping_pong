import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../../classes/User';
import DatabaseFactory from '../../classes/Db/databaseFactory';


const router = express.Router();


router.post('/', async (req, res) => {


    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    }, new DatabaseFactory().getPool(), bcrypt);

    try {

        const response = await user.create();
        return res.status(201).json({ payload: response }).end();


    } catch(err) {

        return res.status(400).json({ err }).end();

    }

});

router.post('/signin', async (req, res) => {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    }, new DatabaseFactory().getPool(), bcrypt);

    try {

        const response = await user.signin();
        return res.status(200).json({ payload: response }).end();


    } catch(err) {

        return res.status(400).json({ err }).end();

    }

});


export default router;