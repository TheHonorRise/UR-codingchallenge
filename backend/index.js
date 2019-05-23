import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes/NbShopsRoutes'
import config from './config';

const app = express();
const PORT = config.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


routes(app);

app.get('/', (req, res)=>{
    res.send(`node server running on port : ${PORT}`);
});

app.listen(PORT);
console.log(`listening on port ${PORT}`);