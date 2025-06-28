import { useState, useEffect } from 'react';
import { Course, User, LearningAnalytics } from '../types';

export const useAI = (user: User | null) => {
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [analytics, setAnalytics] = useState<LearningAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated AI recommendation engine
  const generateRecommendations = async (userPreferences: User['preferences'], completedCourses: string[] = []) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const allCourses: Course[] = [
      {
        id: '1',
        title: 'Introduction to Machine Learning',
        description: 'Learn the fundamentals of ML with hands-on Python projects',
        instructor: 'Dr. Sarah Chen',
        duration: '6 weeks',
        difficulty: 'beginner',
        category: 'Technology',
        thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
        lessons: [],
        rating: 4.8,
        enrolledStudents: 1250,
        tags: ['python', 'ai', 'data-science'],
        aiRecommendationScore: 0.92
      },
      {
        id: '2',
        title: 'Advanced React Development',
        description: 'Master modern React patterns and advanced concepts',
        instructor: 'John Martinez',
        duration: '8 weeks',
        difficulty: 'advanced',
        category: 'Programming',
        thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
        lessons: [],
        rating: 4.9,
        enrolledStudents: 890,
        tags: ['react', 'javascript', 'frontend'],
        aiRecommendationScore: 0.88
      },
      {
        id: '3',
        title: 'Digital Marketing Strategy',
        description: 'Comprehensive guide to modern digital marketing',
        instructor: 'Emily Johnson',
        duration: '4 weeks',
        difficulty: 'intermediate',
        category: 'Business',
        thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
        lessons: [],
        rating: 4.7,
        enrolledStudents: 2100,
        tags: ['marketing', 'business', 'strategy'],
        aiRecommendationScore: 0.75
      },
      {
        id: '4',
        title: 'Data Science with Python',
        description: 'Complete data science workflow from data to insights',
        instructor: 'Dr. Michael Roberts',
        duration: '10 weeks',
        difficulty: 'intermediate',
        category: 'Data Science',
        thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
        lessons: [],
        rating: 4.8,
        enrolledStudents: 1500,
        tags: ['python', 'data-analysis', 'statistics'],
        aiRecommendationScore: 0.91
      },
      {
        id: '5',
        title: 'UI/UX Design Fundamentals',
        description: 'Create beautiful and user-friendly interfaces',
        instructor: 'Lisa Wong',
        duration: '6 weeks',
        difficulty: 'beginner',
        category: 'Design',
        thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
        lessons: [],
        rating: 4.9,
        enrolledStudents: 980,
        tags: ['design', 'ui', 'ux'],
        aiRecommendationScore: 0.82
      }
    ];

    // AI logic: Filter and score courses based on user preferences
    const scoredCourses = allCourses
      .filter(course => !completedCourses.includes(course.id))
      .map(course => {
        let score = course.aiRecommendationScore || 0;
        
        // Boost score based on difficulty preference
        if (course.difficulty === userPreferences.difficulty) {
          score += 0.1;
        }
        
        // Boost score for matching interests
        const hasMatchingTags = course.tags.some(tag => 
          userPreferences.topics.some(topic => 
            topic.toLowerCase().includes(tag.toLowerCase()) || 
            tag.toLowerCase().includes(topic.toLowerCase())
          )
        );
        if (hasMatchingTags) {
          score += 0.15;
        }
        
        return { ...course, aiRecommendationScore: Math.min(score, 1) };
      })
      .sort((a, b) => (b.aiRecommendationScore || 0) - (a.aiRecommendationScore || 0))
      .slice(0, 3);

    setRecommendations(scoredCourses);
    setIsLoading(false);
  };

  // Generate learning analytics
  const generateAnalytics = async () => {
    if (!user) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockAnalytics: LearningAnalytics = {
      weeklyProgress: [65, 78, 82, 75, 88, 92, 85],
      subjectPerformance: [
        { subject: 'Programming', score: 88 },
        { subject: 'Mathematics', score: 76 },
        { subject: 'Design', score: 92 },
        { subject: 'Business', score: 71 },
        { subject: 'Science', score: 84 }
      ],
      learningTime: 24.5,
      averageQuizScore: 82,
      strengths: ['Visual Learning', 'Problem Solving', 'Creative Thinking'],
      improvementAreas: ['Time Management', 'Mathematical Concepts', 'Written Communication']
    };
    
    setAnalytics(mockAnalytics);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      generateRecommendations(user.preferences);
      generateAnalytics();
    }
  }, [user]);

  return {
    recommendations,
    analytics,
    isLoading,
    generateRecommendations,
    generateAnalytics
  };
};