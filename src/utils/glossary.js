export const medicalGlossary = {
  "triage": "The process of determining the priority of patients' treatments based on the severity of their condition.",
  "hypertension": "A condition in which the force of the blood against the artery walls is too high (High Blood Pressure).",
  "arrhythmia": "A condition in which the heart beats with an irregular or abnormal rhythm.",
  "diabetes": "A disease that occurs when your blood glucose, also called blood sugar, is too high.",
  "migraine": "A recurrent throbbing headache that typically affects one side of the head and is often accompanied by nausea.",
  "dehydration": "A harmful reduction in the amount of water in the body.",
  "inflammation": "The body's process of fighting against things that harm it, such as infections, injuries, and toxins.",
  "febrile": "Having or showing the symptoms of a fever.",
  "bronchitis": "Inflammation of the mucous membrane in the bronchial tubes.",
  "prescription": "An instruction written by a medical practitioner that authorizes a patient to even provided a medicine or treatment."
};

export const parseMedicalTerms = (text) => {
  if (!text) return text;
  
  let parts = [text];
  
  Object.keys(medicalGlossary).forEach(term => {
    const newParts = [];
    parts.forEach(part => {
      if (typeof part !== 'string') {
        newParts.push(part);
        return;
      }
      
      const regex = new RegExp(`(\\b${term}\\b)`, 'gi');
      const split = part.split(regex);
      
      split.forEach((s, i) => {
        if (s.toLowerCase() === term.toLowerCase()) {
          newParts.push({ term: s, definition: medicalGlossary[term] });
        } else if (s !== "") {
          newParts.push(s);
        }
      });
    });
    parts = newParts;
  });
  
  return parts;
};
