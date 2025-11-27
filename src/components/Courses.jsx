import React, { useState } from 'react';
import { coursesData as initialCourses } from '../data/dummyData';
import { useToast } from '../context/ToastContext';

const Courses = () => {
  const { showToast } = useToast();
  const [courses, setCourses] = useState(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterSemester, setFilterSemester] = useState('All');
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    department: 'Computer Science',
    credits: 3,
    semester: 1,
    lecturer: '',
    enrolledStudents: 0,
    description: ''
  });

  const departments = ['Computer Science', 'Electronics and Communication', 'Mechanical', 'Civil Engineering'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseData = {
      ...formData,
      credits: parseInt(formData.credits),
      semester: parseInt(formData.semester),
      enrolledStudents: parseInt(formData.enrolledStudents)
    };

    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...courseData, id: c.id } : c));
      showToast('Course updated successfully!', 'success');
    } else {
      const newCourse = { ...courseData, id: courses.length + 1 };
      setCourses([...courses, newCourse]);
      showToast('Course added successfully!', 'success');
    }
    resetForm();
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
      showToast('Course deleted successfully!', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      department: 'Computer Science',
      credits: 3,
      semester: 1,
      lecturer: '',
      enrolledStudents: 0,
      description: ''
    });
    setEditingCourse(null);
    setIsModalOpen(false);
  };

  // Filter and search logic
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.lecturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All' || course.department === filterDepartment;
    const matchesSemester = filterSemester === 'All' || course.semester === parseInt(filterSemester);
    return matchesSearch && matchesDepartment && matchesSemester;
  });

  const exportToCSV = () => {
    const headers = ['Code', 'Name', 'Department', 'Credits', 'Semester', 'Lecturer', 'Enrolled'];
    const csvData = filteredCourses.map(c => [
      c.code, c.name, c.department, c.credits, c.semester, c.lecturer, c.enrolledStudents
    ]);
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `courses_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const totalEnrollments = filteredCourses.reduce((sum, c) => sum + c.enrolledStudents, 0);
  const avgEnrollment = filteredCourses.length > 0 ? Math.round(totalEnrollments / filteredCourses.length) : 0;

  return (
    <div>
      <div className="page-header">
        <h2>Course Management</h2>
        <p>Manage academic courses and curricula</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Courses</span>
            <div className="stat-card-icon" style={{ background: '#e0e7ff', color: '#667eea' }}>
              📚
            </div>
          </div>
          <h2 className="stat-card-value">{filteredCourses.length}</h2>
          <p className="stat-card-description">Active courses</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Enrollments</span>
            <div className="stat-card-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
              👥
            </div>
          </div>
          <h2 className="stat-card-value">{totalEnrollments}</h2>
          <p className="stat-card-description">Students enrolled</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Avg Enrollment</span>
            <div className="stat-card-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
              📊
            </div>
          </div>
          <h2 className="stat-card-value">{avgEnrollment}</h2>
          <p className="stat-card-description">Per course</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Departments</span>
            <div className="stat-card-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
              🏛️
            </div>
          </div>
          <h2 className="stat-card-value">{departments.length}</h2>
          <p className="stat-card-description">Offering courses</p>
        </div>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">All Courses ({filteredCourses.length} of {courses.length})</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-success" onClick={exportToCSV}>
              📥 Export CSV
            </button>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              ➕ Add Course
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by code, name, or lecturer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: '1', minWidth: '250px' }}
          />
          <select
            className="form-control"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            style={{ width: '220px' }}
          >
            <option value="All">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            className="form-control"
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            style={{ width: '150px' }}
          >
            <option value="All">All Semesters</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Department</th>
                <th>Credits</th>
                <th>Semester</th>
                <th>Lecturer</th>
                <th>Enrolled</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map(course => (
                <tr key={course.id}>
                  <td><strong>{course.code}</strong></td>
                  <td>{course.name}</td>
                  <td>{course.department}</td>
                  <td>{course.credits}</td>
                  <td>Sem {course.semester}</td>
                  <td>{course.lecturer}</td>
                  <td>{course.enrolledStudents} students</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(course)}>
                        ✏️ Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(course.id)}>
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Courses by Department</h3>
        </div>
        <div className="dashboard-grid">
          {departments.map(dept => {
            const deptCourses = courses.filter(c => c.department === dept);
            const deptEnrollments = deptCourses.reduce((sum, c) => sum + c.enrolledStudents, 0);

            return (
              <div key={dept} className="stat-card">
                <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#2d3748' }}>{dept}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#718096', fontSize: '14px' }}>Courses:</span>
                    <span style={{ fontWeight: '600', color: '#2d3748' }}>{deptCourses.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#718096', fontSize: '14px' }}>Enrollments:</span>
                    <span style={{ fontWeight: '600', color: '#667eea' }}>{deptEnrollments}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#718096', fontSize: '14px' }}>Avg/Course:</span>
                    <span style={{ fontWeight: '600', color: '#10b981' }}>
                      {deptCourses.length > 0 ? Math.round(deptEnrollments / deptCourses.length) : 0}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
              <button className="modal-close" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Course Code *</label>
                  <input
                    type="text"
                    name="code"
                    className="form-control"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="e.g., CS301"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Course Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Department *</label>
                  <select
                    name="department"
                    className="form-control"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Credits *</label>
                  <input
                    type="number"
                    name="credits"
                    className="form-control"
                    value={formData.credits}
                    onChange={handleInputChange}
                    min="1"
                    max="6"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Semester *</label>
                  <select
                    name="semester"
                    className="form-control"
                    value={formData.semester}
                    onChange={handleInputChange}
                    required
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Enrolled Students *</label>
                  <input
                    type="number"
                    name="enrolledStudents"
                    className="form-control"
                    value={formData.enrolledStudents}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Lecturer Name *</label>
                <input
                  type="text"
                  name="lecturer"
                  className="form-control"
                  value={formData.lecturer}
                  onChange={handleInputChange}
                  placeholder="e.g., Dr. Suresh Iyer"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief course description"
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn btn-success">
                  {editingCourse ? 'Update Course' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
