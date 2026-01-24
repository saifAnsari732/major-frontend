import React from 'react';
import './Footer.css';

function Footer() {

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Footer Content */}
                <div className="footer-content">
                    {/* Company Info */}
                    <div className="footer-section">
                        <h4>About MachineHub</h4>
                        <p>
                            Leading provider of industrial machinery solutions with over 20 years of experience in delivering quality equipment and exceptional customer service.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon" title="Facebook">f</a>
                            <a href="#" className="social-icon" title="Twitter">𝕏</a>
                            <a href="#" className="social-icon" title="LinkedIn">in</a>
                            <a href="#" className="social-icon" title="Instagram">📷</a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#products">Products</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                            <li><a href="#blog">Blog</a></li>
                        </ul>
                    </div>

                    {/* Products & Services */}
                    <div className="footer-section">
                        <h4>Products</h4>
                        <ul>
                            <li><a href="#robots">Industrial Robots</a></li>
                            <li><a href="#cnc">CNC Machines</a></li>
                            <li><a href="#hydraulic">Hydraulic Systems</a></li>
                            <li><a href="#welding">Welding Equipment</a></li>
                            <li><a href="#conveyor">Conveyor Systems</a></li>
                            <li><a href="#drilling">Drilling Machines</a></li>
                        </ul>
                    </div>

                     {/* Contact Info */}
                    <div className="footer-section flex-grow flex-row">
                        <h4>Contact Info</h4>
                        <p>📍 123 Industrial Park, Tech City 12345</p>
                        <p>📞 +1-800-MACHINE (624-2463)</p>
                        <p>📧 support@machinehub.com</p>
                        <p>⏰ Mon-Fri: 9AM-6PM EST</p>
                    </div>


                  
                </div>

                {/* Footer Bottom */}
             
            </div>
        </footer>
    );
}

export default Footer;
