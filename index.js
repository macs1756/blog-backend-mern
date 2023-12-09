import express from 'express'
import mongoose from 'mongoose'

const app = express()

function startServer() {
      app.listen(5000, ()=>{
            console.log('server working ...')
      })
}

async function connectToBase() {
      try {


            const databaseUri = 'mongodb+srv://macs1756:test12345@cluster1.jidxccl.mongodb.net/blog?retryWrites=true&w=majority';

            await mongoose.connect(databaseUri);
                  //mongoose.connect('mongodb://username:password@host:port/database?options...');
            startServer();
            
      } catch (error) {
            console.log(error)
      }
}


connectToBase()