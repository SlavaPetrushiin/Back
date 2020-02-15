"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const fakeState = {
    counter: 0
};
const app = express_1.default();
app.use(cors_1.default());
// parse application/json
app.use(body_parser_1.default.json({ limit: '50mb' }));
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: false }));
// log middleware
app.use((req, res, next) => {
    console.log('Time: ', new Date().toString());
    console.log(req.method, req.url, 'params:', req.params);
    console.log('query:', req.query);
    console.log('body:', req.body);
    console.log('cookies:', req.cookies);
    // console.log('headers:', req.headers);
    // console.log('rawHeaders:', req.rawHeaders);
    next();
});
const someRouter = express_1.default.Router();
someRouter.get('/student', (req, res) => {
    if (req.query.y !== '1')
        res.status(266).json({ z: 'Error' });
    else {
        fakeState.counter += 1;
        res.status(200).json({ count: fakeState.counter });
    }
});
app.use('/people', someRouter);
app.listen(process.env.PORT, () => {
    console.log('Neko-back listening on port: ' + process.env.PORT);
});
//# sourceMappingURL=index.js.map