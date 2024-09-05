import React from 'react';
import './about.scss';

function About() {
  return (
    <div className="aboutPage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>About LamaEstate</h1>
            <button>Learn More</button>
          </div>
          <div className="info">
            <span>
              <img src="../../../public/team.png" alt="Team" />
              <p>At LamaEstate, we are dedicated to helping you find the perfect home...</p>
            </span>
            <span>
              <img src="../../../public/mission.png" alt="Mission" />
              <p>Our Mission: To deliver exceptional real estate services...</p>
            </span>
            <span>
              <img src="../../../public/award.png" alt="Awards" />
              <p>We have earned over 200 awards for our excellence in real estate...</p>
            </span>
          </div>
          <div className="modernExperience">
            <h2>Modernizing the Lama Estate Experience</h2>
            <p>Buying and selling lama estate is a difficult process to navigate because it is fragmented and complex. Your journey from your current home to your new home includes many steps — research, shop, tour, finance, appraise, inspect, negotiate an offer, close, and move — all with no central navigator.</p>
            <p><strong>Until now.</strong></p>
            <p>Zillow, the housing super app, solves these real pain points by providing seamless solutions integrated within the same ecosystem. With new functionality and features continuously improving the app and site, as well as connections to great agent partners and expert loan officers at Zillow Home Loans, Zillow offers a better experience for renters, buyers, and sellers.</p>
          </div>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <img src="../../../public/Estates/2.jpg" alt="Apartment1" />
          <img src="../../../public/Estates/3.jpg" alt="Apartment2" />
          <img src="../../../public/Estates/5.webp" alt="Apartment3" />
          <img src="../../../public/Estates/4.jpg" alt="Apartment4" />
        </div>
      </div>
    </div>
  );
}

export default About;

