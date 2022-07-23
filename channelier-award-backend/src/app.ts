// Importing the Requirements
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from './routes/api';
import path from 'path';
import tempController from './controllers/tempController';

// MongoDb connection URL
const mongoUrl = process.env.NODE_ENV == 'prod' ? `mongodb://awardAppUser:FMCGaward2020@localhost:27017/award` : "mongodb://127.0.0.1:27017/award2";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
    console.log(`MongoDb connected on cloud! ${mongoUrl}`);
});

mongoose.connection.on("error", (err: any) => {
    console.log(err);
});

// Creating a app instance
const app = express();

// Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(cors());

/* Extending Request interface to attach user object to Request object */
declare global {

    namespace Express {
        interface User {
            id: string,
            role: string,
            phone: string
        }

        interface Request {
            user: User;
        }
    }
    
}

// Routes
app.use('/api', apiRouter);
app.get('/', (req, res) => res.send("Channelier Award Backend"));

// Exporting the App
export default app;