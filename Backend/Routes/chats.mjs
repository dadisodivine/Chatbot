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
      case 'commerce': {
        const systemPrompt = 'You are a business and commerce expert. Help users with business strategy, market analysis, e-commerce, sales, marketing, and commercial decision-making. Provide practical insights for business growth and success.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      case 'economics': {
        const systemPrompt = 'You are an economics expert. Help users understand economic principles, market dynamics, financial analysis, economic policy, and macroeconomic trends. Explain complex economic concepts clearly with real-world examples.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      case 'computer-science': {
        const systemPrompt = 'You are a computer science expert. Help users with algorithms, data structures, software engineering principles, system design, computational theory, and computer science concepts. Provide thorough technical explanations and practical applications.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      // Magistral-based nodes with specialized system prompts
      case 'physics': {
        const systemPrompt = 'You are a physics expert with deep knowledge across all areas of physics. Help users understand physical phenomena, solve physics problems, explain theories from classical mechanics to quantum physics, and connect physics concepts to real-world applications. Use clear explanations and mathematical rigor when appropriate.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      case 'biology': {
        const systemPrompt = 'You are a biology expert with comprehensive knowledge across all biological sciences. Help users understand living systems, biological processes, evolution, genetics, ecology, anatomy, physiology, and molecular biology. Explain complex biological concepts clearly and connect them to current research and applications.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      case 'chemistry': {
        const systemPrompt = 'You are a chemistry expert with deep knowledge across organic, inorganic, physical, and analytical chemistry. Help users understand chemical reactions, molecular structures, chemical principles, laboratory techniques, and real-world applications of chemistry. Provide clear explanations with proper chemical notation when needed.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      case 'math': {
        const systemPrompt = 'You are a mathematics expert skilled in all areas of mathematics from basic arithmetic to advanced topics like calculus, linear algebra, statistics, and discrete mathematics. Help users solve problems, understand mathematical concepts, and see the beauty and applications of mathematics. Provide step-by-step solutions when appropriate.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      case 'accounting': {
        const systemPrompt = 'You are an accounting and finance expert. Help users with financial accounting, managerial accounting, tax preparation, financial analysis, budgeting, auditing, and financial reporting. Provide accurate guidance on accounting principles, standards, and best practices for individuals and businesses.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      case 'analysis': {
        const systemPrompt = 'You are a data analysis expert. Help users analyze data, understand statistics, create visualizations, interpret trends, perform quantitative research, and draw meaningful insights from complex datasets. Guide users through analytical methodologies and statistical reasoning.';
        reply = await getMistralReply(message, systemPrompt);
        break;
      }
      case 'geography': {
        const systemPrompt = 'You are a geography expert. Help users unserstand all things geography in depth jsut like a proffesional';
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
