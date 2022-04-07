import express from 'express';
import { cors } from './middleware/cors.js';
import morgan from 'morgan';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import  "./middleware/jobs/job.js";

//Importing Routes
import PaymentRoute from "./routes/index.js";

const app = express();

// Mongoose
const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    // serverApi: ServerApiVersion.v1
}
mongoose
    .connect("mongodb+srv://Vircom_v1:Vircom_2021@vircom-v1.xzwnx.mongodb.net/Vircom_v1?retryWrites=true&w=majority", options)
    .then(() => console.log(`Database connection established`))
    .catch((err) => console.error(`There was an error connecting to database, the err is ${err}`));

//middlewares
app.all('*', cors);

app.use(morgan("dev"));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '50mb','extended': 'true'}));
app.use(express.json({type: 'application/vnd.api+json'}));
app.use(cookieParser());
app.use(
    session({
        secret: "process.env.SESSION_SECRET",
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1209600000,
        },
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://Vircom_v1:Vircom_2021@vircom-v1.xzwnx.mongodb.net/Vircom_v1?retryWrites=true&w=majority",
            // autoReconnect: true,
        }),
    }),
);
// cronJob()
// check_availability();
//routes
app.use("/api/payment", PaymentRoute)

export default app;