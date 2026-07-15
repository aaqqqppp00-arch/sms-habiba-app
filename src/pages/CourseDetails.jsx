import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, Clock, Settings, FileText, CheckCircle } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';

const CourseDetails = () => {
  const { id } = useParams();
  const { courses } = useGlobalContext();
  const [activeTab, setActiveTab] = useState('overview');
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // In a real app, you would fetch the course by ID from the backend
    // For now, we simulate fetching from global context or use a dummy
    const foundCourse = courses.find(c => String(c.id) === String(id));
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      // Dummy fallback
      setCourse({
        id,
        title: 'Advanced React Patterns',
        instructor: 'Sarah Wilson',
        students: 124,
        duration: '12 Weeks',
        status: 'Active',
      });
    }
  }, [id, courses]);

  if (!course) return <div className="p-8">Loading...</div>;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BookOpen size={18} /> },
    { id: 'syllabus', label: 'Syllabus', icon: <FileText size={18} /> },
    { id: 'students', label: 'Enrolled Students', icon: <Users size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-8 font-sans">
      {/* Back button & Breadcrumb */}
      <div className="mb-6">
        <Link 
          to="/courses" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Courses
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              {course.title}
            </h1>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
              course.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
              course.status === 'Draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              {course.status}
            </span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-base">
            Managed by <span className="font-medium text-gray-700 dark:text-gray-300">{course.instructor}</span>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            Edit Course
          </button>
          <button className="px-4 py-2 bg-zinc-900 dark:bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-blue-700 transition-colors shadow-sm">
            Publish Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800 mb-8 overflow-x-auto no-scrollbar">
        <nav className="flex gap-6 min-w-max px-1" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-zinc-900 dark:border-blue-500 text-zinc-900 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (Main details) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 lg:p-8 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Description</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  This course is designed to provide comprehensive knowledge and practical skills. Students will learn the foundational concepts, engage in hands-on projects, and master the techniques required for real-world application.
                </p>
                
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mt-8 mb-4 uppercase tracking-wider">Key Objectives</h4>
                <ul className="space-y-3">
                  {['Understand core principles', 'Build scalable applications', 'Deploy to production environments'].map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                      <CheckCircle size={20} className="text-green-500 shrink-0" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column (Sidebar widgets) */}
            <div className="space-y-6">
              
              {/* Instructor Widget */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-4">Lead Instructor</h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold text-xl">
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-lg">{course.instructor}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Senior Faculty</p>
                  </div>
                </div>
              </div>

              {/* Stats Widget */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-4">Course Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <Users size={18} className="text-blue-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Students</span>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{course.students}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <Clock size={18} className="text-orange-500" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Duration</span>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{course.duration}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'syllabus' && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 lg:p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Course Curriculum</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((week) => (
                <div key={week} className="flex items-start gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-xl transition-colors border border-gray-100 dark:border-gray-800">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300 shrink-0">
                    W{week}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Week {week}: Fundamentals & Core Concepts</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Detailed exploration of topic fundamentals. Includes 3 video lectures, 2 reading assignments, and 1 practical quiz.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'students' || activeTab === 'settings') && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-50 dark:bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Module under construction</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              This feature is currently being developed and will be available in the next release cycle.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
