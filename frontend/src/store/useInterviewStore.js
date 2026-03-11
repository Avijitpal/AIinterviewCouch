import { create } from 'zustand';

export const useInterviewStore = create((set) => ({
  // --- Interview Metadata ---
  jobDescription: '',
  role: '',
  company: '',
  
  // --- Interview State ---
  questions: [], // Array of { id, text, type: 'technical' | 'behavioral' }
  currentQuestionIndex: 0,
  transcripts: {}, // Stores user answers: { questionId: "User's spoken answer" }
  isInterviewStarted: false,
  isFinished: false,

  // --- Actions ---
  setJobInfo: (info) => set({ 
    jobDescription: info.jd, 
    role: info.role, 
    company: info.company 
  }),

  setQuestions: (questions) => set({ questions, isInterviewStarted: true }),

  nextQuestion: () => set((state) => ({ 
    currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1) 
  })),

  saveTranscript: (questionId, text) => set((state) => ({
    transcripts: { ...state.transcripts, [questionId]: text }
  })),

  endInterview: () => set({ isFinished: true, isInterviewStarted: false }),
  
  resetInterview: () => set({
    jobDescription: '',
    questions: [],
    currentQuestionIndex: 0,
    transcripts: {},
    isInterviewStarted: false,
    isFinished: false
  })
}));