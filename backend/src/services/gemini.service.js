const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateQuestions = async (role, company, jd) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Generate 5 technical interview questions for a ${role} at ${company} based on: ${jd}. Return ONLY JSON: [{"id": 1, "text": "..."}]`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("⚠️ AI Quota Hit or Error. Using Fallback Questions.");
    
    // Fallback data so your app keeps working!
    return [
      { id: 1, text: `Explain the core responsibilities of a ${role} at a company like ${company}.` },
      { id: 2, text: "How do you handle state management in a large-scale React application?" },
      { id: 3, text: "What is your approach to debugging complex production issues?" },
      { id: 4, text: "Explain how you optimize the performance of a MERN stack application." },
      { id: 5, text: "Describe a time you had to learn a new technology quickly for a project." }
    ];
  }
};

module.exports = { generateQuestions };