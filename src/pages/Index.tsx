
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const legalCategories = [
  { id: 'criminal', name: 'القانون الجنائي', color: 'bg-red-500' },
  { id: 'civil', name: 'القانون المدني', color: 'bg-blue-500' },
  { id: 'administrative', name: 'القانون الإداري', color: 'bg-green-500' },
  { id: 'family', name: 'قانون الأسرة', color: 'bg-purple-500' },
  { id: 'commercial', name: 'القانون التجاري', color: 'bg-yellow-500' },
  { id: 'labor', name: 'قانون الشغل', color: 'bg-orange-500' },
  { id: 'constitutional', name: 'القانون الدستوري', color: 'bg-teal-500' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">اختبار القانون المغربي</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">تطبيق تعليمي تفاعلي لطلبة القانون والمهنيين والمواطنين</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legalCategories.map((category) => (
            <Card key={category.id} className="border-t-4 hover:shadow-lg transition-shadow duration-300" style={{ borderTopColor: category.color.replace('bg-', '') }}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-right">{category.name}</CardTitle>
                <CardDescription className="text-right">30 سؤال متنوع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white text-2xl">?</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to={`/quiz/${category.id}`}>
                  <Button variant="outline">ابدأ الاختبار</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center gap-4">
          <Link to="/daily">
            <Button variant="secondary">سؤال اليوم</Button>
          </Link>
          <Link to="/favorites">
            <Button variant="secondary">المفضلة</Button>
          </Link>
          <Link to="/settings">
            <Button variant="secondary">الإعدادات</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
