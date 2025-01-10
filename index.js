
import express from 'express'
import dotenv from 'dotenv'
import cron from 'node-cron'

//utils
import connectDB from './database/db.js'
import fetchCryptoData from './services/CryptoService.js'


import cryptoRoutes from './routes/cryptoRoutes.js'



dotenv.config()
const port= process.env.PORT || 5000

connectDB()

cron.schedule('0 */2 * * *', fetchCryptoData);

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/rajeshande',cryptoRoutes)



app.listen(port , ()=>{
    console.log(`successfully running on ${port}`)
})

