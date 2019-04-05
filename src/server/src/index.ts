import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../client/lib')));
app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})