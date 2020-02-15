import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const fakeState = {
    counter : 0
};


const app = express();
app.use(cors());

// parse application/json
app.use(bodyParser.json({limit: '50mb'}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

// log middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Time: ', new Date().toString());
    console.log(req.method, req.url, 'params:', req.params);
    console.log('query:', req.query);
    console.log('body:', req.body);
    console.log('cookies:', req.cookies);
    // console.log('headers:', req.headers);
    // console.log('rawHeaders:', req.rawHeaders);
    next();
});

const someRouter = express.Router();

someRouter.get('/student', (req : Request, res: Response) => {
    if(req.query.y !== '1') res.status(266).json({z : 'Error'});
    else {
        fakeState.counter +=1
        res.status(200).json({count : fakeState.counter});
    }
})

app.use('/people', someRouter)

app.listen(process.env.PORT, () => {
    console.log('Neko-back listening on port: ' + process.env.PORT);
})