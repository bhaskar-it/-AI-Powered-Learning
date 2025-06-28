import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';
import Analytics from './pages/Analytics';
import CourseCard from './components/Courses/CourseCard';
import BadgeCard from './components/Achievements/BadgeCard';
import QuizComponent from './components/Quiz/QuizComponent';
import { mockUser, mockCourses } from './data/mockData';
import { useLocalStorage } from './hooks/useLocalStorage';
import { BookOpen, Brain, Clock, Award, Users } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user] = useLocalStorage('user', mockUser);
  const [enrolledCourses, setEnrolledCourses] = useLocalStorage('enrolledCourses', mockCourses.slice(0, 2));
  const [allCourses] = useLocalStorage('allCourses', mockCourses);

  const handleEnroll = (courseId: string) => {
    const course = allCourses.find(c => c.id === courseId);
    if (course && !enrolledCourses.find(c => c.id === courseId)) {
      setEnrolledCourses([...enrolledCourses, course]);
    }
  };

  const handleQuizComplete = (score: number) => {
    console.log('Quiz completed with score:', score);
    // Here you would typically update the user's progress
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} enrolledCourses={enrolledCourses} />;
      
      case 'courses':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-500 via-green-600 to-teal-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-2">My Courses</h1>
                <p className="text-green-100 text-lg">
                  Continue your learning journey with enrolled courses
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={true}
                />
              ))}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCourses
                  .filter(course => !enrolledCourses.find(ec => ec.id === course.id))
                  .map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onEnroll={handleEnroll}
                    />
                  ))}
              </div>
            </div>
          </div>
        );
      
      case 'recommendations':
        return <Recommendations user={user} onEnroll={handleEnroll} />;
      
      case 'progress':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-2">Learning Progress</h1>
                <p className="text-purple-100 text-lg">
                  Track your achievements and course completion
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                <h3 className="text-2xl font-bold text-gray-900">{user.progress.totalCourses}</h3>
                <p className="text-gray-600">Total Courses</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center">
                <Award className="w-12 h-12 mx-auto mb-3 text-green-500" />
                <h3 className="text-2xl font-bold text-gray-900">{user.progress.completedCourses}</h3>
                <p className="text-gray-600">Completed</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center">
                <Clock className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                <h3 className="text-2xl font-bold text-gray-900">{user.progress.streak}</h3>
                <p className="text-gray-600">Day Streak</p>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 text-center">
                <Users className="w-12 h-12 mx-auto mb-3 text-purple-500" />
                <h3 className="text-2xl font-bold text-gray-900">{user.progress.totalPoints}</h3>
                <p className="text-gray-600">Total Points</p>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Progress</h2>
              <div className="space-y-4">
                {enrolledCourses.map((course) => {
                  const completedLessons = course.lessons.filter(l => l.completed).length;
                  const progress = course.lessons.length > 0 
                    ? (completedLessons / course.lessons.length) * 100 
                    : 0;
                    
                  return (
                    <div key={course.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <span className="text-sm text-gray-600">
                          {completedLessons}/{course.lessons.length} lessons
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{Math.round(progress)}% complete</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      
      case 'achievements':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
              <div className="relative z-10">
                <h1 className="text-3xl font-bold mb-2">Achievements</h1>
                <p className="text-yellow-100 text-lg">
                  Celebrate your learning milestones and earned badges
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.progress.badges.map((badge) => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        );
      
      case 'analytics':
        return <Analytics user={user} />;
      
      case 'quiz':
        return (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Adaptive Quiz</h1>
            <QuizComponent
              quiz={{
                id: 'sample-quiz',
                difficulty: 'medium',
                adaptiveLevel: 1,
                questions: [
                  {
                    id: '1',
                    question: 'What is the primary benefit of machine learning?',
                    options: [
                      'Automated decision making',
                      'Reduced computational cost',
                      'Simplified programming',
                      'Faster internet speeds'
                    ],
                    correctAnswer: 0,
                    explanation: 'Machine learning enables automated decision making based on data patterns.',
                    difficulty: 'medium'
                  },
                  {
                    id: '2',
                    question: 'Which programming language is most commonly used for AI development?',
                    options: ['Java', 'Python', 'C++', 'JavaScript'],
                    correctAnswer: 1,
                    explanation: 'Python is widely used in AI due to its extensive libraries and ease of use.',
                    difficulty: 'easy'
                  }
                ]
              }}
              onComplete={handleQuizComplete}
            />
          </div>
        );
      
      default:
        return <Dashboard user={user} enrolledCourses={enrolledCourses} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header user={user} />
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;