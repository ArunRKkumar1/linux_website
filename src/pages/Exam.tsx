import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, FileText } from 'lucide-react';
import { examQuestions } from '@/data/quizData';
import { Progress } from '@/components/ui/progress';

const Exam = () => {
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);

  if (!examStarted) {
    return (
      <div className="min-h-screen flex flex-col bg-terminal-dark">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link to="/" className="text-terminal-green hover:text-terminal-green/80 flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card className="bg-terminal-dark border border-terminal-purple/30">
              <CardHeader>
                <CardTitle className="text-2xl text-terminal-purple">Linux Proficiency Exam</CardTitle>
                <CardDescription className="text-terminal-white/70">
                  Test your comprehensive knowledge of Linux concepts
                </CardDescription>
              </CardHeader>
              <CardContent className="text-terminal-white/80 space-y-4">
                <p>
                  This exam consists of {examQuestions.length} questions covering various Linux topics including:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Linux Fundamentals</li>
                  <li>File Management</li>
                  <li>Permissions</li>
                  <li>Process Management</li>
                  <li>System Monitoring</li>
                  <li>Disk and Storage Management</li>
                </ul>
                <p className="pt-2">
                  You will have unlimited time to complete the exam. Upon completion, you'll receive 
                  a detailed score report and explanations for each answer.
                </p>
                <div className="bg-terminal-dark/50 border border-terminal-purple/20 p-4 rounded-md">
                  <p className="font-semibold text-terminal-purple">Exam Rules:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>You can revisit questions before submitting</li>
                    <li>A score of 70% or higher is considered passing</li>
                    <li>You can retake the exam as many times as you want</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-4">
                <Button 
                  className="bg-terminal-purple text-terminal-white hover:bg-terminal-purple/90"
                  onClick={() => setExamStarted(true)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Begin Exam
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-terminal-dark">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {examSubmitted ? (
          <ExamResults />
        ) : (
          <ExamContent setExamSubmitted={setExamSubmitted} />
        )}
      </main>
      <Footer />
    </div>
  );
};

