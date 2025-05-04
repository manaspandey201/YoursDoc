import React, { Component } from "react";
import "./ContactUs.css";

export default class ContactUs extends Component {
  render() {
    return (
      <div>
        <div class="about-section typewriter">
          <h1>
            {" "}
            <b>Contact Us.</b>
          </h1>
          <br />
          <br />
          <i class="fas fa-map-marker-alt"></i>
          <div class="topic">
            <b>Address</b>
          </div>
          <div class="text-one">BBD University</div>
          <div class="text-two">Lucknow, India</div>
          <br />
          <br />

          <i class="fas fa-phone-alt"></i>
          <div class="topic">
            <b>Phone</b>
          </div>
          <div class="text-one">9100000019</div>
          <div class="text-two">9155555123</div>
          <br />
          <br />

          <i class="fas fa-envelope"></i>
          <div class="topic">
            <b>Email</b>
          </div>
          <div class="text-one">yoursdoc123@gmail.com</div>
        </div>
      </div>
    );
  }
}
