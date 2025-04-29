import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TerminalText from '@/components/TerminalText';
import CommandsGuide from '@/components/CommandsGuide';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ListCheck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { quizTopics } from '@/data/quizData';

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-terminal-dark">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="max-w-4xl mx-auto bg-terminal-dark border border-terminal-green/20 rounded-lg p-6 shadow-lg shadow-terminal-green/5">
            {!introComplete ? (
              <TerminalText 
                text="Welcome to the Ultimate Linux Voyager Guide - Your interactive learning platform for mastering Linux." 
                onComplete={() => setIntroComplete(true)}
              />
            ) : (
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-terminal-green">
                  Ultimate Linux Guide
                </h1>
                <p className="text-terminal-white/80">
                  Master Linux with our comprehensive guide, interactive quizzes, and practice exams.
                  Test your knowledge on various Linux topics and prepare for certification exams.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button className="bg-terminal-green text-terminal-dark hover:bg-terminal-green/90">
                    <Link to="/practice" className="flex items-center">
                      <ListCheck className="mr-2 h-4 w-4" />
                      Start Practice
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-terminal-green text-terminal-green hover:bg-terminal-green/10">
                    <Link to="/exam" className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Take Exam
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        <CommandsGuide />

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-terminal-green mb-6">Available Topics</h2>
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
                      <BookOpen className="mr-2 h-4 w-4" />
                      Study Topic
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <div className="bg-terminal-dark border border-terminal-purple/20 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-terminal-purple mb-4">Ready to Test Your Skills?</h2>
            <p className="text-terminal-white/80 mb-6">
              Challenge yourself with our comprehensive Linux practice exam. Test your knowledge across all topics covered in the guide.
            </p>
            <Button className="bg-terminal-purple text-terminal-white hover:bg-terminal-purple/90">
              <Link to="/exam" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Start Full Exam
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
