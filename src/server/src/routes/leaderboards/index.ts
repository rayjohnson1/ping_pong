import express from 'express';
import LeaderBoard from '../../classes/LeaderBoard';
import DatabaseFactory from '../../classes/Db/databaseFactory';


const router = express.Router();


router.post('/', async (req, res) => {

    try {

        const response = await LeaderBoard.insertPlayerScore({
            userId: req.body.userId,
            gameDifficulty: req.body.game_difficulty,
            pings: parseInt(req.body.pings),
            maxBallVelocity: parseInt(req.body.max_ball_velocity)
        });

        return res.status(201).json({ payload: response }).end();


    } catch(err) {

        return res.status(400).json({ err }).end();

    }

});

router.post('/signin', async (req, res) => {

    try {

        const response = await LeaderBoard.getLeaderBoard();
        return res.status(201).json({ payload: response }).end();


    } catch(err) {

        return res.status(400).json({ err }).end();

    }

});


export default router;