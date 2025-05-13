// server/index.js
import express from 'express';
import authRouter from './routes/auth.js';
import cors from 'cors';
import personnelRouter from './routes/personnel.js'; 
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.BE_PORT || 3002;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/personnel', personnelRouter); 

app.listen(PORT, () => {
  console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
