import React from 'react';
import { payrollData } from '../data/dummyData';

const Payroll = () => {
  const totalBaseSalary = payrollData.reduce((sum, p) => sum + p.baseSalary, 0);
  const totalAllowances = payrollData.reduce((sum, p) => sum + p.allowances, 0);
  const totalDeductions = payrollData.reduce((sum, p) => sum + p.deductions, 0);
  const totalNetSalary = payrollData.reduce((sum, p) => sum + p.netSalary, 0);

  return (
    <div>
      <div className="page-header">
        <h2>Lecturer Payroll Management</h2>
        <p>Manage faculty salary and payment records</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Base Salary</span>
            <div className="stat-card-icon" style={{ background: '#e0e7ff', color: '#667eea' }}>
              💵
            </div>
          </div>
          <h2 className="stat-card-value">₹{totalBaseSalary.toLocaleString()}</h2>
          <p className="stat-card-description">Monthly base salaries</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Allowances</span>
            <div className="stat-card-icon" style={{ background: '#d1fae5', color: '#10b981' }}>
              ➕
            </div>
          </div>
          <h2 className="stat-card-value">₹{totalAllowances.toLocaleString()}</h2>
          <p className="stat-card-description">Additional benefits</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Total Deductions</span>
            <div className="stat-card-icon" style={{ background: '#fee2e2', color: '#ef4444' }}>
              ➖
            </div>
          </div>
          <h2 className="stat-card-value">₹{totalDeductions.toLocaleString()}</h2>
          <p className="stat-card-description">Tax & other deductions</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-card-title">Net Payroll</span>
            <div className="stat-card-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
              💰
            </div>
          </div>
          <h2 className="stat-card-value">₹{totalNetSalary.toLocaleString()}</h2>
          <p className="stat-card-description">Total monthly payout</p>
        </div>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Payroll Records - November 2024</h3>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Lecturer Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Base Salary</th>
                <th>Allowances</th>
                <th>Deductions</th>
                <th>Net Salary</th>
                <th>Payment Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.map(payroll => (
                <tr key={payroll.id}>
                  <td>{payroll.lecturerName}</td>
                  <td>{payroll.department}</td>
                  <td>{payroll.designation}</td>
                  <td>₹{payroll.baseSalary.toLocaleString()}</td>
                  <td>₹{payroll.allowances.toLocaleString()}</td>
                  <td>₹{payroll.deductions.toLocaleString()}</td>
                  <td style={{ fontWeight: '600', color: '#10b981' }}>
                    ₹{payroll.netSalary.toLocaleString()}
                  </td>
                  <td>{payroll.paymentDate}</td>
                  <td>
                    <span className="badge badge-success">{payroll.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Department-wise Payroll Summary</h3>
        </div>
        <div className="dashboard-grid">
          {['Computer Science', 'Electronics and Communication', 'Mechanical', 'Civil Engineering'].map(dept => {
            const deptPayroll = payrollData.filter(p => p.department === dept);
            const deptTotal = deptPayroll.reduce((sum, p) => sum + p.netSalary, 0);
            const deptCount = deptPayroll.length;
            const avgSalary = deptCount > 0 ? deptTotal / deptCount : 0;

            return (
              <div key={dept} className="stat-card">
                <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#2d3748' }}>{dept}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#718096', fontSize: '14px' }}>Lecturers:</span>
                    <span style={{ fontWeight: '600', color: '#2d3748' }}>{deptCount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#718096', fontSize: '14px' }}>Total Payout:</span>
                    <span style={{ fontWeight: '600', color: '#667eea' }}>₹{deptTotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#718096', fontSize: '14px' }}>Avg Salary:</span>
                    <span style={{ fontWeight: '600', color: '#10b981' }}>₹{avgSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Salary Breakdown by Designation</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Designation</th>
                <th>Number of Lecturers</th>
                <th>Total Salary</th>
                <th>Average Salary</th>
              </tr>
            </thead>
            <tbody>
              {['Professor', 'Associate Professor', 'Assistant Professor'].map(designation => {
                const desigPayroll = payrollData.filter(p => p.designation === designation);
                const total = desigPayroll.reduce((sum, p) => sum + p.netSalary, 0);
                const count = desigPayroll.length;
                const avg = count > 0 ? total / count : 0;

                return (
                  <tr key={designation}>
                    <td>{designation}</td>
                    <td>{count}</td>
                    <td>₹{total.toLocaleString()}</td>
                    <td>₹{avg.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
