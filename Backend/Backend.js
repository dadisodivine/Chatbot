import express from 'express';
import cors from 'cors';
import chatsRouter from './Routes/chats.mjs';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://chatbot-frontend-c7xo.onrender.com'], // Vite dev server and other common ports
  credentials: true
}));
// Routes
app.use('/api/chats', chatsRouter);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});
