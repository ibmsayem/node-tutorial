import express from "express";

import { PORT, mongoDbUrl, mongoDbWeb  } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js"
import bookrouter from "./routes/bookrouter.js";
import cors from 'cors';

const app = express();

//Middleware to parsing request body
app.use(express.json());

//Middleware for handling CORS policy
//option 1: Allow all origins with Deafult of Cors(*)

app.use(cors());

//Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-type'],
//     })
// )

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to CPAN212 Mongodb Course');
});

//Middleware to access the book router
app.use('/books', bookrouter);

//MongoDB connection
mongoose.connect(mongoDbUrl)
.then(()=> {
    console.log('App Connected to database');
    app.get('/', (request, response) => {
        console.log(request)
        return response.status(234).send('Welcome to CPAN212 Mongodb Course');
    });
})
.catch((error) => {
    console.log(error);
})

app.listen(PORT, ()=> {
    console.log(`App is running on ${PORT}`);
});
