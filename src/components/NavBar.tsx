
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Heart, Settings } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NavBar = () => {
  return (
    <div className="w-full bg-law-navy/90 dark:bg-law-navy py-3 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-law-gold text-lg font-bold">
          اختبار القانون المغربي
        </Link>
        
        <NavigationMenu dir="rtl">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link to="/daily">
                <Button variant="ghost" className="text-law-gold hover:text-white hover:bg-law-navy/50">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>سؤال اليوم</span>
                </Button>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/favorites">
                <Button variant="ghost" className="text-law-gold hover:text-white hover:bg-law-navy/50">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>المفضلة</span>
                </Button>
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link to="/settings">
                <Button variant="ghost" className="text-law-gold hover:text-white hover:bg-law-navy/50">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>الإعدادات</span>
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default NavBar;
