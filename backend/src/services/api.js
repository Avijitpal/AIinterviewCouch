import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
});

const startInterview = async (jobData) => {
  try {
    const response = await api.post('/interview/analyze', jobData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Exporting it clearly at the bottom
export { startInterview };