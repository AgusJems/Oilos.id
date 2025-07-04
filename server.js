import express from 'express';
import cors from 'cors';
import messageController from './src/controllers/messageController.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/message', messageController.getMessage);
app.get('/api/users/:userId/message', messageController.getUserMessage);

app.listen(port, () => {
  console.log(`Express backend listening at http://localhost:${port}`);
});