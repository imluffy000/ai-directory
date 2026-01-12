import { ChevronLeft, ChevronRight, TrendingUp, Clock } from 'lucide-react';
import { useRef, useState } from 'react';
import { ToolCard } from './ToolCard';
import { tools } from '../data/tools';
import { Tool } from '../types';

interface TrendingSectionProps {
  onSelectTool: (tool: Tool) => void;
  savedTools: Set<number>;
  onToggleSave: (toolId: number) => void;
}

export function TrendingSection({ onSelectTool, savedTools, onToggleSave }: TrendingSectionProps) {
  const trendingRef = useRef<HTMLDivElement>(null);
  const recentRef = useRef<HTMLDivElement>(null);
  const [showTrendingScroll, setShowTrendingScroll] = useState(false);
  const [showRecentScroll, setShowRecentScroll] = useState(false);

  const trendingTools = tools.filter(tool => tool.trending);
  const recentTools = tools.filter(tool => tool.recentlyAdded);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 400;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Trending Tools */}
      <div 
        className="mb-16"
        onMouseEnter={() => setShowTrendingScroll(true)}
        onMouseLeave={() => setShowTrendingScroll(false)}
      >
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending This Week</h2>
        </div>

        <div className="relative group">
          {/* Scroll Buttons */}
          {showTrendingScroll && (
            <>
              <button
                onClick={() => scroll(trendingRef, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={() => scroll(trendingRef, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </>
          )}

          <div 
            ref={trendingRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {trendingTools.map((tool) => (
              <div key={tool.id} className="flex-none w-80">
                <ToolCard
                  tool={tool}
                  onSelect={() => onSelectTool(tool)}
                  isSaved={savedTools.has(tool.id)}
                  onToggleSave={() => onToggleSave(tool.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recently Added */}
      <div
        onMouseEnter={() => setShowRecentScroll(true)}
        onMouseLeave={() => setShowRecentScroll(false)}
      >
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Recently Added</h2>
        </div>

        <div className="relative group">
          {/* Scroll Buttons */}
          {showRecentScroll && (
            <>
              <button
                onClick={() => scroll(recentRef, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <button
                onClick={() => scroll(recentRef, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </>
          )}

          <div 
            ref={recentRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {recentTools.map((tool) => (
              <div key={tool.id} className="flex-none w-80">
                <ToolCard
                  tool={tool}
                  onSelect={() => onSelectTool(tool)}
                  isSaved={savedTools.has(tool.id)}
                  onToggleSave={() => onToggleSave(tool.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
