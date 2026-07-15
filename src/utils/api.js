const API_URL = 'http://localhost:8000/api/v1';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  async login(username, password) {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });
      
      if (!response.ok) {
        const error = new Error('Login failed');
        error.status = response.status;
        throw error;
      }
      return await response.json();
    } catch (err) {
      if (!err.status) {
        err.message = 'NetworkError';
      }
      throw err;
    }
  },

  async forgotPassword(email) {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Failed to send reset link');
    }
    
    return response.json();
  },

  async resetPassword(token, new_password) {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, new_password })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to reset password');
    }
    
    return response.json();
  },

  async getStudents() {
    const response = await fetch(`${API_URL}/students/`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch students');
    return response.json();
  },

  async createStudent(data) {
    const response = await fetch(`${API_URL}/students/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create student');
    return response.json();
  },

  async updateStudent(id, data) {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update student');
    return response.json();
  },

  async deleteStudent(id) {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete student');
    return response.json();
  },
  
  // Courses
  async getCourses() {
    const response = await fetch(`${API_URL}/courses/`, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch courses');
    return response.json();
  },

  async createCourse(data) {
    const response = await fetch(`${API_URL}/courses/`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create course');
    return response.json();
  },

  async updateCourse(id, data) {
    const response = await fetch(`${API_URL}/courses/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update course');
    return response.json();
  },

  async deleteCourse(id) {
    const response = await fetch(`${API_URL}/courses/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete course');
    return response.json();
  }
};
