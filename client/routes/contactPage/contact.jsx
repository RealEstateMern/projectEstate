import React from 'react';
import './contact.scss';

function Contact() {
  return (
    <div className="contactPage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>Contact LamaEstate</h1><br />
            <p>If you have any questions or inquiries, feel free to reach out to us using the form below.</p>
          </div>
          <form className="contactForm">
            <div className="inputGroup">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="inputGroup">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="inputGroup">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
      <div className="rightSide">
        <div className="wrapper">
          <div className="operatingHours">
            <h2>Operating Hours</h2>
            <ul>
              <li>Monday - Friday: 9 AM - 5 PM</li>
              <li>Saturday: 10 AM - 2 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          <div className="faq">
            <h2>Frequently Asked Questions</h2>
            <ul>
              <li><strong>What is LamaEstate?</strong> <br /> LamaEstate is a real estate service dedicated to helping you find your perfect home.</li>
              <li><strong>How can I get in touch with you?</strong> <br /> You can contact us through the form on this page, or by email at support@lamaestate.com.</li>
              <li><strong>What services do you offer?</strong> <br /> We offer a range of real estate services including buying, selling, and renting properties.</li>
            </ul>
          </div>
          <div className="socialMedia">
            <h2>Follow Us</h2>
            <div className="socialLinks">
              <a href="https://www.facebook.com/LamaEstate" target="_blank" rel="noopener noreferrer" className="socialLink">
                <img src="../../../public/Social Media/facebook.png" alt="Facebook" />
              </a>
              <a href="https://twitter.com/LamaEstate" target="_blank" rel="noopener noreferrer" className="socialLink">
                <img src="../../../public/Social Media/twitter.jpg" alt="Twitter" />
              </a>
              <a href="https://www.instagram.com/LamaEstate" target="_blank" rel="noopener noreferrer" className="socialLink">
                <img src="../../../public/Social Media/instagram.webp" alt="Instagram" />
              </a>
              <a href="https://www.linkedin.com/company/lamaestate" target="_blank" rel="noopener noreferrer" className="socialLink">
                <img src="../../../public/Social Media/linkedin.png" alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
