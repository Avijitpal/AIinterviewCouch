import JDInputForm from './features/research/JDInputForm';
import InterviewStage from './features/interview/InterviewStage';
import { useInterviewStore } from './store/useInterviewStore';

function App() {
  const isInterviewStarted = useInterviewStore((state) => state.isInterviewStarted);

  return (
    <div className="dark min-h-screen bg-background text-foreground p-4">
      {!isInterviewStarted ? <JDInputForm /> : <InterviewStage />}
    </div>
  );
}

export default App;