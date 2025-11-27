import React, { useState } from 'react';
import { lecturersData as initialLecturers } from '../data/dummyData';
import { useToast } from '../context/ToastContext';

const Lecturers = () => {
  const { showToast } = useToast();
  const [lecturers, setLecturers] = useState(initialLecturers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLecturer, setEditingLecturer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [filterDesignation, setFilterDesignation] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    qualification: '',
    experience: 0,
    subjects: '',
    joiningDate: '',
    salary: 0,
    status: 'Active'
  });

  const departments = ['Computer Science', 'Electronics and Communication', 'Mechanical', 'Civil Engineering'];
  const designations = ['Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lecturerData = {
      ...formData,
      subjects: formData.subjects.split(',').map(s => s.trim()),
      experience: parseInt(formData.experience),
      salary: parseFloat(formData.salary)
    };

    if (editingLecturer) {
      setLecturers(lecturers.map(l => l.id === editingLecturer.id ? { ...lecturerData, id: l.id } : l));
      showToast('Lecturer updated successfully!', 'success');
    } else {
      const newLecturer = { ...lecturerData, id: lecturers.length + 1 };
      setLecturers([...lecturers, newLecturer]);
      showToast('Lecturer added successfully!', 'success');
    }
    resetForm();
  };

  const handleEdit = (lecturer) => {
    setEditingLecturer(lecturer);
    setFormData({
      ...lecturer,
      subjects: lecturer.subjects.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lecturer?')) {
      setLecturers(lecturers.filter(l => l.id !== id));
      showToast('Lecturer deleted successfully!', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: 'Computer Science',
      designation: 'Assistant Professor',
      qualification: '',
      experience: 0,
      subjects: '',
      joiningDate: '',
      salary: 0,
      status: 'Active'
    });
    setEditingLecturer(null);
    setIsModalOpen(false);
  };

  // Filter and search logic
  const filteredLecturers = lecturers.filter(lecturer => {
    const matchesSearch = lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecturer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All' || lecturer.department === filterDepartment;
    const matchesDesignation = filterDesignation === 'All' || lecturer.designation === filterDesignation;
    return matchesSearch && matchesDepartment && matchesDesignation;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Department', 'Designation', 'Qualification', 'Experience', 'Status'];
    const csvData = filteredLecturers.map(l => [
      l.name, l.email, l.phone, l.department, l.designation, l.qualification, l.experience, l.status
    ]);
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lecturers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div>
      <div className="page-header">
        <h2>Lecturer Management</h2>
        <p>Manage faculty members and their information</p>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">All Lecturers ({filteredLecturers.length} of {lecturers.length})</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-success" onClick={exportToCSV}>
              📥 Export CSV
            </button>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              ➕ Add Lecturer
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by name or email..."
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
            value={filterDesignation}
            onChange={(e) => setFilterDesignation(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="All">All Designations</option>
            {designations.map(des => (
              <option key={des} value={des}>{des}</option>
            ))}
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Qualification</th>
                <th>Experience</th>
                <th>Subjects</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLecturers.map(lecturer => (
                <tr key={lecturer.id}>
                  <td>{lecturer.name}</td>
                  <td>{lecturer.email}</td>
                  <td>{lecturer.department}</td>
                  <td>{lecturer.designation}</td>
                  <td>{lecturer.qualification}</td>
                  <td>{lecturer.experience} years</td>
                  <td>{lecturer.subjects.slice(0, 2).join(', ')}{lecturer.subjects.length > 2 ? '...' : ''}</td>
                  <td>
                    <span className={`badge ${lecturer.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                      {lecturer.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(lecturer)}>
                        ✏️ Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(lecturer.id)}>
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

      {isModalOpen && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{editingLecturer ? 'Edit Lecturer' : 'Add New Lecturer'}</h3>
              <button className="modal-close" onClick={resetForm}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
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
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Designation *</label>
                  <select
                    name="designation"
                    className="form-control"
                    value={formData.designation}
                    onChange={handleInputChange}
                    required
                  >
                    {designations.map(des => (
                      <option key={des} value={des}>{des}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Qualification *</label>
                  <input
                    type="text"
                    name="qualification"
                    className="form-control"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    placeholder="e.g., PhD in Computer Science"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Experience (years) *</label>
                  <input
                    type="number"
                    name="experience"
                    className="form-control"
                    value={formData.experience}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Salary *</label>
                  <input
                    type="number"
                    name="salary"
                    className="form-control"
                    value={formData.salary}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Subjects (comma-separated) *</label>
                <input
                  type="text"
                  name="subjects"
                  className="form-control"
                  value={formData.subjects}
                  onChange={handleInputChange}
                  placeholder="e.g., Data Structures, Algorithms, Machine Learning"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Joining Date *</label>
                  <input
                    type="date"
                    name="joiningDate"
                    className="form-control"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Status *</label>
                  <select
                    name="status"
                    className="form-control"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn btn-success">
                  {editingLecturer ? 'Update Lecturer' : 'Add Lecturer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lecturers;
