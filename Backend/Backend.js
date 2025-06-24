import express from 'express';
import cors from 'cors';
import chatsRouter from './Routes/chats.mjs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://chatbot-frontend-c7xo.onrender.com'], // Vite dev server and other common ports
  credentials: true
}));

// Serve uploads directory statically
app.use('/uploads', express.static(path.join(process.cwd(), 'Chatbot', 'Backend', 'uploads')));

// Routes
app.use('/api/chats', chatsRouter);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});
