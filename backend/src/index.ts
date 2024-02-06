import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get('/api/test', async(req: Request, res: Response) => {
  res.json({ message: 'endpoint working!'})
});

app.listen(3000, () => {
  console.log('app running on port 3000')
})