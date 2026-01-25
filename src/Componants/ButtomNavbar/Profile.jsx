import React, { useState } from 'react';
import './Profile.css';
import ButtomNav from '../ButtomNav';
import Navbar from '../Navbar';

const Profile = () => {
  // Sample user data - can be replaced with actual user data
  const [userData] = useState({
    name: 'Sarah Anderson',
    bio: 'Creative Designer | Tech Enthusiast | Coffee Lover',
    email: 'sarah.anderson@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    joinDate: 'Joined March 2023',
    followers: 1234,
    following: 567,
    posts: 89,
    about: 'Passionate about creating beautiful digital experiences. Always learning, always growing. Let\'s connect!',
    skills: ['UI/UX Design', 'React', 'JavaScript', 'CSS', 'Figma', 'Web Design'],
    socialLinks: [
      { platform: 'Twitter', url: '#', icon: '𝕏' },
      { platform: 'LinkedIn', url: '#', icon: '💼' },
      { platform: 'Instagram', url: '#', icon: '📷' },
      { platform: 'GitHub', url: '#', icon: '🐙' }
    ]
  });


  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="profile-container">
      {/* Cover Image */}
      <div className="profile-cover">
        <img src={userData.coverImage} alt="Cover" className="cover-img" />
        <div className="cover-overlay"></div>
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-main">
          {/* Profile Image */}
          <div className="profile-image-wrapper">
            <img src={userData.profileImage} alt={userData.name} className="profile-image" />
            <div className="online-status"></div>
          </div>

          {/* User Info Section */}
          <div className="user-info">
            <h1 className="user-name">{userData.name}</h1>
            <p className="user-bio">{userData.bio}</p>
            <p className="join-date">{userData.joinDate}</p>

            {/* Location & Contact */}
            <div className="contact-info">
              <span className="info-item">📍 {userData.location}</span>
              <span className="info-item">📧 {userData.email}</span>
              <span className="info-item">📱 {userData.phone}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="profile-actions">
            <button 
              className={`btn-follow ${isFollowing ? 'following' : ''}`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? '✓ Following' : '+ Follow'}
            </button>
            <button className="btn-message">💬 Message</button>
          
          </div>
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-value">{userData.posts}</div>
            <div className="stat-label">Posts</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{userData.followers}</div>
            <div className="stat-label">Followers</div>
          </div>

        </div>
      </div>

     <ButtomNav/>
    </div>
  );
};

export default Profile;
