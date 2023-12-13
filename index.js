import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import auth from './routes/auth.js'
import postRoutes from './routes/postRoutes.js'

const app = express()
dotenv.config()

//constans
const PORT = process.env.PORT 
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

//Middleware
app.use(cors())
app.use(express.json())

function startServer() {


      //Rotes
      app.use('/api/auth', auth)
      app.use('/api/post', postRoutes)

      
      app.listen( PORT , ()=>{
            console.log('server working ...')
      })
}



async function connectToBase() {
      try {


            const databaseUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.jidxccl.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
            await mongoose.connect(databaseUri);
      
            startServer();
            
      } catch (error) {
            console.log(error)
      }
}


connectToBase()