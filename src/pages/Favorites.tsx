
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bookmark, BookmarkX } from 'lucide-react';

// Sample favorites data for demonstration
const sampleFavorites = [
  {
    id: 'fav-1',
    question: 'ما هي المدة القانونية للحراسة النظرية في القانون الجنائي المغربي؟',
    category: 'القانون الجنائي',
    answer: '48 ساعة قابلة للتمديد مرة واحدة',
  },
  {
    id: 'fav-2',
    question: 'متى صدر آخر تعديل على قانون الأسرة المغربي (مدونة الأسرة)؟',
    category: 'قانون الأسرة',
    answer: '2004',
  },
  {
    id: 'fav-3',
    question: 'ما هو النظام القانوني للعقود في القانون المدني المغربي؟',
    category: 'القانون المدني',
    answer: 'قانون الالتزامات والعقود',
  },
];

const Favorites = () => {
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">الأسئلة المفضلة</h1>
          <div className="w-10"></div> {/* Empty div for flex balance */}
        </div>

        {sampleFavorites.length > 0 ? (
          <div className="space-y-4">
            {sampleFavorites.map((favorite) => (
              <Card key={favorite.id} className="hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Button size="sm" variant="ghost" className="p-1 h-auto">
                      <BookmarkX className="h-5 w-5 text-red-500" />
                    </Button>
                    <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-3 rounded-full text-sm">
                      {favorite.category}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-right">
                  <h3 className="font-semibold text-lg mb-2">{favorite.question}</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">الإجابة: </span>
                      {favorite.answer}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
            <Bookmark className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">لا توجد أسئلة مفضلة</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              يمكنك إضافة الأسئلة إلى المفضلة أثناء حل الاختبارات
            </p>
            <Button asChild>
              <Link to="/">استكشف الاختبارات</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
