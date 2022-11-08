"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const storiesRoute_1 = __importDefault(require("./routes/storiesRoute"));
dotenv_1.default.config(); //We call the environment variables
const app = (0, express_1.default)();
app.use(express_1.default.json()); //Middleware for parsing requests to json
app.use((0, cors_1.default)()); //Middleware to fix possible issues interacting with other local apps
app.get('/ping', (req, res) => {
    console.log('Pinged succesfully!'); //route to check everything is ok
    res.send('Pong'); //Ignore it...
});
app.use('api/stories', storiesRoute_1.default); //We use the home router
app.listen(process.env.PORT || 8000, () => {
    console.log(`We are online and listening on port ${process.env.PORT || 8000}`); //We initialize the server
});
