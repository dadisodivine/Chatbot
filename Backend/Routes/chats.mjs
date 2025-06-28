import { Router } from 'express';
import { Mistral } from '@mistralai/mistralai';
import * as dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });
const router = Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'Chatbot', 'Backend', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer disk storage with file filter and size limit
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (/^image\/(png|jpe?g|gif|webp)$/i.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

router.get('/', (req, res) => {
  res.send('Express server is running!');
});

router.post('/chat', upload.single('image'), async (req, res) => {
  try {
    const { message, mode } = req.body;
    const imageFile = req.file;

    console.log('Message:', message);
    console.log('Mode:', mode);
    if (imageFile) {
      console.log('Image:', imageFile.originalname);
    }

    let reply = '';

    if (imageFile) {
      // Read image as base64 and construct data URL
      const filePath = path.join(uploadsDir, imageFile.filename);
      const mimeType = imageFile.mimetype;
      let base64Image, dataUrl;
      try {
        const imageBuffer = fs.readFileSync(filePath);
        base64Image = imageBuffer.toString('base64');
        dataUrl = `data:${mimeType};base64,${base64Image}`;
      } catch (err) {
        console.error('Error reading image file:', err.message);
        return res.status(500).json({ reply: '❌ Failed to process image.' });
      }
      let completion;
      try {
        completion = await client.chat.complete({
          model: 'mistral-small-2503',
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: message || "What's in this image?" },
                { type: 'image_url', imageUrl: dataUrl }
              ]
            }
          ]
        });
      } catch (err) {
        console.error('Mistral API error:', err.message);
        // Clean up file before returning
        try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
        return res.status(500).json({ reply: '❌ Failed to connect to AI model.' });
      }
      // Clean up file after processing
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Error deleting image file:', err.message);
      }
      reply = completion?.choices?.[0]?.message?.content ?? "🤖 Sorry, I couldn't generate a response.";
      return res.json({ reply });
    }

    // Switch mode logic for text-only
    switch (mode) {
      case 'code': {
        const systemPrompt = 'You are a helpful coding assistant. Help users with their code and explain concepts clearly.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      case 'general': {
        const systemPrompt = 'You are a general purpose chatbot. Be friendly and helpful.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      case 'creative': {
        const systemPrompt = 'You are a creative assistant. Help users write stories, poems, and imaginative content.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      case 'analysis': {
        const systemPrompt = 'You are a data analysis assistant. Help users understand data, statistics, and analytics.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      default: {
        reply = 'Invalid mode selected.';
        break;
      }
    }

    return res.json({ reply });

  } catch (error) {
    console.error('❌ Error in /chat:', error.message);
    return res.status(500).json({ reply: '❌ An error occurred. Please try again later.' });
  }
});

// 🔁 Mistral Reply Helper Function
async function getMistralReply(userMessage, systemPrompt) {
  try {
    const completion = await client.chat.complete({
      model: 'mistral-small-2503',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ]
    });

    return (
      completion?.choices?.[0]?.message?.content ??
      "🤖 Sorry, I couldn't generate a response."
    );
  } catch (err) {
    console.error('Mistral API error:', err.message);
    return '⚠️ Failed to connect to AI model.';
  }
}

export default router;
