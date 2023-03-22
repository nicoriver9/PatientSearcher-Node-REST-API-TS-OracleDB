import express, {Request,Response, NextFunction ,Application} from 'express';
import helmet from 'helmet';
import indexRoutes from './routes/index';
import indexRoutesAPI from './routes/index-token';


import dotenv from 'dotenv';
dotenv.config();

const appTokenGenerator: Application    = express();
const app: Application                  = express();

// middlewares appToken
appTokenGenerator.use(express.json());
appTokenGenerator.use(helmet());
appTokenGenerator.use(express.urlencoded({extended: false}));

//moddlewares appServer
app.use((req:Request, res:Response, next:NextFunction)=>{
    setTimeout(next, Number(process.env.RESPONSE_DELAY) )
});
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({extended: false}));

// Routes appToken
appTokenGenerator.use(indexRoutesAPI);

//Settings
app.set('view engine', 'hbs');

//Routes appServer
app.use(indexRoutes);


appTokenGenerator.listen(process.env.SERVER_TOKEN_PORT);
console.log('API-Token on port', process.env.SERVER_TOKEN_PORT  || 8080);

app.listen(process.env.SERVER_PORT);
console.log('Server on port', process.env.SERVER_PORT || 8080);