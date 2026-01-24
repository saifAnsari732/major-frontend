import React from 'react';
import './Categorycard.css';
import { useNavigate } from 'react-router-dom';

const CategoryListing = () => {
  const  navigate=useNavigate();
  // Course categories data with logos
  const categories = [
    {
      id: 1,
      name: 'B.Tech',
      logo: '🎓',
      color: '#2563EB',
      subtext: 'Bachelor of Technology',
      courseCount: "VIEW"
    },
    {
      id: 2,
      name: 'MCA',
      logo: '💻',
      color: '#059669',
      subtext: 'Master of Computer Applications',
      courseCount: '85+ Courses'
    },
    {
      id: 3,
      name: 'Diploma',
      logo: '📜',
      color: '#DC2626',
      subtext: 'Diploma Programs',
      courseCount: '200+ Courses'
    },
    {
      id: 4,
      name: 'BSC',
      logo: '🔬',
      color: '#7C3AED',
      subtext: 'Bachelor of Science',
      courseCount: '150+ Courses'
    },
    {
      id: 5,
      name: 'MSC',
      logo: '🧪',
      color: '#EA580C',
      subtext: 'Master of Science',
      courseCount: '110+ Courses'
    },
    {
      id: 6,
      name: 'BCA',
      logo: '🖥️',
      color: '#0D9488',
      subtext: 'Bachelor of Computer Applications',
      courseCount: '95+ Courses'
    },
    {
      id: 7,
      name: 'MBA',
      logo: '📈',
      color: '#C026D3',
      subtext: 'Master of Business Administration',
      courseCount: '130+ Courses'
    },
    {
      id: 8,
      name: 'BBA',
      logo: '🏢',
      color: '#65A30D',
      subtext: 'Bachelor of Business Administration',
      courseCount: '80+ Courses'
    },
    {
      id: 9,
      name: 'LLB',
      logo: '⚖️',
      color: '#4B5563',
      subtext: 'Bachelor of Laws',
      courseCount: '60+ Courses'
    },
    {
      id: 10,
      name: 'B.Arch',
      logo: '🏛️',
      color: '#E11D48',
      subtext: 'Bachelor of Architecture',
      courseCount: '45+ Courses'
    },
    {
      id: 11,
      name: 'B.Pharm',
      logo: '💊',
      color: '#0284C7',
      subtext: 'Bachelor of Pharmacy',
      courseCount: '55+ Courses'
    },
    {
      id: 12,
      name: 'B.Com',
      logo: '💰',
      color: '#F59E0B',
      subtext: 'Bachelor of Commerce',
      courseCount: '100+ Courses'
    }
  ];

  const handleCategoryClick = () => {
    navigate('/branch');
  };

  return (
    <div className="category-listing-container">
      {/* Header Section */}
      <header className="listing-header">

        <h2 className="page-title">Course Categories</h2>
        <p className="page-subtitle">
          Browse through our wide range of university courses and programs
        </p>
      </header>

      {/* Categories Grid */}
      <main className="categories-main">
     

        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
              style={{
                '--category-color': category.color,
                '--category-hover': `${category.color}20`
              }}
            >
              <div className="card-logo">
                <span className="logo-display">{category.logo}</span>
              </div>
              <div className="card-content">
                <h4 className="category-name">{category.name}</h4>
                {/* <p className="category-subtext">{category.subtext}</p> */}
                <div className="course-count">
                 <button className='text-1xl text-black border-b-2 font-semibold'>VIEW</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <footer className="listing-footer">
          <p>Need help choosing a course? <a href="#" className="help-link">Talk to our counselors</a></p>
          <div className="footer-actions">
            <button className="action-btn btn-primary">
              View All Programs →
            </button>
            <button className="action-btn btn-secondary">
              Compare Courses
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CategoryListing;