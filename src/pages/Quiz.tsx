
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import quizData from '../data/quizQuestions';

const Quiz = () => {
  const { categoryId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (categoryId && quizData[categoryId]) {
      setQuestions(quizData[categoryId]);
    }
  }, [categoryId]);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const categoryNames: { [key: string]: string } = {
    'criminal': 'القانون الجنائي',
    'civil': 'القانون المدني',
    'administrative': 'القانون الإداري',
    'family': 'قانون الأسرة',
    'commercial': 'القانون التجاري',
    'labor': 'قانون الشغل',
    'constitutional': 'القانون الدستوري',
  };

  if (!categoryId || !quizData[categoryId] || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">خطأ في تحميل الاختبار</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 dark:text-gray-300">
              لم نتمكن من العثور على الاختبار المطلوب
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link to="/">
              <Button>العودة للصفحة الرئيسية</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">النتيجة النهائية</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold mb-4">{score} / {questions.length}</p>
            <p className="text-gray-600 dark:text-gray-300">
              أحسنت! لقد أكملت اختبار {categoryNames[categoryId || '']}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Link to="/">
              <Button>العودة للصفحة الرئيسية</Button>
            </Link>
            <Link to={`/quiz/${categoryId}`}>
              <Button variant="outline" onClick={() => window.location.reload()}>إعادة المحاولة</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
            {categoryNames[categoryId || '']}
          </h1>
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
              السؤال {currentQuestion + 1} من {questions.length}
            </span>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2 flex-grow" />
          </div>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-right">
              {currentQuestionData.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              className="space-y-4 text-right" 
              value={selectedAnswer?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              {currentQuestionData.options.map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 justify-end space-x-reverse">
                  <label htmlFor={`option-${index}`} className="text-lg">{option}</label>
                  <RadioGroupItem 
                    value={index.toString()} 
                    id={`option-${index}`} 
                    disabled={showExplanation}
                    className={showExplanation 
                      ? index === currentQuestionData.correctAnswer 
                        ? "border-green-500 text-green-500" 
                        : index === selectedAnswer 
                          ? "border-red-500 text-red-500" 
                          : ""
                      : ""
                    }
                  />
                </div>
              ))}
            </RadioGroup>

            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-md text-right">
                <h3 className="font-bold mb-2">الشرح:</h3>
                <p>{currentQuestionData.explanation}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {!showExplanation ? (
              <Button onClick={handleCheckAnswer} disabled={selectedAnswer === null}>
                تحقق من الإجابة
              </Button>
            ) : (
              <Button onClick={handleNextQuestion}>
                {currentQuestion < questions.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link to="/">العودة للرئيسية</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
