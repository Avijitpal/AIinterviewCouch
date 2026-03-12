const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { generateQuestions } = require('./services/gemini.service');
const app = express();
app.use(cors()); // Allows your React app to talk to this server
app.use(express.json());

app.post('/api/interview/analyze', async (req, res) => {
  try {
    const { role, company, jd } = req.body;
    
    // Call our AI Service
    const questions = await generateQuestions(role, company, jd);
    
    res.status(200).json({ 
      message: "Questions generated successfully!",
      questions: questions 
    });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));