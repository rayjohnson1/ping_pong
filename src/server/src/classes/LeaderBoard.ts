import { IDBPool } from "./Db/interfaces";
import DatabaseFactory from "./Db/databaseFactory";

export interface IGameScore {
    userId: number;
    gameDifficulty: GameDifficulties;
    pings: number;
    maxBallVelocity: number
}

type GameDifficulties = 'beginner' | 'intermediate' | 'expert'; 

export default class LeaderBoard {

    public static db: IDBPool = new DatabaseFactory().getPool();

    public static async insertPlayerScore(data: IGameScore): Promise<IGameScore> {

        const { userId, gameDifficulty, pings, maxBallVelocity } = data;

        try {

            const { rows } = await this.db.query({
                text: `
                    INSERT INTO
                        leader_boards (user_id, game_difficulty, pings, max_ball_velocity)
                    VALUES
                        ($1, $2, $3, $4)
                    RETURNING *;
                `,
                values: [userId, gameDifficulty, pings, maxBallVelocity]
            });

            return rows[0];

        } catch(e) {

            throw e;

        }

    }

    public static async getLeaderBoard(): Promise<IGameScore[]> {

        try {

            const { rows } = await this.db.query(`SELECT * FROM leader_boards`);
            return <IGameScore[]>rows;

        } catch(e) {

            throw e;

        }

    }

}


/*

user_id,
game_difficulty,
pings,
max_ball_velocity

*/