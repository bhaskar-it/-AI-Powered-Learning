import { User, Course, Badge } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  role: 'student',
  avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150',
  joinedDate: '2024-01-15',
  preferences: {
    learningStyle: 'visual',
    difficulty: 'intermediate',
    topics: ['programming', 'ai', 'design', 'data science']
  },
  progress: {
    totalCourses: 12,
    completedCourses: 8,
    totalPoints: 2450,
    streak: 15,
    badges: [
      {
        id: '1',
        name: 'Quick Learner',
        description: 'Completed 5 courses in a month',
        icon: 'zap',
        earnedDate: '2024-02-15',
        category: 'achievement'
      },
      {
        id: '2',
        name: 'Streak Master',
        description: '15 day learning streak',
        icon: 'flame',
        earnedDate: '2024-03-01',
        category: 'streak'
      },
      {
        id: '3',
        name: 'Code Warrior',
        description: 'Mastered programming fundamentals',
        icon: 'code',
        earnedDate: '2024-02-28',
        category: 'skill'
      }
    ]
  }
};

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the fundamentals of machine learning with hands-on Python projects and real-world applications.',
    instructor: 'Dr. Sarah Chen',
    duration: '6 weeks',
    difficulty: 'beginner',
    category: 'Technology',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    lessons: [
      {
        id: '1-1',
        title: 'What is Machine Learning?',
        type: 'video',
        duration: '15 min',
        content: 'Introduction to ML concepts and applications',
        completed: true
      },
      {
        id: '1-2',
        title: 'Setting up Python Environment',
        type: 'text',
        duration: '20 min',
        content: 'Step-by-step guide to setting up your development environment',
        completed: true
      },
      {
        id: '1-3',
        title: 'Your First ML Model',
        type: 'interactive',
        duration: '30 min',
        content: 'Build and train your first machine learning model',
        completed: false
      }
    ],
    rating: 4.8,
    enrolledStudents: 1250,
    tags: ['python', 'ai', 'data-science']
  },
  {
    id: '2',
    title: 'Advanced React Development',
    description: 'Master modern React patterns, hooks, and advanced concepts for building scalable applications.',
    instructor: 'John Martinez',
    duration: '8 weeks',
    difficulty: 'advanced',
    category: 'Programming',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    lessons: [
      {
        id: '2-1',
        title: 'Advanced Hooks Patterns',
        type: 'video',
        duration: '25 min',
        content: 'Deep dive into custom hooks and advanced patterns',
        completed: false
      },
      {
        id: '2-2',
        title: 'State Management with Context',
        type: 'interactive',
        duration: '35 min',
        content: 'Building complex state management solutions',
        completed: false
      }
    ],
    rating: 4.9,
    enrolledStudents: 890,
    tags: ['react', 'javascript', 'frontend']
  },
  {
    id: '3',
    title: 'Digital Marketing Strategy',
    description: 'Comprehensive guide to modern digital marketing strategies and tools.',
    instructor: 'Emily Johnson',
    duration: '4 weeks',
    difficulty: 'intermediate',
    category: 'Business',
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    lessons: [
      {
        id: '3-1',
        title: 'Digital Marketing Fundamentals',
        type: 'video',
        duration: '20 min',
        content: 'Overview of digital marketing landscape',
        completed: false
      }
    ],
    rating: 4.7,
    enrolledStudents: 2100,
    tags: ['marketing', 'business', 'strategy']
  }
];