import { Search } from 'lucide-react';
import { useState } from 'react';

export function Hero() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Discover the Best AI Tools for Every Use Case
        </h1>
        
        {/* Subheading */}
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          A curated directory of premium AI tools for designers, developers, and creators. 
          Find the perfect AI solution for your workflow.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div 
            className={`relative group transition-all duration-300 ${
              isFocused ? 'scale-105' : ''
            }`}
          >
            <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 ${
              isFocused ? 'opacity-100' : ''
            }`} />
            <div className="relative flex items-center">
              <Search className="absolute left-6 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search AI for writing, coding, design..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="w-full pl-14 pr-6 py-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Popular searches */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-500">Popular:</span>
          {['Logo design', 'Code generation', 'Video editing', 'Copywriting'].map((term) => (
            <button
              key={term}
              className="px-4 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
