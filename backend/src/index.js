// initiliazation of modules
import  express  from "express";  
import cors from 'cors' 
import morgan from 'morgan'
import http from "http"

// importation of the routes
import userRouter from  './router/userRouter.js'
import adminRouter from  './router/adminRouter.js'
import articleRouter from  './router/articleRouter.js'
import tickerRouter from  './router/tickerRouter.js'
import utilsRouter from './router/utilRouter.js'
import issueRouter from './router/issueRouter.js'
import orderRouter from './router/orderRouter.js'
import requestRouter from './router/requestRouter.js'
import callRouter from './router/callRouter.js'
import path from "path";
import seeder from "./seeder.js";

// setup the  express server
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 5000
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"))

// Routing

app.use('/api/users',userRouter)
app.use('/api/admins',adminRouter)
app.use('/api/articles',articleRouter)
app.use('/api/tickers',tickerRouter)
app.use('/api/utils',utilsRouter)
app.use('/api/issues',issueRouter)
app.use('/api/requests',requestRouter)
app.use('/api/orders',orderRouter)
app.use('/api/calls',callRouter)

app.get('/users/*',(req,res)=>{
    res.sendFile(path.resolve(`./src/uploads${req.originalUrl}`));
  })
  






  // seeder()









// launch the server

server.listen(PORT,()=>{
    console.log(`the server is running on the port ${PORT}`)

})