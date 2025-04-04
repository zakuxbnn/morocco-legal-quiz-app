
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, Calendar } from 'lucide-react';

// For demonstration, we'll use a fixed question
const dailyQuestion = {
  id: 'daily-1',
  date: new Date().toLocaleDateString('ar-MA'),
  question: 'ما هي المدة القانونية للحراسة النظرية في القانون الجنائي المغربي؟',
  options: [
    '24 ساعة قابلة للتمديد مرة واحدة',
    '48 ساعة قابلة للتمديد مرة واحدة',
    '72 ساعة قابلة للتمديد مرة واحدة',
    '96 ساعة قابلة للتمديد مرة واحدة'
  ],
  correctAnswer: 1,
  explanation: 'حسب قانون المسطرة الجنائية المغربي، فإن مدة الحراسة النظرية هي 48 ساعة قابلة للتمديد مرة واحدة بإذن من النيابة العامة.',
  category: 'القانون الجنائي'
};

const DailyQuestion = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    setIsCorrect(selectedAnswer === dailyQuestion.correctAnswer);
    setShowExplanation(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 ml-1" />
              <span>العودة</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">سؤال اليوم</h1>
          <div className="w-10"></div> {/* Empty div for flex balance */}
        </div>

        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 ml-2" />
              <span>{dailyQuestion.date}</span>
            </div>
            <CardTitle className="text-xl">
              {dailyQuestion.question}
            </CardTitle>
            <div className="mt-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-3 rounded-full text-sm inline-block">
              {dailyQuestion.category}
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              className="space-y-4 text-right" 
              value={selectedAnswer?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              {dailyQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 justify-end space-x-reverse">
                  <label htmlFor={`daily-option-${index}`} className="text-lg">{option}</label>
                  <RadioGroupItem 
                    value={index.toString()} 
                    id={`daily-option-${index}`} 
                    disabled={showExplanation}
                    className={showExplanation 
                      ? index === dailyQuestion.correctAnswer 
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
              <div className={`mt-6 p-4 rounded-md text-right ${isCorrect ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900'}`}>
                <h3 className="font-bold mb-2">
                  {isCorrect ? 'أحسنت! إجابة صحيحة.' : 'للأسف، إجابة خاطئة.'}
                </h3>
                <p>{dailyQuestion.explanation}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            {!showExplanation ? (
              <Button onClick={handleCheckAnswer} disabled={selectedAnswer === null}>
                تحقق من الإجابة
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/">العودة للرئيسية</Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DailyQuestion;
