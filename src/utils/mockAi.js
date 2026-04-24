// Pattern matching basic wellness responses
const responses = [
  {
    keywords: ['sad', 'depressed', 'down', 'unhappy', 'bad'],
    responses: [
      "I'm so sorry you're feeling this way. Remember that it's okay not to be okay. Have you tried taking a few deep breaths, or maybe reached out to a friend?",
      "That sounds really tough. Please be gentle with yourself today. Would you like to try a simple grounding exercise?",
      "I hear you. Feelings like this can be heavy. Sometimes taking a short walk outside or just resting can help reset your mind."
    ]
  },
  {
    keywords: ['stressed', 'anxious', 'overwhelmed', 'panic', 'busy'],
    responses: [
      "Take a deep breath with me: Inhale for 4 seconds, hold for 4, exhale for 6. You are taking on a lot, and it's okay to pause.",
      "Stress can take a real toll on your body. Can you carve out 10 minutes today just for yourself to disconnect?",
      "It sounds like you have a lot on your plate. Let's break it down into smaller, manageable steps. What's the very next thing you can do?"
    ]
  },
  {
    keywords: ['happy', 'good', 'great', 'awesome', 'excellent', 'amazing'],
    responses: [
      "I'm so glad to hear that! What's making you feel so good today?",
      "That is wonderful! Remember to hold onto this feeling and maybe write down what made today so special.",
      "Love that energy! How are you going to carry this positivity through the rest of your week?"
    ]
  },
  {
    keywords: ['tired', 'exhausted', 'sleep', 'sleepy', 'insomnia'],
    responses: [
      "Rest is just as important as productivity. Are you getting enough quality sleep lately?",
      "Listen to your body. Sometimes the most productive thing you can do is go to bed early. Try setting a calming night routine.",
      "If you're having trouble sleeping, try avoiding screens for an hour before bed and reading a book instead. You deserve to rest."
    ]
  },
  {
    keywords: ['goal', 'habit', 'diet', 'exercise', 'workout', 'eating'],
    responses: [
      "Building healthy habits is a marathon, not a sprint. Focus on 1% improvements every day.",
      "Consistency is key when it comes to wellness. Are you making sure your goals are realistic and attainable?",
      "Make sure you're finding joy in the movement or dietary changes you make, otherwise it won't be sustainable."
    ]
  },
  {
    keywords: ['headache', 'migraine', 'dizzy'],
    responses: [
      "For a headache or dizziness, rest in a quiet, dark room. Stay hydrated and avoid screens. If it's the worst headache of your life or accompanied by confusion, seek emergency care."
    ]
  },
  {
    keywords: ['fever', 'temp', 'chills', 'sweat'],
    responses: [
      "A fever is often a sign of infection. Rest and drink plenty of fluids. If it exceeds 103°F (39.4°C) or lasts more than 3 days, please see a healthcare provider."
    ]
  },
  {
    keywords: ['stomach', 'nausea', 'vomit', 'cramp', 'pain'],
    responses: [
      "For abdominal discomfort, try sipping clear liquids and stick to bland foods. Seek medical attention for severe, localized pain or persistent vomiting."
    ]
  },
  {
    keywords: ['cough', 'cold', 'flu', 'sore throat', 'congestion'],
    responses: [
      "For cold and flu symptoms, rest and hydration are vital. If you experience difficulty breathing, seek help immediately."
    ]
  }
];

const defaultResponses = [
  "That's very interesting. Tell me more about how that impacts your daily life and wellness.",
  "I'm here for you. Could you elaborate on that?",
  "Remember to practice self-care today. What's something kind you can do for yourself right now?",
  "Hydration check! Have you had enough water today? How are you feeling otherwise?",
  "I understand. Wellness is a journey. How can I best support you with this?"
];

export function generateWellnessResponse(userInput) {
  const inputLower = userInput.toLowerCase();
  
  // Try to match keywords
  for (const category of responses) {
    if (category.keywords.some(keyword => inputLower.includes(keyword))) {
      const possibleResponses = category.responses;
      return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
    }
  }

  // Fallback
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
