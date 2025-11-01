import { motion } from 'framer-motion';
import { BadgeInfo } from '@/types';

interface BadgeCardProps {
  badge: BadgeInfo;
  onClick?: () => void;
}

export function BadgeCard({ badge, onClick }: BadgeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        {badge.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={badge.image} 
            alt={badge.name} 
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
            <div className="text-5xl text-white">
              🏆
            </div>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-lg font-bold text-white">{badge.name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 dark:text-gray-300">
          {badge.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {badge.category || 'Skill'}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(badge.date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
}