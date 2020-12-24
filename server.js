const userRoute = require('./routes/userRoute.js');
const  express = require( 'express');
const  mongoose = require( 'mongoose');
const  dotenv = require( 'dotenv');
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
    .then(() => console.log("connected to database"))
    .catch((error) => console.log(error));

app.use(express.json());
app.use('/user', userRoute);
app.listen(5000, () => console.log("Server started on port 5000"));
