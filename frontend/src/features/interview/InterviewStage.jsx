import { useInterviewStore } from '@/store/useInterviewStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InterviewStage() {
  const { questions, currentQuestionIndex, nextQuestion } = useInterviewStore();
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) return <div>Loading questions...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-blue-400">Question {currentQuestionIndex + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xl text-white font-medium">{currentQuestion.text}</p>
          
          <div className="flex justify-between items-center mt-8">
            <div className="text-sm text-zinc-500">Press M to record answer</div>
            <Button onClick={nextQuestion} variant="outline">
              {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}