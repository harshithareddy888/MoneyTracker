import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()
import mongoose, { mongo } from 'mongoose';
import TransactionModel from './models/transaction.js';
const app = express()
app.use(cors())
app.use(express.json())

app.use(express.json())
app.get('/api/test', (req, res) => {
  res.json('hello world');
});
app.post('/api/transactions',(req, res) => {
   mongoose.connect(process.env.VITE_MONGO_URL)
    const { name, description, datetime, price } = req.body
    const transaction = TransactionModel.create({ name, description, datetime, price })
    //  transaction.save()
  res.json(transaction)
})
app.get('/api/transactions', (req, res) => {
  mongoose.connect(process.env.VITE_MONGO_URL)
  TransactionModel.find().then((transactions) => {
    res.json(transactions)
  })
})
app.listen(3000, () => console.log('Server running on port 3000'));
