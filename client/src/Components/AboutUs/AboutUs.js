import React, { Component } from "react";
import "./AboutUs.css";

export default class AboutUs extends Component {
  render() {
    return (
      <div>
        <nav class="navbar b">
          <div class="container">
            <form class="d-flex nav1 " role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={this.handleSearchArea}
              ></input>
              &nbsp;
              <button class="btn btn-outline-warning " type="submit">
                Search
              </button>
            </form>
            <a class="navbar-brand" href="#"></a>
          </div>
        </nav>
        <div class="about-section typewriter">
          <h1>About Us.</h1>
          <br />
          <br />
          <br />
          <br />
          <br />

          <p>
            {" "}
            <a href="#" class="bmstxt">
              YoursDoc{" "}
            </a>{" "}
            operated by Digital Health Private Limited is India’s pioneering
            digital health solutions service provider, offering medical services
            to subscribers from the convenience of their mobile phone. A
            subsidiary of India’s premier connectivity providers with its
            footprint as the digital platform enabler at leading private
            hospitals groups, Digital Health aims to implement and develop a
            state-of-the-art, integrated, e-commerce infrastructure for India’s healthcare sector.
            <a href="#" class="bmstxt">
              {" "}
              YoursDoc{" "}
            </a>{" "}
            aims to connect more than 5000 doctors in over 140 countries within
            five years of its inception, through its digital health platform
            which is accessible to users via www.yoursdoc.com, by dialing 990 or
            via the Suwa Arana app, available both on Android and iOS. Suwa
            Arana currently offers a range of medical services including doctor
            channelling sessions at hospitals island wide for physical
            consultations while connecting qualified Doctors, quality pharmacies
            and laboratories virtually through digital health tech with the aim
            of transforming the delivery of integrated healthcare through home
            based solution.
          </p>
          <br />
          <br />
          <br />

          <p>
            The service is open and available to all 1.4 billion plus Indian’s and we at Digital Health aim to transform the health care
            service sector and experience for all India’s and serve as the
            benchmark for integrated e-commerce healthcare solutions in the
            Asia-Pacific region.
          </p>
        </div>
      </div>
    );
  }
}
