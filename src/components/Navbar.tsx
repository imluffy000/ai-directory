import { useState, useEffect } from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion } from 'motion/react';

const tabs = ['Explore', 'Categories', 'Trending', 'Blog'];

export function Navbar() {
  const [activeTab, setActiveTab] = useState('Explore');
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 bg-gray-50/80 dark:bg-gray-950/80 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? 'border-b border-gray-200 dark:border-gray-800 shadow-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">AICurate</span>
          </div>

          {/* Center Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-gray-900 rounded-full p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-6 py-2 text-sm font-medium transition-colors"
              >
                <span className={`relative z-10 ${
                  activeTab === tab 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {tab}
                </span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
           
          </div>
        </div>
      </div>
    </nav>
  );
}
