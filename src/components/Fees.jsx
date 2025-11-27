import React, { useState } from 'react';
import { feesData as initialFees } from '../data/dummyData';

const Fees = () => {
  const [fees, setFees] = useState(initialFees);

  const totalCollected = fees.reduce((sum, fee) => sum + fee.paidAmount, 0);
  const totalPending = fees.reduce((sum, fee) => sum + fee.pendingAmount, 0);
  const totalFees = fees.reduce((sum, fee) => sum + fee.totalFees, 0);

  const getStatusBadge = (status) => {
    const badges = {
      'Paid': 'badge-success',
      'Partial': 'badge-warning',
      'Pending': 'badge-danger'
    };
    return badges[status] || 'badge-info';
  };

  return (
    <div>
      <div className="page-header">
        <h2>Student Fees Management</h2>
        <p>Track and manage student fee payments</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Fees</span>
            <div className="stat-card-icon" style={{ background: '#e0e7ff', color: '#667eea' }}>
              💰
            </div>
          </div>
          <h2 className="stat-card-value">₹{totalFees.toLocaleString()}</h2>
          <p className="stat-card-description">Total fee amount</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Collected</span>
            <div className="stat-card-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
              ✅
            </div>
          </div>
          <h2 className="stat-card-value">₹{totalCollected.toLocaleString()}</h2>
          <p className="stat-card-description">Successfully collected</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Pending</span>
            <div className="stat-card-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
              ⏳
            </div>
          </div>
          <h2 className="stat-card-value">₹{totalPending.toLocaleString()}</h2>
          <p className="stat-card-description">Outstanding amount</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Collection Rate</span>
            <div className="stat-card-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
              📊
            </div>
          </div>
          <h2 className="stat-card-value">{((totalCollected / totalFees) * 100).toFixed(1)}%</h2>
          <p className="stat-card-description">Payment completion</p>
        </div>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Fee Records ({fees.length})</h3>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Total Fees</th>
                <th>Paid Amount</th>
                <th>Pending</th>
                <th>Last Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fees.map(fee => (
                <tr key={fee.id}>
                  <td>{fee.rollNumber}</td>
                  <td>{fee.studentName}</td>
                  <td>{fee.department}</td>
                  <td>{fee.semester}</td>
                  <td>₹{fee.totalFees.toLocaleString()}</td>
                  <td>₹{fee.paidAmount.toLocaleString()}</td>
                  <td>₹{fee.pendingAmount.toLocaleString()}</td>
                  <td>{fee.lastPaymentDate}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(fee.status)}`}>
                      {fee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Department-wise Fee Collection</h3>
        </div>
        <div className="dashboard-grid">
          {['Computer Science', 'Electronics and Communication', 'Mechanical', 'Civil Engineering'].map(dept => {
            const deptFees = fees.filter(f => f.department === dept);
            const deptTotal = deptFees.reduce((sum, fee) => sum + fee.totalFees, 0);
            const deptCollected = deptFees.reduce((sum, fee) => sum + fee.paidAmount, 0);
            const deptPending = deptFees.reduce((sum, fee) => sum + fee.pendingAmount, 0);

            return (
              <div key={dept} className="stat-card">
                <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#2d3748' }}>{dept}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#718096', fontSize: '14px' }}>Total:</span>
                    <span style={{ fontWeight: '600', color: '#2d3748' }}>₹{deptTotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#718096', fontSize: '14px' }}>Collected:</span>
                    <span style={{ fontWeight: '600', color: '#10b981' }}>₹{deptCollected.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#718096', fontSize: '14px' }}>Pending:</span>
                    <span style={{ fontWeight: '600', color: '#ef4444' }}>₹{deptPending.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Fees;
