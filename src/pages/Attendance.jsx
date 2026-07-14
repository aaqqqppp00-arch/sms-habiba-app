import React, { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Calendar, Filter, UserCheck, XCircle, Clock, Search } from 'lucide-react';

const Attendance = () => {
  const { students, attendance, updateAttendance } = useGlobalContext();
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const grades = ['All', ...new Set(students.map(s => s.class))];

  const filteredStudents = students.filter(s => 
    (selectedGrade === 'All' || s.class === selectedGrade) &&
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.rollNo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStudentStatus = (studentId) => {
    const record = attendance.find(a => a.studentId === studentId && a.date === selectedDate);
    return record ? record.status : 'None';
  };

  const StatusButton = ({ status, current, onClick, icon, activeClass }) => {
    const isActive = current === status;
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
          isActive 
            ? activeClass 
            : 'border-gray-200 text-gray-500 hover:bg-gray-50'
        }`}
      >
        {icon}
        {status}
      </button>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 lg:p-8">
      
      {/* Unified Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        
        <div className="relative w-full md:max-w-md flex-shrink-0">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 dark:focus:ring-blue-500/20 focus:border-gray-900 dark:focus:border-blue-500 transition-colors shadow-sm"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-white border border-gray-200 rounded-lg flex items-center gap-3 px-3 py-2 shadow-sm text-sm">
            <Calendar size={16} className="text-gray-400" />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent border-none text-gray-900 focus:outline-none w-full"
            />
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg flex items-center gap-3 px-3 py-2 shadow-sm text-sm">
            <Filter size={16} className="text-gray-400" />
            <select 
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="bg-transparent border-none text-gray-900 focus:outline-none w-full appearance-none pr-4"
            >
              {grades.map(grade => <option key={grade} value={grade}>{grade}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Roll No</th>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Class/Grade</th>
                <th className="px-6 py-3 text-right">Mark Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map(student => {
                const currentStatus = getStudentStatus(student.id);
                return (
                  <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{student.rollNo}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 text-gray-600">{student.class}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <StatusButton 
                          status="Present" 
                          current={currentStatus} 
                          icon={<UserCheck size={16} />} 
                          activeClass="bg-green-50 text-green-700 border-green-200 shadow-sm"
                          onClick={() => updateAttendance(student.id, selectedDate, 'Present')}
                        />
                        <StatusButton 
                          status="Absent" 
                          current={currentStatus} 
                          icon={<XCircle size={16} />} 
                          activeClass="bg-red-50 text-red-700 border-red-200 shadow-sm"
                          onClick={() => updateAttendance(student.id, selectedDate, 'Absent')}
                        />
                        <StatusButton 
                          status="Late" 
                          current={currentStatus} 
                          icon={<Clock size={16} />} 
                          activeClass="bg-yellow-50 text-yellow-700 border-yellow-200 shadow-sm"
                          onClick={() => updateAttendance(student.id, selectedDate, 'Late')}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    No students found for this grade.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
