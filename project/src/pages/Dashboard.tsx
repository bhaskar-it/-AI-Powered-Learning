import React from 'react';
import { BookOpen, Clock, Award, TrendingUp, Target, Zap } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';
import ProgressChart from '../components/Dashboard/ProgressChart';
import CourseCard from '../components/Courses/CourseCard';
import { User, Course } from '../types';

interface DashboardProps {
  user: User;
  enrolledCourses: Course[];
}

const Dashboard: React.FC<DashboardProps> = ({ user, enrolledCourses }) => {
  const recentCourses = enrolledCourses.slice(0, 3);
  const weeklyData = [65, 78, 82, 75, 88, 92, 85];
  const weeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.name}! 🎓
          </h1>
          <p className="text-blue-100 text-lg mb-6">
            Ready to continue your learning journey? You're doing great!
          </p>
          
          <div className="flex items-center space-x-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-sm font-medium">Current Streak</span>
              <div className="flex items-center space-x-2 mt-1">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="text-xl font-bold">{user.progress.streak} days</span>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-sm font-medium">Total Points</span>
              <div className="flex items-center space-x-2 mt-1">
                <Award className="w-5 h-5 text-yellow-300" />
                <span className="text-xl font-bold">{user.progress.totalPoints.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Courses Enrolled"
          value={user.progress.totalCourses}
          icon={BookOpen}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Completed Courses"
          value={user.progress.completedCourses}
          icon={Target}
          trend={{ value: 8, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Learning Hours"
          value="42.5h"
          icon={Clock}
          trend={{ value: 15, isPositive: true }}
          color="yellow"
        />
        <StatsCard
          title="Badges Earned"
          value={user.progress.badges.length}
          icon={Award}
          trend={{ value: 25, isPositive: true }}
          color="purple"
        />
      </div>

      {/* Progress and Recent Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProgressChart
            data={weeklyData}
            labels={weeklyLabels}
            title="Weekly Learning Progress"
          />
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentCourses.map((course) => {
                const completedLessons = course.lessons.filter(l => l.completed).length;
                const progress = course.lessons.length > 0 
                  ? (completedLessons / course.lessons.length) * 100 
                  : 0;
                  
                return (
                  <div key={course.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}% complete</p>
                    </div>
                    <button className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors duration-200">
                      Continue
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user.progress.badges.slice(0, 3).map((badge) => (
            <div key={badge.id} className="flex items-center space-x-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{badge.name}</h3>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;