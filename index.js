const express = require('express')
const cors=require('cors')
// const paginate = require('jw-paginate'); 
// const bodyParser = require('body-parser');
require('./db/mongoose')

const userRouter = require('./Router/user_rt')
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
const app= express()
const port=process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use('/public',express.static("public"))
app.use(userRouter)
app.listen(port,()=> console.log(`Server is listening on ${port}`)) 
// sudo kill -9 `sudo lsof -t -i:3000`