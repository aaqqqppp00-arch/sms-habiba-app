import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { Search, Plus, Users, Clock, User, ArrowRight, MoreHorizontal, X } from 'lucide-react';

const Courses = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', instructor: '', students: '', duration: '', status: 'Active'
  });

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      ...formData,
      students: parseInt(formData.students) || 0,
      price: 0, // Backend requirement
    };
    addCourse(newCourse);
    closeModal();
  };

  const openModal = () => {
    setFormData({ title: '', instructor: '', students: '', duration: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="w-full max-w-7xl mx-auto font-sans p-6 lg:p-8">
      
      {/* Unified Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:max-w-md flex-shrink-0">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search courses by title or instructor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-blue-500/20 focus:border-gray-900 dark:focus:border-blue-500 transition-colors shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={openModal}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-zinc-900 dark:bg-blue-600 hover:bg-zinc-800 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex-shrink-0"
          >
            <Plus size={16} />
            New Course
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                course.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                course.status === 'Draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
              }`}>
                {course.status}
              </span>
              <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight">{course.title}</h3>
            
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-6">
              <User size={14} />
              {course.instructor}
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Users size={16} />
                  <span className="font-medium text-gray-900 dark:text-white">{course.students}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock size={16} />
                  <span className="font-medium text-gray-900 dark:text-white">{course.duration}</span>
                </div>
              </div>
              
              <Link 
                to={`/courses/${course.id || 123}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-sm font-medium"
              >
                View Details <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Course</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Course Title</label>
                <input required type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-blue-500/20 focus:border-gray-900 dark:focus:border-blue-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Introduction to Physics" />
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instructor Name</label>
                <input required type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-blue-500/20 focus:border-gray-900 dark:focus:border-blue-500" value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} placeholder="e.g. Dr. Sarah Wilson" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expected Students</label>
                  <input type="number" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-blue-500/20 focus:border-gray-900 dark:focus:border-blue-500" value={formData.students} onChange={e => setFormData({...formData, students: e.target.value})} placeholder="0" />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration</label>
                  <input required type="text" className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-blue-500/20 focus:border-gray-900 dark:focus:border-blue-500" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 12 Weeks" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-blue-500/20 focus:border-gray-900 dark:focus:border-blue-500" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Upcoming</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-700 mt-6">
                <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" onClick={closeModal}>Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-blue-600 rounded-lg hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors shadow-sm">Add Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Courses;
