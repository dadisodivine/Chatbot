import express from 'express';
import cors from 'cors';
import { Mistral } from '@mistralai/mistralai';
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({apiKey:apiKey});
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://chatbot-frontend-c7xo.onrender.com'], // Vite dev server and other common ports
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

// Chat message endpoint
app.post('/api/message', async (req, res) => {
  try {
    const { message, userId, timestamp } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Message is required and must be a non-empty string'
      });
    }

    // Simulate processing time (replace with actual AI/chatbot logic)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
 // Generate bot response (replace with actual AI integration)
    const chatResponse = await client.chat.complete({
        model: "mistral-small-2503",
        messages: [{role: 'user', content: message}]
    });

    console.log('Chat:', chatResponse.choices?.[0]?.message?.content);
    // Send response
    res.json({
      success: true,
      response: {
        id: Date.now(),
        text: chatResponse.choices?.[0]?.message?.content,
        sender: 'bot',
        timestamp: new Date().toISOString()
      },
      userMessage: {
        id: Date.now() - 1,
        text: message.trim(),
        sender: 'user',
        timestamp: timestamp || new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Sorry, I encountered an error processing your message. Please try again.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});
