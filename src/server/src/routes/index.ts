import express from 'express';

import userRoutes from './user';
import LeaderBoardRoutes from './leaderboards';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/leader-board', LeaderBoardRoutes);

export default router;