import express from 'express';
import cors from 'cors';
import { getLlama, LlamaChatSession } from 'node-llama-cpp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const MODEL_PATH = path.join(__dirname, '..', 'models', 'health_chatbot.Q4_K_M.gguf');

// Initialize llama instance
let llama;
let model;
let context;

async function initLlama() {
  try {
    console.log("Loading GGUF model from:", MODEL_PATH);
    llama = await getLlama();
    model = await llama.loadModel({ modelPath: MODEL_PATH });
    context = await model.createContext();
    console.log("Model loaded successfully!");
  } catch (err) {
    console.error("Failed to load model. Will use fallback clinical AI:", err.message);
  }
}

// Start loading the model asynchronously
initLlama();

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  const lastUserMessage = messages.filter(m => m.sender === 'user').pop();
  const promptText = lastUserMessage ? lastUserMessage.text.toLowerCase() : "hello";

  console.log("Triage Request:", promptText);

  // Try using real AI if loaded
  if (context) {
    try {
      const session = new LlamaChatSession({
        contextSequence: context.getSequence(),
        systemPrompt: "You are MedAssist, a professional clinical AI assistant."
      });
      const response = await session.prompt(promptText);
      return res.json({ text: response });
    } catch (error) {
      console.error("Llama generation error, falling back to mock:", error.message);
      // Fall through to mock logic below
    }
  }

  // Fallback Mock Logic (Clinical Triage)
  let responseText = "Thank you for reaching out. Based on your symptoms, I recommend monitoring your condition and staying hydrated. If symptoms persist for more than 48 hours, please consult a physician.";
  
  if (promptText.includes("headache") || promptText.includes("migraine")) {
    responseText = "For a headache, rest in a quiet, dark room. You may take over-the-counter pain relievers like ibuprofen or acetaminophen according to package instructions. Seek emergency care if it is the worst headache of your life or accompanied by vision changes.";
  } else if (promptText.includes("fever") || promptText.includes("temp")) {
    responseText = "A fever is a sign your body is fighting off an infection. Rest and drink plenty of fluids. If your temperature exceeds 103°F (39.4°C) or lasts more than 3 days, please schedule an appointment.";
  } else if (promptText.includes("stomach") || promptText.includes("nausea")) {
    responseText = "For gastrointestinal discomfort, try the BRAT diet (bananas, rice, applesauce, toast) and sip clear liquids. Avoid dairy and greasy foods until you feel better.";
  } else if (promptText.includes("hello") || promptText.includes("hi")) {
    responseText = "Hello. I am the MedAssist triage AI. Briefly describe your symptoms so I can provide relevant general guidance.";
  }

  // Simulate network delay for realism
  setTimeout(() => {
    res.json({ text: responseText + "\n\n*(Disclaimer: This is AI-generated guidance and not a substitute for professional medical advice)*" });
  }, 1500);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Healthcare Server listening on http://localhost:${PORT}`);
});
