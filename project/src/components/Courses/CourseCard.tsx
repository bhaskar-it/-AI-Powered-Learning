import React from 'react';
import { Clock, Users, Star, Brain, Play, CheckCircle } from 'lucide-react';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string) => void;
  showAIScore?: boolean;
  isEnrolled?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onEnroll, 
  showAIScore = false,
  isEnrolled = false 
}) => {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = course.lessons.length > 0 
    ? (completedLessons / course.lessons.length) * 100 
    : 0;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
      {showAIScore && course.aiRecommendationScore && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-medium flex items-center space-x-2">
          <Brain className="w-4 h-4" />
          <span>AI Match: {Math.round(course.aiRecommendationScore * 100)}%</span>
        </div>
      )}
      
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[course.difficulty]}`}>
            {course.difficulty}
          </span>
        </div>
        {isEnrolled && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {course.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.enrolledStudents.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>{course.rating}</span>
          </div>
        </div>

        {isEnrolled && course.lessons.length > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{completedLessons}/{course.lessons.length} lessons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">by {course.instructor}</span>
          {isEnrolled ? (
            <button className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Continue</span>
            </button>
          ) : (
            <button
              onClick={() => onEnroll?.(course.id)}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-200"
            >
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;