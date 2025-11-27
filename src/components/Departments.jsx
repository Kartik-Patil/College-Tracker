import React from 'react';
import { departmentStats, studentsData, coursesData } from '../data/dummyData';

const Departments = () => {
  const getStudentsByDepartment = (departmentName) => {
    return studentsData.filter(s => s.department === departmentName);
  };

  const getCoursesByDepartment = (departmentName) => {
    return coursesData.filter(c => c.department === departmentName);
  };

  return (
    <div>
      <div className="page-header">
        <h2>Departments</h2>
        <p>Overview of all academic departments</p>
      </div>

      <div className="department-grid">
        {departmentStats.map(dept => {
          const students = getStudentsByDepartment(dept.name);
          const courses = getCoursesByDepartment(dept.name);
          
          return (
            <div className="department-card" key={dept.id}>
              <div className="department-header">
                <div 
                  className="department-icon" 
                  style={{ background: `${dept.color}20`, color: dept.color }}
                >
                  {dept.icon}
                </div>
                <div className="department-info">
                  <h3>{dept.name}</h3>
                  <p>Department Code: {dept.code}</p>
                </div>
              </div>
              
              <div className="department-stats">
                <div className="department-stat">
                  <div className="department-stat-value">{dept.totalStudents}</div>
                  <div className="department-stat-label">Total Students</div>
                </div>
                <div className="department-stat">
                  <div className="department-stat-value">{dept.totalLecturers}</div>
                  <div className="department-stat-label">Lecturers</div>
                </div>
                <div className="department-stat">
                  <div className="department-stat-value">{dept.activeCourses}</div>
                  <div className="department-stat-label">Active Courses</div>
                </div>
                <div className="department-stat">
                  <div className="department-stat-value">{courses.length}</div>
                  <div className="department-stat-label">Courses Listed</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Department Information */}
      {departmentStats.map(dept => {
        const students = getStudentsByDepartment(dept.name);
        const courses = getCoursesByDepartment(dept.name);
        
        return (
          <div className="content-card" key={`detail-${dept.id}`} style={{ marginTop: '20px' }}>
            <div className="content-card-header">
              <h3 className="content-card-title">
                {dept.icon} {dept.name} - Students & Courses
              </h3>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ marginBottom: '10px', color: '#2d3748' }}>Enrolled Students ({students.length})</h4>
              {students.length > 0 ? (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Roll Number</th>
                        <th>Name</th>
                        <th>Year</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map(student => (
                        <tr key={student.id}>
                          <td>{student.rollNumber}</td>
                          <td>{student.name}</td>
                          <td>Year {student.year}</td>
                          <td>{student.email}</td>
                          <td>
                            <span className="badge badge-success">{student.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ color: '#718096' }}>No students enrolled in this department yet.</p>
              )}
            </div>

            <div>
              <h4 style={{ marginBottom: '10px', color: '#2d3748' }}>Available Courses ({courses.length})</h4>
              {courses.length > 0 ? (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Credits</th>
                        <th>Semester</th>
                        <th>Lecturer</th>
                        <th>Enrolled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map(course => (
                        <tr key={course.id}>
                          <td>{course.code}</td>
                          <td>{course.name}</td>
                          <td>{course.credits}</td>
                          <td>Semester {course.semester}</td>
                          <td>{course.lecturer}</td>
                          <td>{course.enrolledStudents} students</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ color: '#718096' }}>No courses available in this department yet.</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Departments;
