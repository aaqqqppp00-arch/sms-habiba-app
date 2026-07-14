import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Users, GraduationCap, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { students, teachers, attendance } = useGlobalContext();

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const totalTeachers = teachers.length;

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today);
  const presentCount = todayAttendance.filter(a => a.status === 'Present').length;
  const attendanceRate = totalStudents ? Math.round((presentCount / totalStudents) * 100) : 0;

  const departmentData = students.reduce((acc, student) => {
    const dept = student.department;
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(departmentData).map(key => ({
    name: key,
    value: departmentData[key]
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

  const growthData = [
    { month: 'Jan', students: 100 },
    { month: 'Feb', students: 120 },
    { month: 'Mar', students: 150 },
    { month: 'Apr', students: 170 },
    { month: 'May', students: totalStudents * 10 },
  ];

  const StatCard = ({ title, value, icon, bgColor, textColor, darkBg }) => (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColor} ${darkBg} ${textColor}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 lg:p-6 pb-2">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Monitor your institute's key performance indicators.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard 
          title="Total Students" 
          value={totalStudents} 
          icon={<Users size={24} />} 
          bgColor="bg-blue-50" 
          darkBg="dark:bg-blue-900/20"
          textColor="text-blue-600 dark:text-blue-400" 
        />
        <StatCard 
          title="Teaching Staff" 
          value={totalTeachers} 
          icon={<GraduationCap size={24} />} 
          bgColor="bg-purple-50" 
          darkBg="dark:bg-purple-900/20"
          textColor="text-purple-600 dark:text-purple-400" 
        />
        <StatCard 
          title="Today's Attendance" 
          value={`${attendanceRate}%`} 
          icon={<CheckCircle size={24} />} 
          bgColor="bg-green-50" 
          darkBg="dark:bg-green-900/20"
          textColor="text-green-600 dark:text-green-400" 
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Growth Chart */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Student Growth</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '8px', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                />
                <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Subject Distribution</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '8px', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }} 
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#4b5563' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
