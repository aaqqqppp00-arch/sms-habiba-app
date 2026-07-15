import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../utils/api';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  
  const [teachers, setTeachers] = useState([
    { id: '1', teacherId: 'T001', name: 'Dr. Sarah Wilson', department: 'Science', subject: 'Advanced Mathematics', experience: '10 Years', status: 'Active' },
    { id: '2', teacherId: 'T002', name: 'Prof. James Chen', department: 'Science', subject: 'Physics Fundamentals', experience: '8 Years', status: 'Active' },
  ]);

  const [attendance, setAttendance] = useState([
    { studentId: '1', date: new Date().toISOString().split('T')[0], status: 'Present' },
    { studentId: '2', date: new Date().toISOString().split('T')[0], status: 'Absent' },
  ]);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.getStudents();
      setStudents(res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const addStudent = async (student) => {
    try {
      await api.createStudent(student);
      fetchStudents();
    } catch (e) {
      console.error(e);
    }
  };

  const updateStudent = async (id, updatedStudent) => {
    try {
      await api.updateStudent(id, updatedStudent);
      fetchStudents();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await api.deleteStudent(id);
      fetchStudents();
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.getCourses();
      setCourses(res.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const addCourse = async (course) => {
    try {
      await api.createCourse(course);
      fetchCourses();
    } catch (e) {
      console.error(e);
    }
  };

  const updateCourse = async (id, updatedCourse) => {
    try {
      await api.updateCourse(id, updatedCourse);
      fetchCourses();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await api.deleteCourse(id);
      fetchCourses();
    } catch (e) {
      console.error(e);
    }
  };

  const addTeacher = (teacher) => {
    setTeachers([...teachers, { ...teacher, id: Date.now().toString() }]);
  };

  const updateAttendance = (studentId, date, status) => {
    const existing = attendance.find(a => a.studentId === studentId && a.date === date);
    if (existing) {
      setAttendance(attendance.map(a => 
        a.studentId === studentId && a.date === date ? { ...a, status } : a
      ));
    } else {
      setAttendance([...attendance, { studentId, date, status }]);
    }
  };

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [profileImage, setProfileImage] = useState(null);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <GlobalContext.Provider value={{
      students, addStudent, updateStudent, deleteStudent, fetchStudents,
      courses, addCourse, updateCourse, deleteCourse, fetchCourses,
      teachers, addTeacher,
      attendance, updateAttendance,
      theme, setTheme,
      profileImage, setProfileImage
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
