import React from 'react';
import { studentsData, lecturersData, coursesData, feesData, payrollData, departmentStats } from '../data/dummyData';

const Dashboard = () => {
  const totalStudents = studentsData.length;
  const totalLecturers = lecturersData.length;
  const totalCourses = coursesData.length;
  const totalDepartments = departmentStats.length;

  const totalFeesCollected = feesData.reduce((sum, fee) => sum + fee.paidAmount, 0);
  const totalFeesPending = feesData.reduce((sum, fee) => sum + fee.pendingAmount, 0);
  const totalPayroll = payrollData.reduce((sum, p) => sum + p.netSalary, 0);

  const recentStudents = studentsData.slice(0, 5);
  const recentLecturers = lecturersData.slice(0, 4);

  return (
    <div>
      <div className="page-header">
        <h2>Dashboard</h2>
        <p>Welcome to College Learning Management System</p>
      </div>

      {/* Main Statistics */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Students</span>
            <div className="stat-card-icon" style={{ background: '#e0e7ff', color: '#667eea' }}>
              👨‍🎓
            </div>
          </div>
          <h2 className="stat-card-value">{totalStudents}</h2>
          <p className="stat-card-description">Enrolled students</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Lecturers</span>
            <div className="stat-card-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
              👨‍🏫
            </div>
          </div>
          <h2 className="stat-card-value">{totalLecturers}</h2>
          <p className="stat-card-description">Faculty members</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Active Courses</span>
            <div className="stat-card-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
              📚
            </div>
          </div>
          <h2 className="stat-card-value">{totalCourses}</h2>
          <p className="stat-card-description">Available courses</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Departments</span>
            <div className="stat-card-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
              🏛️
            </div>
          </div>
          <h2 className="stat-card-value">{totalDepartments}</h2>
          <p className="stat-card-description">Academic departments</p>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Financial Overview</h3>
        </div>
        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Fees Collected</span>
              <div className="stat-card-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
                ✅
              </div>
            </div>
            <h2 className="stat-card-value">₹{totalFeesCollected.toLocaleString()}</h2>
            <p className="stat-card-description">Student fee payments</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Fees Pending</span>
              <div className="stat-card-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
                ⏳
              </div>
            </div>
            <h2 className="stat-card-value">₹{totalFeesPending.toLocaleString()}</h2>
            <p className="stat-card-description">Outstanding payments</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Monthly Payroll</span>
              <div className="stat-card-icon" style={{ background: '#e0e7ff', color: '#667eea' }}>
                💰
              </div>
            </div>
            <h2 className="stat-card-value">₹{totalPayroll.toLocaleString()}</h2>
            <p className="stat-card-description">Lecturer salaries</p>
          </div>

          <div className="stat-card">
            <div className="stat-card-header">
              <span className="stat-card-title">Net Balance</span>
              <div className="stat-card-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
                📊
              </div>
            </div>
            <h2 className="stat-card-value">
              ₹{(totalFeesCollected - totalPayroll).toLocaleString()}
            </h2>
            <p className="stat-card-description">After payroll deduction</p>
          </div>
        </div>
      </div>

      {/* Department Overview with Visual Stats */}
      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Department Overview</h3>
        </div>
        <div className="department-grid">
          {departmentStats.map(dept => {
            const maxStudents = Math.max(...departmentStats.map(d => d.totalStudents));
            const studentPercentage = (dept.totalStudents / maxStudents) * 100;
            
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
                    <p>{dept.code}</p>
                  </div>
                </div>
                <div className="department-stats">
                  <div className="department-stat">
                    <div className="department-stat-value">{dept.totalStudents}</div>
                    <div className="department-stat-label">Students</div>
                  </div>
                  <div className="department-stat">
                    <div className="department-stat-value">{dept.totalLecturers}</div>
                    <div className="department-stat-label">Lecturers</div>
                  </div>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-label">
                    <span>Student Capacity</span>
                    <span>{studentPercentage.toFixed(0)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${studentPercentage}%`,
                        background: dept.color 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Students */}
      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Recent Students</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Department</th>
                <th>Year</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentStudents.map(student => (
                <tr key={student.id}>
                  <td>{student.rollNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>Year {student.year}</td>
                  <td>
                    <span className="badge badge-success">{student.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Lecturers */}
      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Faculty Members</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Experience</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLecturers.map(lecturer => (
                <tr key={lecturer.id}>
                  <td>{lecturer.name}</td>
                  <td>{lecturer.department}</td>
                  <td>{lecturer.designation}</td>
                  <td>{lecturer.experience} years</td>
                  <td>
                    <span className="badge badge-success">{lecturer.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
