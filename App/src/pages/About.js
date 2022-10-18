import React, { Component } from "react";
import "./About.css";
import profile_pic_jess from "../assets/profile_pic_jess.jpg";

export default class About extends Component {
  render() {
    return (
      <div>
        <div>
          <div class="split left">
            <div className="centered">
              <img
                className="profile_image"
                src={profile_pic_jess}
                alt="Profile Pic"
              ></img>
            </div>
          </div>
          <div className="split right">
            <div className="centered">
              <div className="name_title">Jessyca Koufidissa</div>
              <div className="brief_description">
                My name is Jessyca Koufidissa. I am a rising sophomore at the
                University of Maine at Augusta studying Computer Information
                Systems. I currently live in Houston, Texas. My interests lie in
                coding, finance, stocks, and entrepreneurship. In my free time,
                I enjoy doing outdoor activities, reading, writing poetry,
                traveling, exercising, cooking, listening to podcasts, listening
                to music, learning new technology, playing video games, spending
                quality time with friends and family, and serving at my church.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
