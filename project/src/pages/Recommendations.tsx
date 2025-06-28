import React from 'react';
import { Brain, Sparkles, TrendingUp } from 'lucide-react';
import RecommendationCard from '../components/AI/RecommendationCard';
import { Course, User } from '../types';
import { useAI } from '../hooks/useAI';

interface RecommendationsProps {
  user: User;
  onEnroll: (courseId: string) => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({ user, onEnroll }) => {
  const { recommendations, isLoading } = useAI(user);

  const getRecommendationReason = (course: Course): string => {
    const reasons = [
      `Based on your interest in ${user.preferences.topics[0]}, this course will expand your knowledge.`,
      `Perfect match for your ${user.preferences.difficulty} skill level and visual learning style.`,
      `Highly rated course that aligns with your learning preferences and career goals.`,
      `Recommended because of your strong performance in similar subjects.`,
      `This course complements your existing skills and helps fill knowledge gaps.`
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce-subtle">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">AI is analyzing your learning patterns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-8 h-8" />
            <h1 className="text-3xl font-bold">AI-Powered Recommendations</h1>
          </div>
          <p className="text-purple-100 text-lg mb-6">
            Personalized course suggestions based on your learning style, progress, and goals
          </p>
          
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-sm font-medium">Learning Style</span>
              <div className="flex items-center space-x-2 mt-1">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-lg font-bold capitalize">{user.preferences.learningStyle}</span>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-sm font-medium">Skill Level</span>
              <div className="flex items-center space-x-2 mt-1">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <span className="text-lg font-bold capitalize">{user.preferences.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How AI Works */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-500" />
          <span>How Our AI Works</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Analyze Your Data</h3>
            <p className="text-sm text-gray-600">
              We examine your learning history, preferences, and performance patterns
            </p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Match Algorithms</h3>
            <p className="text-sm text-gray-600">
              Advanced algorithms find courses that align with your learning style and goals
            </p>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Personalized Results</h3>
            <p className="text-sm text-gray-600">
              Get curated recommendations with confidence scores and learning paths
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recommended for You
        </h2>
        
        {recommendations.length > 0 ? (
          <div className="space-y-6">
            {recommendations.map((course) => (
              <RecommendationCard
                key={course.id}
                course={course}
                reason={getRecommendationReason(course)}
                onEnroll={onEnroll}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No recommendations available
            </h3>
            <p className="text-gray-600">
              Complete more courses to get personalized AI recommendations
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;