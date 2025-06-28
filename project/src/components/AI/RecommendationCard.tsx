import React from 'react';
import { Brain, TrendingUp, Clock, Star } from 'lucide-react';
import { Course } from '../../types';

interface RecommendationCardProps {
  course: Course;
  reason: string;
  onEnroll: (courseId: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  course, 
  reason, 
  onEnroll 
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-6 border border-blue-200/50 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start space-x-4">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-20 h-20 rounded-xl object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-purple-600">
              AI Recommended - {Math.round((course.aiRecommendationScore || 0) * 100)}% match
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {course.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3">
            {reason}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{course.rating}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              course.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              course.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {course.difficulty}
            </span>
          </div>
          
          <button
            onClick={() => onEnroll(course.id)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Start Learning</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;