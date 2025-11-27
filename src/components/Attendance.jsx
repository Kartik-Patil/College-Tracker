import React, { useState } from 'react';
import { studentsData, coursesData } from '../data/dummyData';
import { useToast } from '../context/ToastContext';

const Attendance = () => {
  const { showToast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0]?.code || '');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  // Get students for selected course's department
  const selectedCourseData = coursesData.find(c => c.code === selectedCourse);
  const relevantStudents = selectedCourseData 
    ? studentsData.filter(s => s.department === selectedCourseData.department)
    : [];

  const handleAttendanceToggle = (studentId) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const markAllPresent = () => {
    const allPresent = {};
    relevantStudents.forEach(student => {
      allPresent[student.id] = true;
    });
    setAttendance(allPresent);
    showToast('All students marked present!', 'success');
  };

  const markAllAbsent = () => {
    setAttendance({});
    showToast('All students marked absent!', 'warning');
  };

  const saveAttendance = () => {
    if (!selectedCourse || relevantStudents.length === 0) {
      showToast('Please select a valid course!', 'error');
      return;
    }

    const presentCount = Object.values(attendance).filter(Boolean).length;
    const totalCount = relevantStudents.length;
    const percentage = ((presentCount / totalCount) * 100).toFixed(1);

    const record = {
      id: Date.now(),
      course: selectedCourseData.name,
      courseCode: selectedCourse,
      date: selectedDate,
      presentCount,
      totalCount,
      percentage,
      timestamp: new Date().toLocaleString()
    };

    setAttendanceHistory([record, ...attendanceHistory]);
    showToast(`Attendance saved! ${presentCount}/${totalCount} present (${percentage}%)`, 'success');
    setAttendance({});
  };

  const deleteRecord = (id) => {
    setAttendanceHistory(attendanceHistory.filter(r => r.id !== id));
    showToast('Attendance record deleted!', 'error');
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const absentCount = relevantStudents.length - presentCount;

  return (
    <div>
      <div className="page-header">
        <h2>Attendance Management</h2>
        <p>Track and manage student attendance for courses</p>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Present Today</span>
            <div className="stat-card-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
              ✅
            </div>
          </div>
          <h2 className="stat-card-value">{presentCount}</h2>
          <p className="stat-card-description">Students present</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Absent Today</span>
            <div className="stat-card-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
              ❌
            </div>
          </div>
          <h2 className="stat-card-value">{absentCount}</h2>
          <p className="stat-card-description">Students absent</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Students</span>
            <div className="stat-card-icon" style={{ background: '#e0e7ff', color: '#667eea' }}>
              👥
            </div>
          </div>
          <h2 className="stat-card-value">{relevantStudents.length}</h2>
          <p className="stat-card-description">In selected course</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Attendance Rate</span>
            <div className="stat-card-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
              📊
            </div>
          </div>
          <h2 className="stat-card-value">
            {relevantStudents.length > 0 
              ? ((presentCount / relevantStudents.length) * 100).toFixed(1) 
              : 0}%
          </h2>
          <p className="stat-card-description">Present percentage</p>
        </div>
      </div>

      {/* Attendance Marking Section */}
      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Mark Attendance</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-warning" onClick={markAllAbsent}>
              ❌ Mark All Absent
            </button>
            <button className="btn btn-success" onClick={markAllPresent}>
              ✅ Mark All Present
            </button>
            <button className="btn btn-primary" onClick={saveAttendance}>
              💾 Save Attendance
            </button>
          </div>
        </div>

        {/* Course and Date Selection */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1', minWidth: '250px', marginBottom: 0 }}>
            <label>Select Course</label>
            <select
              className="form-control"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setAttendance({});
              }}
            >
              {coursesData.map(course => (
                <option key={course.code} value={course.code}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ width: '200px', marginBottom: 0 }}>
            <label>Select Date</label>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {/* Student Attendance List */}
        {relevantStudents.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {relevantStudents.map(student => (
                  <tr key={student.id}>
                    <td>{student.rollNumber}</td>
                    <td>{student.name}</td>
                    <td>{student.department}</td>
                    <td>Year {student.year}</td>
                    <td>
                      <span className={`badge ${attendance[student.id] ? 'badge-success' : 'badge-danger'}`}>
                        {attendance[student.id] ? 'Present' : 'Absent'}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`btn btn-sm ${attendance[student.id] ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => handleAttendanceToggle(student.id)}
                      >
                        {attendance[student.id] ? '❌ Mark Absent' : '✅ Mark Present'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
            <p>No students found for the selected course.</p>
          </div>
        )}
      </div>

      {/* Attendance History */}
      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Attendance History ({attendanceHistory.length})</h3>
        </div>

        {attendanceHistory.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Course Name</th>
                  <th>Date</th>
                  <th>Present</th>
                  <th>Total</th>
                  <th>Percentage</th>
                  <th>Saved At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {attendanceHistory.map(record => (
                  <tr key={record.id}>
                    <td><strong>{record.courseCode}</strong></td>
                    <td>{record.course}</td>
                    <td>{record.date}</td>
                    <td>{record.presentCount}</td>
                    <td>{record.totalCount}</td>
                    <td>
                      <span className={`badge ${record.percentage >= 75 ? 'badge-success' : 'badge-warning'}`}>
                        {record.percentage}%
                      </span>
                    </td>
                    <td style={{ fontSize: '13px' }}>{record.timestamp}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteRecord(record.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
            <p>No attendance records yet. Start marking attendance to see history.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
