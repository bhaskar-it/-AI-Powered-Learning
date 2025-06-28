export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  joinedDate: string;
  preferences: {
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    topics: string[];
  };
  progress: {
    totalCourses: number;
    completedCourses: number;
    totalPoints: number;
    streak: number;
    badges: Badge[];
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail: string;
  lessons: Lesson[];
  rating: number;
  enrolledStudents: number;
  tags: string[];
  aiRecommendationScore?: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'interactive';
  duration: string;
  content: string;
  completed: boolean;
  quiz?: Quiz;
}

export interface Quiz {
  id: string;
  questions: Question[];
  difficulty: 'easy' | 'medium' | 'hard';
  adaptiveLevel: number;
  timeLimit?: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: 'achievement' | 'streak' | 'skill' | 'special';
}

export interface LearningAnalytics {
  weeklyProgress: number[];
  subjectPerformance: { subject: string; score: number }[];
  learningTime: number;
  averageQuizScore: number;
  strengths: string[];
  improvementAreas: string[];
}