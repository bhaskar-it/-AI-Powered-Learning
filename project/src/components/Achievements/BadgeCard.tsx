import React from 'react';
import { Badge } from '../../types';
import * as Icons from 'lucide-react';

interface BadgeCardProps {
  badge: Badge;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  const IconComponent = (Icons as any)[badge.icon] || Icons.Award;
  
  const categoryColors = {
    achievement: 'from-yellow-400 to-orange-500',
    streak: 'from-red-400 to-pink-500',
    skill: 'from-blue-400 to-purple-500',
    special: 'from-green-400 to-teal-500',
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-center group">
      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${categoryColors[badge.category]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="w-8 h-8 text-white" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {badge.name}
      </h3>
      
      <p className="text-sm text-gray-600 mb-3">
        {badge.description}
      </p>
      
      <div className="text-xs text-gray-500">
        Earned on {new Date(badge.earnedDate).toLocaleDateString()}
      </div>
    </div>
  );
};

export default BadgeCard;