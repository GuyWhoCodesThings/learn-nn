import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js'
import dummyRouter from './routes/dummy.route.js'
import problemRouter from './routes/problem.route.js'
import bodyParser from 'body-parser'
import 'dotenv/config'

const app = express();

app.use(cors())
app.use(bodyParser.json());


app.use('/api/user', userRouter)
app.use('/api/dummy', dummyRouter)
app.use('/api/problem', problemRouter)

mongoose.connect(process.env.MONGO).then(() => {
    console.log("db connected")
}).catch((err) => {
    console.log(err)
})


app.listen(3000, () => {
    console.log("server started on port 3000")
})