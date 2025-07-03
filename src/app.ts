import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import postRoutes from './routes/postRoutes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.get('/', (_req, res) => {
  res.send('Blog API is running ✅');
});

app.use('/api/posts', postRoutes);

export default app;
