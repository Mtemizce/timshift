// server/index.js
import express from 'express';
import authRouter from './routes/auth.js';
import cors from 'cors';
import personnelRouter from './routes/personnel.js'; 


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/personnel', personnelRouter); 

app.listen(PORT, () => {
  console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor`);
});
