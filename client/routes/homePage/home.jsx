import React, { useContext } from "react";
import "../homePage/home.scss";
import SearchBar from "../../components/searchbar/searchbar";
import { AuthContext } from "../../context/AuthContext";

function home() {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="text">
          <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Discover your perfect home with ease. Explore a wide range of
            properties, from cozy apartments to luxurious estates, all tailored
            to fit your lifestyle. Let us help you find your dream place—whether
            you're buying, renting, or investing, we're here to guide you every
            step of the way.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>

            <div className="box">
              <h1>200</h1>
              <h2>Awards Gained</h2>
            </div>

            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="bg.png" alt="" />
      </div>
    </div>
  );
}

export default home;
