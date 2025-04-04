
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Gavel, Scale, Users, Building2, Briefcase, Landmark } from 'lucide-react';

const legalCategories = [
  { 
    id: 'criminal', 
    name: 'القانون الجنائي', 
    color: 'bg-law-crimson',
    hoverColor: 'hover:bg-law-crimson/90',
    icon: Gavel,
    questions: 30
  },
  { 
    id: 'civil', 
    name: 'القانون المدني', 
    color: 'bg-law-navy',
    hoverColor: 'hover:bg-law-navy/90',
    icon: Scale,
    questions: 30
  },
  { 
    id: 'administrative', 
    name: 'القانون الإداري', 
    color: 'bg-law-forest',
    hoverColor: 'hover:bg-law-forest/90',
    icon: Landmark,
    questions: 30
  },
  { 
    id: 'family', 
    name: 'قانون الأسرة', 
    color: 'bg-law-royal',
    hoverColor: 'hover:bg-law-royal/90',
    icon: Users,
    questions: 30
  },
  { 
    id: 'commercial', 
    name: 'القانون التجاري', 
    color: 'bg-law-gold',
    hoverColor: 'hover:bg-law-gold/90',
    icon: Building2,
    questions: 30
  },
  { 
    id: 'labor', 
    name: 'قانون الشغل', 
    color: 'bg-law-burgundy',
    hoverColor: 'hover:bg-law-burgundy/90',
    icon: Briefcase,
    questions: 30
  },
  { 
    id: 'constitutional', 
    name: 'القانون الدستوري', 
    color: 'bg-law-charcoal',
    hoverColor: 'hover:bg-law-charcoal/90',
    icon: BookOpen,
    questions: 30
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-parchment dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 text-law-navy dark:text-white">اختبار القانون المغربي</h1>
          <p className="text-xl text-law-slate dark:text-gray-300">تطبيق تعليمي تفاعلي لطلبة القانون والمهنيين والمواطنين</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {legalCategories.map((category) => (
            <Card key={category.id} className="border-t-4 shadow-gavel hover:shadow-lg transition-shadow duration-300 border-law-navy" style={{ borderTopColor: `var(--tw-${category.color.replace('bg-', '')})` }}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-right">{category.name}</CardTitle>
                <CardDescription className="text-right">{category.questions} سؤال متنوع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mx-auto mb-4`}>
                  <category.icon className="text-white h-8 w-8" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link to={`/quiz/${category.id}`}>
                  <Button variant="outline" className="border-law-navy text-law-navy hover:bg-law-navy/10 dark:border-law-gold dark:text-law-gold dark:hover:bg-law-gold/10">ابدأ الاختبار</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center gap-4">
          <Link to="/daily">
            <Button variant="secondary" className="bg-law-gold text-law-navy hover:bg-law-gold/80">سؤال اليوم</Button>
          </Link>
          <Link to="/favorites">
            <Button variant="secondary" className="bg-law-gold text-law-navy hover:bg-law-gold/80">المفضلة</Button>
          </Link>
          <Link to="/settings">
            <Button variant="secondary" className="bg-law-gold text-law-navy hover:bg-law-gold/80">الإعدادات</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
