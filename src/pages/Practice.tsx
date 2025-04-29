
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, ListCheck } from 'lucide-react';
import { quizTopics } from '@/data/quizData';

const Practice = () => {
  const { topicId } = useParams();
  
  // If no specific topic is selected, show the list of topics
  if (!topicId) {
    return (
      <div className="min-h-screen flex flex-col bg-terminal-dark">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link to="/" className="text-terminal-green hover:text-terminal-green/80 flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-terminal-white mt-4 mb-6">Practice Quizzes</h1>
            <p className="text-terminal-white/80 mb-8">
              Select a topic below to start practicing with quizzes that test your knowledge on specific Linux concepts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizTopics.map((topic) => (
              <Card key={topic.id} className="bg-terminal-dark border border-terminal-green/20 hover:border-terminal-green/40 transition-colors">
                <CardHeader>
                  <CardTitle className="text-terminal-green">{topic.title}</CardTitle>
                  <CardDescription className="text-terminal-white/70">
                    {topic.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-terminal-white/60 mb-4">
                    {topic.questions.length} questions available
                  </p>
                  <Button variant="outline" className="w-full border-terminal-green text-terminal-green hover:bg-terminal-green/10">
                    <Link to={`/practice/${topic.id}`} className="w-full flex items-center justify-center">
                      <ListCheck className="mr-2 h-4 w-4" />
                      Start Quiz
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // If a topic is selected, redirect to the quiz
  return (
    <div className="min-h-screen flex flex-col bg-terminal-dark">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/practice" className="text-terminal-green hover:text-terminal-green/80 flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Topics
          </Link>
        </div>
        
        <Quiz topicId={topicId} />
      </main>
      <Footer />
    </div>
  );
};

interface QuizProps {
  topicId: string;
}

const Quiz: React.FC<QuizProps> = ({ topicId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [showResult, setShowResult] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [answers, setAnswers] = React.useState<number[]>([]);
  
  const topic = quizTopics.find(t => t.id === topicId);
  
  if (!topic) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-terminal-red mb-4">Topic Not Found</h2>
        <p className="text-terminal-white/80 mb-6">The requested topic does not exist.</p>
        <Button className="bg-terminal-green text-terminal-dark hover:bg-terminal-green/90">
          <Link to="/practice">Return to Practice</Link>
        </Button>
      </div>
    );
  }
  
  const question = topic.questions[currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };
  
  const handleNextQuestion = () => {
    // Update score
    if (selectedOption === question.correctAnswer) {
      setScore(score + 1);
    }
    
    // Save answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption!;
    setAnswers(newAnswers);
    
    // Move to next question or end quiz
    if (currentQuestionIndex < topic.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };
  
  const handleCheckAnswer = () => {
    setShowResult(true);
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };
  
  // Show final quiz results
  if (showResult && currentQuestionIndex === topic.questions.length - 1) {
    const finalScore = score + (selectedOption === question.correctAnswer ? 1 : 0);
    const percentage = Math.round((finalScore / topic.questions.length) * 100);
    
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-terminal-white mb-6">{topic.title} - Results</h2>
        
        <Card className="bg-terminal-dark border border-terminal-green/20 mb-8">
          <CardHeader>
            <CardTitle className="text-terminal-green">Quiz Complete!</CardTitle>
            <CardDescription className="text-terminal-white/70">
              You scored {finalScore} out of {topic.questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="h-4 w-full bg-terminal-dark border border-terminal-green/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${percentage >= 70 ? 'bg-terminal-green' : 'bg-terminal-purple'}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <p className="mt-2 text-right text-terminal-white/70">{percentage}%</p>
            </div>
            
            <div className="mt-6 text-center space-y-4">
              <p className="text-terminal-white/80">
                {percentage >= 70
                  ? "Great job! You've demonstrated a good understanding of this topic."
                  : "Keep practicing! Review the topic and try again to improve your score."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  variant="outline" 
                  className="border-terminal-green text-terminal-green hover:bg-terminal-green/10"
                  onClick={handleRestartQuiz}
                >
                  Restart Quiz
                </Button>
                <Button className="bg-terminal-green text-terminal-dark hover:bg-terminal-green/90">
                  <Link to="/practice">Try Another Topic</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-terminal-white mb-6">{topic.title} - Question {currentQuestionIndex + 1}/{topic.questions.length}</h2>
      
      <Card className="bg-terminal-dark border border-terminal-green/20 mb-8">
        <CardHeader>
          <CardTitle className="text-terminal-white">{question.question}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-md border cursor-pointer transition-colors ${
                  selectedOption === idx 
                    ? 'border-terminal-green/80 bg-terminal-green/10' 
                    : 'border-terminal-white/20 hover:border-terminal-white/40'
                }`}
                onClick={() => !showResult && handleOptionSelect(idx)}
              >
                <p className="text-terminal-white">{option}</p>
              </div>
            ))}
          </div>
          
          {showResult && (
            <div className="mt-6 p-4 border border-terminal-green/20 rounded-md bg-terminal-green/5">
              <p className={`font-semibold ${selectedOption === question.correctAnswer ? 'text-terminal-green' : 'text-terminal-purple'}`}>
                {selectedOption === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect!'}
              </p>
              <p className="text-terminal-white mt-2">
                {question.explanation}
              </p>
            </div>
          )}
          
          <div className="mt-6 flex justify-between">
            <div>
              <p className="text-terminal-white/60">Score: {score}/{currentQuestionIndex}</p>
            </div>
            <div>
              {!showResult ? (
                <Button 
                  className="bg-terminal-green text-terminal-dark hover:bg-terminal-green/90"
                  onClick={handleCheckAnswer}
                  disabled={selectedOption === null}
                >
                  Check Answer
                </Button>
              ) : (
                <Button 
                  className="bg-terminal-purple text-terminal-white hover:bg-terminal-purple/90"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < topic.questions.length - 1 ? 'Next Question' : 'See Results'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Practice;
