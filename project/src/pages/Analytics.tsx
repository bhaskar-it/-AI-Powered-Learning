import React from 'react';
import { BarChart3, TrendingUp, Brain, Target, Clock, Award } from 'lucide-react';
import { User } from '../types';
import { useAI } from '../hooks/useAI';

interface AnalyticsProps {
  user: User;
}

const Analytics: React.FC<AnalyticsProps> = ({ user }) => {
  const { analytics, isLoading } = useAI(user);

  if (isLoading || !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-bounce-subtle">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Generating learning analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Learning Analytics</h1>
          </div>
          <p className="text-blue-100 text-lg">
            Deep insights into your learning patterns and performance metrics
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">{analytics.learningTime}h</span>
          </div>
          <h3 className="font-semibold text-gray-900">Total Learning Time</h3>
          <p className="text-sm text-gray-600">This month</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">{analytics.averageQuizScore}%</span>
          </div>
          <h3 className="font-semibold text-gray-900">Average Quiz Score</h3>
          <p className="text-sm text-gray-600">Across all subjects</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold text-gray-900">
              {Math.max(...analytics.weeklyProgress)}%
            </span>
          </div>
          <h3 className="font-semibold text-gray-900">Best Day</h3>
          <p className="text-sm text-gray-600">Peak performance</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-900">{user.progress.badges.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900">Badges Earned</h3>
          <p className="text-sm text-gray-600">Total achievements</p>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Weekly Learning Progress</h2>
        <div className="space-y-4">
          {analytics.weeklyProgress.map((progress, index) => {
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            return (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600 w-20">
                  {days[index]}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-12">
                  {progress}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Subject Performance</h2>
          <div className="space-y-4">
            {analytics.subjectPerformance.map((subject, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700 w-24">
                  {subject.subject}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      subject.score >= 90 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                      subject.score >= 80 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                      subject.score >= 70 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                      'bg-gradient-to-r from-red-400 to-red-500'
                    }`}
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-10">
                  {subject.score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Strengths */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <span>Your Strengths</span>
            </h2>
            <div className="space-y-3">
              {analytics.strengths.map((strength, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-gray-900 font-medium">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement Areas */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <Brain className="w-6 h-6 text-orange-500" />
              <span>Areas for Improvement</span>
            </h2>
            <div className="space-y-3">
              {analytics.improvementAreas.map((area, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-xl">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-gray-900 font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;