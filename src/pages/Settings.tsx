
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Moon, Sun, ArrowLeft } from 'lucide-react';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user prefers dark mode or has it saved
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="ml-2">
              <ArrowLeft className="h-4 w-4 ml-1" />
              <span>العودة</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">الإعدادات</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-right">إعدادات المظهر</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                />
                <Label htmlFor="dark-mode" className="flex items-center">
                  {isDarkMode ? (
                    <Moon className="h-4 w-4 ml-2" />
                  ) : (
                    <Sun className="h-4 w-4 ml-2" />
                  )}
                  الوضع المظلم
                </Label>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800' : 'bg-blue-500'}`}>
                {isDarkMode ? (
                  <Moon className="h-5 w-5 text-white" />
                ) : (
                  <Sun className="h-5 w-5 text-white" />
                )}
              </div>
            </div>

            <Separator />

            <div className="text-right">
              <h3 className="font-medium mb-2">تفضيلات المحتوى</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Switch id="daily-notification" />
                  <Label htmlFor="daily-notification">تنبيهات سؤال اليوم</Label>
                </div>
                <div className="flex items-center justify-between">
                  <Switch id="sound-effects" />
                  <Label htmlFor="sound-effects">المؤثرات الصوتية</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
