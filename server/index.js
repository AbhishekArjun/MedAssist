import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  const lastUserMessage = messages.slice().reverse().find(m => m.sender === 'user');
  const promptText = lastUserMessage ? lastUserMessage.text.toLowerCase().trim() : "hello";

  console.log("Triage Request:", promptText);

  // Fallback Mock Logic (Clinical Triage)
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

  for (const rule of rules) {
    if (rule.keywords.some(k => promptText.includes(k))) {
      responseText = rule.response;
      break;
    }
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