interface ExamContentProps {
  setExamSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExamContent: React.FC<ExamContentProps> = ({ setExamSubmitted }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(examQuestions.length).fill(null));
  const [timer, setTimer] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState(false);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerStarted) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerStarted]);
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const handleOptionSelect = (optionIndex: number) => {
    if (!timerStarted) {
      setTimerStarted(true);
    }
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };
  
  const handleSubmitExam = () => {
    localStorage.setItem('examAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('examTime', timer.toString());
    setExamSubmitted(true);
  };
  
  const answeredCount = userAnswers.filter(answer => answer !== null).length;
  const question = examQuestions[currentQuestionIndex];
  const selectedOption = userAnswers[currentQuestionIndex];
  
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-grow lg:w-3/4 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-terminal-white">Linux Proficiency Exam</h1>
          <div className="flex items-center gap-4">
            <div className="text-terminal-white/70">
              Question {currentQuestionIndex + 1} of {examQuestions.length}
            </div>
            <div className="text-terminal-purple font-mono text-xl">
              {formatTime(timer)}
            </div>
          </div>
        </div>
        
        <Progress value={(answeredCount / examQuestions.length) * 100} className="h-2 bg-terminal-white/20" />
        
        <Card className="bg-terminal-dark border border-terminal-purple/20">
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
                      ? 'border-terminal-purple bg-terminal-purple/10' 
                      : 'border-terminal-white/20 hover:border-terminal-white/40'
                  }`}
                  onClick={() => handleOptionSelect(idx)}
                >
                  <p className="text-terminal-white">{option}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              className="border-terminal-white/20 text-terminal-white/70 hover:bg-terminal-white/5"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            {currentQuestionIndex < examQuestions.length - 1 ? (
              <Button 
                className="bg-terminal-purple text-terminal-white hover:bg-terminal-purple/90"
                onClick={handleNextQuestion}
              >
                Next Question
              </Button>
            ) : (
              <Button 
                className="bg-terminal-purple text-terminal-white hover:bg-terminal-purple/90"
                onClick={handleSubmitExam}
                disabled={userAnswers.some(answer => answer === null)}
              >
                Submit Exam
              </Button>
            )}
          </CardFooter>
        </Card>
        
        {currentQuestionIndex === examQuestions.length - 1 && (
          <div className="text-center">
            {userAnswers.some(answer => answer === null) ? (
              <p className="text-terminal-white/70">
                Please answer all questions before submitting the exam.
              </p>
            ) : (
              <Button 
                className="bg-terminal-green text-terminal-dark hover:bg-terminal-green/90 mt-4 px-8"
                onClick={handleSubmitExam}
              >
                <Check className="mr-2 h-4 w-4" />
                Submit Full Exam
              </Button>
            )}
          </div>
        )}
      </div>
      
      <div className="lg:w-1/4">
        <Card className="bg-terminal-dark border border-terminal-purple/20 sticky top-4">
          <CardHeader>
            <CardTitle className="text-terminal-white text-lg">Question Navigator</CardTitle>
            <CardDescription className="text-terminal-white/70">
              {answeredCount} of {examQuestions.length} questions answered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {userAnswers.map((answer, idx) => (
                <div
                  key={idx}
                  className={`
                    h-8 w-8 rounded-md flex items-center justify-center cursor-pointer
                    ${idx === currentQuestionIndex ? 'ring-2 ring-terminal-purple' : ''}
                    ${answer !== null ? 'bg-terminal-purple/40' : 'bg-terminal-white/10'}
                  `}
                  onClick={() => handleJumpToQuestion(idx)}
                >
                  <span className="text-sm text-terminal-white">{idx + 1}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-terminal-purple/20">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3 w-3 bg-terminal-purple/40 rounded"></div>
                <span className="text-xs text-terminal-white/70">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-terminal-white/10 rounded"></div>
                <span className="text-xs text-terminal-white/70">Unanswered</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ExamResults = () => {
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [completionTime, setCompletionTime] = useState<number>(0);
  
  React.useEffect(() => {
    const savedAnswers = localStorage.getItem('examAnswers');
    const savedTime = localStorage.getItem('examTime');
    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers));
    }
    if (savedTime) {
      setCompletionTime(parseInt(savedTime));
    }
  }, []);
  
  const correctAnswers = userAnswers.reduce((count, answer, index) => {
    if (answer === examQuestions[index].correctAnswer) {
      return count + 1;
    }
    return count;
  }, 0);
  
  const score = correctAnswers;
  const totalQuestions = examQuestions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 70;
  
  const handleRetakeExam = () => {
    localStorage.removeItem('examAnswers');
    window.location.reload();
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutes ${remainingSeconds} seconds`;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link to="/" className="text-terminal-green hover:text-terminal-green/80 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      <Card className="bg-terminal-dark border border-terminal-purple/30 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-terminal-purple">Exam Results</CardTitle>
          <CardDescription className="text-terminal-white/70">
            Linux Proficiency Exam
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center pb-6">
            <p className="text-4xl font-bold text-terminal-white mb-2">
              {score} / {totalQuestions}
            </p>
            <p className="text-xl text-terminal-white/70 mb-2">
              {percentage}% - {passed ? 'Passed!' : 'Not Passed'}
            </p>
            <p className="text-terminal-white/60">
              Completion Time: {formatTime(completionTime)}
            </p>
            <div className="mt-4">
              <div className="h-4 w-full bg-terminal-dark border border-terminal-white/20 rounded-full overflow-hidden">
                <div 
                  className={passed ? 'bg-terminal-green' : 'bg-terminal-purple'} 
                  style={{ width: `${percentage}%`, height: '100%' }}
                />
              </div>
              <div className="flex justify-between mt-1 text-xs text-terminal-white/50">
                <span>0%</span>
                <span>70% (Passing)</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-terminal-purple/20">
            {passed ? (
              <div className="text-center space-y-4">
                <p className="text-terminal-green font-semibold text-xl">
                  Congratulations! You've passed the Linux Proficiency Exam.
                </p>
                <p className="text-terminal-white/80">
                  Your score demonstrates a solid understanding of Linux concepts and commands.
                </p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-terminal-purple font-semibold text-xl">
                  Almost there! Keep practicing to improve your Linux skills.
                </p>
                <p className="text-terminal-white/80">
                  Review the topics below and try again. You need 70% to pass.
                </p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              variant="outline" 
              className="border-terminal-purple text-terminal-purple hover:bg-terminal-purple/10"
              onClick={handleRetakeExam}
            >
              Retake Exam
            </Button>
            <Button className="bg-terminal-green text-terminal-dark hover:bg-terminal-green/90">
              <Link to="/practice">Practice More</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <h2 className="text-2xl font-bold text-terminal-white mb-6">Detailed Results</h2>
      
      <div className="space-y-6">
        {examQuestions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === question.correctAnswer;
          
          return (
            <Card 
              key={index} 
              className={`bg-terminal-dark border ${
                isCorrect 
                  ? 'border-terminal-green/30' 
                  : 'border-terminal-purple/30'
              }`}
            >
              <CardHeader>
                <CardTitle className="text-lg text-terminal-white flex items-start gap-2">
                  <span className={isCorrect ? 'text-terminal-green' : 'text-terminal-purple'}>
                    {isCorrect ? '✓' : '✗'}
                  </span>
                  <span>
                    Question {index + 1}: {question.question}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {question.options.map((option, optIdx) => (
                    <div 
                      key={optIdx}
                      className={`
                        p-3 rounded-md border
                        ${optIdx === question.correctAnswer ? 'border-terminal-green bg-terminal-green/10' : ''}
                        ${optIdx === userAnswer && optIdx !== question.correctAnswer ? 'border-terminal-purple bg-terminal-purple/10' : ''}
                        ${optIdx !== userAnswer && optIdx !== question.correctAnswer ? 'border-terminal-white/20' : ''}
                      `}
                    >
                      <p className={`
                        ${optIdx === question.correctAnswer ? 'text-terminal-green' : ''}
                        ${optIdx === userAnswer && optIdx !== question.correctAnswer ? 'text-terminal-purple' : ''}
                        ${optIdx !== userAnswer && optIdx !== question.correctAnswer ? 'text-terminal-white' : ''}
                      `}>
                        {option}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 bg-terminal-dark border border-terminal-white/20 rounded-md">
                  <p className="font-semibold text-terminal-white mb-1">Explanation:</p>
                  <p className="text-terminal-white/80">{question.explanation}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          className="bg-terminal-purple text-terminal-white hover:bg-terminal-purple/90"
          onClick={handleRetakeExam}
        >
          Retake Exam
        </Button>
      </div>
    </div>
  );
};

export default Exam;
