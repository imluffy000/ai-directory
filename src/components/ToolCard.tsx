import { Heart, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onSelect: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function ToolCard({ tool, onSelect, isSaved, onToggleSave }: ToolCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 cursor-pointer overflow-hidden"
      onClick={onSelect}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {/* Logo/Gradient Circle */}
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
            {tool.name.charAt(0)}
          </div>

          {/* Save Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className={`p-2 rounded-full transition-all ${
              isSaved 
                ? 'bg-red-50 dark:bg-red-950' 
                : 'bg-gray-100 dark:bg-gray-800 opacity-0 group-hover:opacity-100'
            }`}
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isSaved 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Tool Info */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {tool.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {tool.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
            {tool.category}
          </span>

          {/* View Tool CTA - appears on hover */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-sm font-medium">
            View Tool
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Hover Shadow */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gray-200 dark:bg-gray-800 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
    </motion.div>
  );
}
