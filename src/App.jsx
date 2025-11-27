import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Students from './components/Students';
import Lecturers from './components/Lecturers';
import Departments from './components/Departments';
import Courses from './components/Courses';
import Fees from './components/Fees';
import Payroll from './components/Payroll';
import Attendance from './components/Attendance';
import { useTheme } from './context/ThemeContext';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: '🏠' },
    { id: 'students', name: 'Students', icon: '👨‍🎓' },
    { id: 'departments', name: 'Departments', icon: '🏛️' },
    { id: 'lecturers', name: 'Lecturers', icon: '👨‍🏫' },
    { id: 'courses', name: 'Courses', icon: '📚' },
    { id: 'attendance', name: 'Attendance', icon: '📋' },
    { id: 'fees', name: 'Student Fees', icon: '💰' },
    { id: 'payroll', name: 'Lecturer Payroll', icon: '💵' },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <Students />;
      case 'departments':
        return <Departments />;
      case 'lecturers':
        return <Lecturers />;
      case 'courses':
        return <Courses />;
      case 'attendance':
        return <Attendance />;
      case 'fees':
        return <Fees />;
      case 'payroll':
        return <Payroll />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Menu Toggle */}
      <button 
        className="mobile-menu-toggle" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <h1>College LMS</h1>
          <p>Learning Management System</p>
        </div>
        <nav>
          <ul className="sidebar-nav">
            {menuItems.map(item => (
              <li key={item.id}>
                <a
                  href="#"
                  className={activePage === item.id ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    setActivePage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'} {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
