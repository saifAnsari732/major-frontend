/* eslint-disable no-undef */
import React from 'react';
import './Btch_branch.css';
import ButtomNav from '../ButtomNav';
import Navbar from '../Navbar';


const Bca = () => {
  // Branch data with course codes
  const branches = [
    {
      id: 1,
      name: 'Computer Science',
      code: 'BTH-CS-266',
      totalPapers: 24,
      solvedPapers: 18,
      pendingPapers: 6,
      color: '#2563EB',
      icon: '💻'
    },
    {
      id: 2,
      name: 'Mechanical Engineering',
      code: 'BTH-ME-312',
      totalPapers: 22,
      solvedPapers: 15,
      pendingPapers: 7,
      color: '#DC2626',
      icon: '⚙️'
    },
    {
      id: 3,
      name: 'Electrical Engineering',
      code: 'BTH-EE-289',
      totalPapers: 20,
      solvedPapers: 20,
      pendingPapers: 0,
      color: '#F59E0B',
      icon: '⚡'
    },
    {
      id: 4,
      name: 'Civil Engineering',
      code: 'BTH-CE-301',
      totalPapers: 23,
      solvedPapers: 12,
      pendingPapers: 11,
      color: '#059669',
      icon: '🏗️'
    },
    {
      id: 5,
      name: 'Electronics & Communication',
      code: 'BTH-EC-277',
      totalPapers: 21,
      solvedPapers: 16,
      pendingPapers: 5,
      color: '#7C3AED',
      icon: '📡'
    },
    {
      id: 6,
      name: 'Information Technology',
      code: 'BTH-IT-294',
      totalPapers: 25,
      solvedPapers: 22,
      pendingPapers: 3,
      color: '#0D9488',
      icon: '🔧'
    },
    {
      id: 7,
      name: 'Biotechnology',
      code: 'BTH-BT-255',
      totalPapers: 18,
      solvedPapers: 10,
      pendingPapers: 8,
      color: '#65A30D',
      icon: '🧬'
    },
    {
      id: 8,
      name: 'Chemical Engineering',
      code: 'BTH-CH-322',
      totalPapers: 19,
      solvedPapers: 14,
      pendingPapers: 5,
      color: '#E11D48',
      icon: '🧪'
    },
    {
      id: 9,
      name: 'Aerospace Engineering',
      code: 'BTH-AE-333',
      totalPapers: 17,
      solvedPapers: 9,
      pendingPapers: 8,
      color: '#0284C7',
      icon: '✈️'
    },
    {
      id: 10,
      name: 'Artificial Intelligence',
      code: 'BTH-AI-288',
      totalPapers: 26,
      solvedPapers: 20,
      pendingPapers: 6,
      color: '#C026D3',
      icon: '🤖'
    },
    {
      id: 11,
      name: 'Data Science',
      code: 'BTH-DS-299',
      totalPapers: 24,
      solvedPapers: 18,
      pendingPapers: 6,
      color: '#0891B2',
      icon: '📊'
    },
    {
      id: 12,
      name: 'Robotics Engineering',
      code: 'BTH-RE-311',
      totalPapers: 20,
      solvedPapers: 13,
      pendingPapers: 7,
      color: '#EA580C',
      icon: '🤖'
    }
  ];

  // Calculate overall statistics
  const overallStats = {
    totalBranches: branches.length,
    totalPapers: branches.reduce((sum, branch) => sum + branch.totalPapers, 0),
   
  };

  const handleViewPapers = (branch) => {
    console.log('Viewing papers for:', branch.name);
    alert(`Opening ${branch.name} papers...`);
  };


  return (
    <div className="branch-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <h1 className="main-title">
              <span className="title-icon"></span>
              Branch by Course
            </h1>
            <p className="subtitle">Manage and access all course papers by branch</p>
          </div>
          
          <div className="header-stats">
            <div className="stat-card">
              <span className="stat-icon">🏛️</span>
              <div>
                <h3>{overallStats.totalBranches}</h3>
                <p>Total Branches</p>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">📄</span>
              <div>
                <h3>{overallStats.totalPapers}</h3>
                <p>Total Papers</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="branches-container">
<br />
          {/* Branches Grid */}
          <div className="branches-grid">
            {branches.map((branch) => {
            //   const completionPercentage = Math.round((branch.solvedPapers / branch.totalPapers) * 100);
              
              return (
                <div 
                  key={branch.id}
                  className="branch-card"
                  style={{
                    '--branch-color': branch.color,
                    '--branch-light': `${branch.color}15`
                  }}
                >
                  {/* Card Header */}
                  <div className="branch-card-header">
                    <div className="branch-icon" style={{ backgroundColor: `${branch.color}20` }}>
                      <span className="icon">{branch.icon}</span>
                    </div>
                    <div className="branch-title">
                      <h3 className="branch-name">{branch.name}</h3>
                      <p className="branch-code">Paper Code: {branch.code}</p>
                    </div>
                  </div>
{/* guygrgregre */}
                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button 
                      className="btn btn-view"
                      onClick={() => handleViewPapers(branch)}
                      style={{ backgroundColor: branch.color }}
                    >
                      View Papers
                    </button>
                    <button 
                      className="btn btn-solve"
                      onClick={() => handleViewSolved(branch)}
                      style={{ 
                        borderColor: branch.color,
                        color: branch.color
                      }}
                    >
                      View Solved
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p className="copyright">
            © {new Date().getFullYear()} University Portal. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="#" className="footer-link">Help Center</a>
            <a href="#" className="footer-link">Contact Support</a>
            <a href="#" className="footer-link">Privacy Policy</a>
          </div>
        </div>
      </footer>
      <ButtomNav/>
    </div>
  );
};

export default Bca;