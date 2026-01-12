import { X, Heart, ExternalLink, Tag, DollarSign, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tool } from '../types';
import { tools } from '../data/tools';

interface ToolDetailModalProps {
  tool: Tool;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
}

export function ToolDetailModal({ tool, onClose, isSaved, onToggleSave }: ToolDetailModalProps) {
  // Get similar tools (same category, exclude current)
  const similarTools = tools
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="flex items-start gap-6 mb-8">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-white font-bold text-3xl shadow-xl`}>
                {tool.name.charAt(0)}
              </div>

              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {tool.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {tool.description}
                </p>
              </div>
            </div>

            {/* AI Summary Box */}
            <div className="mb-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-900">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                AI Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {tool.name} is a powerful {tool.category.toLowerCase()} tool that helps users {tool.description.toLowerCase()}. 
                Perfect for professionals looking to streamline their workflow with AI assistance.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
                  <Tag className="w-4 h-4" />
                  Category
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{tool.category}</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
                  <DollarSign className="w-4 h-4" />
                  Pricing
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{tool.pricing}</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-1">
                  <Eye className="w-4 h-4" />
                  Views
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {tool.views?.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Tags */}
            {tool.tags && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onToggleSave}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  isSaved
                    ? 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </div>

            {/* Similar Tools */}
            {similarTools.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Similar Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similarTools.map((similar) => (
                    <div
                      key={similar.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors cursor-pointer"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${similar.gradient} flex items-center justify-center text-white font-bold mb-3`}>
                        {similar.name.charAt(0)}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                        {similar.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {similar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
