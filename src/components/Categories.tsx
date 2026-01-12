import { PenTool, Palette, Code, Video, TrendingUp, Zap } from 'lucide-react';
import { categories } from '../data/tools';
import { motion } from 'motion/react';

const iconMap: { [key: string]: any } = {
  PenTool,
  Palette,
  Code,
  Video,
  TrendingUp,
  Zap,
};

export function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Browse by Category</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 transition-colors">
                  <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {category.count} tools
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
