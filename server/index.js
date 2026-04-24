import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simple .env loader for ES modules without external dependencies
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) process.env[key.trim()] = value.join('=').trim();
  });
}

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint for frontend to verify connection
app.get('/api/health', (req, res) => {
  res.json({ status: 'connected', timestamp: new Date() });
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  const lastUserMessage = messages.slice().reverse().find(m => m.sender === 'user');
  const promptText = lastUserMessage ? lastUserMessage.text.trim() : "hello";

  console.log("Triage Request:", promptText);

  // Try Groq API first
  if (process.env.GROQ_API_KEY) {
    try {
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: "You are MedAssist, a professional clinical triage AI. Your goal is to analyze symptoms and provide safe, accurate medical guidance. Always include a disclaimer that you are an AI and not a doctor. If symptoms sound life-threatening, advise immediate emergency care."
            },
            ...messages.map(m => ({
               role: m.sender === 'bot' ? 'assistant' : 'user',
               content: m.text
            }))
          ],
          temperature: 0.5,
          max_tokens: 500
        })
      });

      const data = await groqResponse.json();
      if (data.choices && data.choices[0]) {
        return res.json({ text: data.choices[0].message.content });
      }
    } catch (error) {
      console.error("Groq API Error, falling back to local rules:", error);
    }
  }

  // Fallback Mock Logic (Clinical Triage) - Used if Groq fails or No API Key
  let responseText = "I understand you're concerned about your symptoms. Could you provide more details? For most mild symptoms, rest and hydration are recommended. Please consult a doctor for persistent issues.";
  
  const rules = [
    { 
      keywords: ["headache", "migraine", "dizzy"], 
      response: "For a headache or dizziness, rest in a quiet, dark room. Stay hydrated and avoid screens. If it's the worst headache of your life or accompanied by confusion or vision changes, seek emergency care immediately."
    },
    { 
      keywords: ["fever", "temp", "chills", "sweat"], 
      response: "A fever is often a sign of infection. Rest and drink plenty of fluids. You can monitor your temperature using a thermometer. If it exceeds 103°F (39.4°C) or lasts more than 3 days, please see a healthcare provider."
    },
    { 
      keywords: ["stomach", "nausea", "vomit", "cramp", "pain"], 
      response: "For abdominal discomfort or nausea, try sipping clear liquids and stick to bland foods (the BRAT diet). Avoid heavy or spicy foods. Seek medical attention for severe, localized pain or persistent vomiting."
    },
    { 
      keywords: ["cough", "cold", "flu", "sore throat", "congestion"], 
      response: "For cold and flu symptoms, rest and hydration are vital. Humidifiers and warm liquids can help soothe a sore throat or congestion. If you experience difficulty breathing, seek help immediately."
    },
    { 
      keywords: ["hello", "hi", "hey", "help", "greet"], 
      response: "Hello! I am the MedAssist triage AI. I can help provide general guidance based on your symptoms. How are you feeling today?"
    }
  ];

  const searchPrompt = promptText.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some(k => searchPrompt.includes(k))) {
      responseText = rule.response;
      break;
    }
  }

  // Simulate network delay for realism if we reached fallback
  setTimeout(() => {
    res.json({ text: responseText + "\n\n*(Note: Running in fallback mode. Disclaimer: This is AI-generated guidance and not a substitute for professional medical advice)*" });
  }, 1000);
});

const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0'; // Bind to all interfaces for better reliability

app.listen(PORT, HOST, () => {
  console.log(`Healthcare Server listening on http://${HOST}:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please check for other running instances.`);
  } else {
    console.error('Server startup error:', err);
  }
});
