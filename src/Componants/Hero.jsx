import '../styles/Hero.css';
import CategoryCard from './All-course.jsx/CategoryCard ';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Hero() {
  return (
    <> 
    <Navbar/>
    <section className="hero">
      {/* Background Elements */}
      <div className="hero-background">
        <div className="gradient-shape shape-1"></div>
        <div className="gradient-shape shape-2"></div>
        <div className="gradient-shape shape-3"></div>
      </div>

      {/* Background Image Overlay */}
      <div className="hero-bg">
        <img src="/muit.jpeg" alt="Hero background" />
      </div>

      {/* Main Content */}
      <div className="hero-content">
        <h1 className="hero-title">WELCOME TO <span className='text-teal-500'>SAVS</span> PLATFORM</h1>
        <h2 className="hero-subtitle-main">Learn Smart. Practice Better. Succeed Faster</h2>
        <p className="hero-description">
          Your one-stop learning platform for quality study material, expert guidance, and previous year question papers for exams and universities.
        </p>
        
        {/* Call-to-Action Buttons */}
        <div className="hero-buttons">
          <button className="cta-button cta-primary">LEARN</button>
          <button className="cta-button cta-secondary">QUICK START</button>
        </div>
      </div>
    </section>
      <CategoryCard/>


    
      <Footer/>
    </>
  );
}
