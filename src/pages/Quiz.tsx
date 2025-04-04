
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';

// Temporary dummy questions for demonstration
const dummyQuestions = [
  {
    id: 1,
    question: 'ما هي المادة التي تنص على أن المتهم بريء حتى تثبت إدانته في القانون الجنائي المغربي؟',
    options: ['المادة 1', 'المادة 3', 'المادة 7', 'المادة 10'],
    correctAnswer: 1,
    explanation: 'تنص المادة 3 من القانون الجنائي المغربي على مبدأ البراءة حتى ثبوت الإدانة.'
  },
  {
    id: 2,
    question: 'متى صدر آخر تعديل على قانون الأسرة المغربي (مدونة الأسرة)؟',
    options: ['2004', '2010', '2016', '2020'],
    correctAnswer: 0,
    explanation: 'صدر آخر تعديل شامل على مدونة الأسرة المغربية في عام 2004.'
  },
  {
    id: 3,
    question: 'ما هو النظام القانوني للعقود في القانون المدني المغربي؟',
    options: ['قانون الالتزامات والعقود', 'القانون التجاري', 'مدونة الأسرة', 'القانون الإداري'],
    correctAnswer: 0,
    explanation: 'ينظم قانون الالتزامات والعقود المغربي العقود في القانون المدني.'
  },
];

const Quiz = () => {
  const { categoryId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    if (selectedAnswer === dummyQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < dummyQuestions.length - 1) {
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

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">النتيجة النهائية</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-4xl font-bold mb-4">{score} / {dummyQuestions.length}</p>
            <p className="text-gray-600 dark:text-gray-300">
              أحسنت! لقد أكملت اختبار {categoryNames[categoryId || '']}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4">
            <Link to="/">
              <Button>العودة للصفحة الرئيسية</Button>
            </Link>
            <Link to={`/quiz/${categoryId}`}>
              <Button variant="outline">إعادة المحاولة</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestionData = dummyQuestions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
            {categoryNames[categoryId || '']}
          </h1>
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
              السؤال {currentQuestion + 1} من {dummyQuestions.length}
            </span>
            <Progress value={((currentQuestion + 1) / dummyQuestions.length) * 100} className="h-2 flex-grow" />
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
              {currentQuestionData.options.map((option, index) => (
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
                {currentQuestion < dummyQuestions.length - 1 ? 'السؤال التالي' : 'إنهاء الاختبار'}
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
