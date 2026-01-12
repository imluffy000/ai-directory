import { ToolCard } from './ToolCard';
import { tools } from '../data/tools';
import { Tool } from '../types';

interface FeaturedToolsProps {
  onSelectTool: (tool: Tool) => void;
  savedTools: Set<number>;
  onToggleSave: (toolId: number) => void;
}

export function FeaturedTools({ onSelectTool, savedTools, onToggleSave }: FeaturedToolsProps) {
  const featuredTools = tools.filter(tool => tool.featured);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Tools</h2>
        <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium">
          View all →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onSelect={() => onSelectTool(tool)}
            isSaved={savedTools.has(tool.id)}
            onToggleSave={() => onToggleSave(tool.id)}
          />
        ))}
      </div>
    </section>
  );
}
