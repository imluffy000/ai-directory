import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedTools } from './components/FeaturedTools';
import { Categories } from './components/Categories';
import { TrendingSection } from './components/TrendingSection';
import { Footer } from './components/Footer';
import { ToolDetailModal } from './components/ToolDetailModal';
import { ThemeProvider } from './components/ThemeProvider';
import { Tool } from './types';

export default function App() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [savedTools, setSavedTools] = useState<Set<number>>(new Set());

  const toggleSaveTool = (toolId: number) => {
    setSavedTools(prev => {
      const newSet = new Set(prev);
      if (newSet.has(toolId)) {
        newSet.delete(toolId);
      } else {
        newSet.add(toolId);
      }
      return newSet;
    });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <Navbar />
        <Hero />
        <FeaturedTools 
          onSelectTool={setSelectedTool}
          savedTools={savedTools}
          onToggleSave={toggleSaveTool}
        />
        <Categories />
        <TrendingSection 
          onSelectTool={setSelectedTool}
          savedTools={savedTools}
          onToggleSave={toggleSaveTool}
        />
        <Footer />
        
        {selectedTool && (
          <ToolDetailModal 
            tool={selectedTool}
            onClose={() => setSelectedTool(null)}
            isSaved={savedTools.has(selectedTool.id)}
            onToggleSave={() => toggleSaveTool(selectedTool.id)}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
