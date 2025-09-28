import Axios from "axios";
import React, { Component } from "react";
import "./Allcss.css";
import swal from "@sweetalert/with-react";
import DOMPurify from "dompurify";

export default class CreateAppBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      pname: "",
      mobile: "",
      date: "",
      email: "",
      nicpass: "",
      area: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { title, pname, mobile, date, email, nicpass, area } = this.state;

    const data = {
      title,
      pname,
      mobile,
      date,
      email,
      nicpass,
      area,
    };

    // Email and mobile validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!mobileRegex.test(mobile)) {
      swal("Invalid Contact Number!", "Mobile number should be 10 digits.", "error");
    } else if (!emailRegex.test(email)) {
      swal("Invalid Email!", "Please enter a valid email address.", "error");
    } else if (
      !title || !pname || !mobile || !date || !email || !nicpass || !area
    ) {
      swal("Please fill all the details");
    } else {
      Axios.post("http://localhost:5001/api/appbooking", data)
        .then((res) => {
          if (res.data.success || res.status === 200) {
            alert("Appointment Booked Successfully");
            this.props.history.push("/CAB");
            this.setState({
              title: "",
              pname: "",
              mobile: "",
              date: "",
              email: "",
              nicpass: "",
              area: "",
            });
          }
        })
        .catch((err) => {
          swal("Error", "Failed to book appointment.", "error");
        });
    }
  };

  render() {
    const {
      title, pname, mobile, date, email, nicpass, area,
    } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-lg nav">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button className="btn btn-success">
                    <a href="/HAB" style={{ textDecoration: "none", color: "white" }}>Details</a>
                  </button>
                  <button className="btn btn-success">
                    <a href="/dashboard2" style={{ textDecoration: "none", color: "white" }}>Dashboard</a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="card2" style={{ marginLeft: "15%" }}>
          <div className="card" style={{ width: "65rem" }}>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <center>
                  <h1 className="anm">My Appointment Booking</h1>
                </center>
                <br />

                {/* Title */}
                <div className="form-group mb-3">
                  <label>Title</label>
                  <select
                    name="title"
                    className="form-control"
                    onChange={this.handleInputChange}
                    value={title}
                  >
                    <option value="">Select Title</option>
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Mast</option>
                    <option>Dr</option>
                    <option>Prof</option>
                    <option>Baby</option>
                  </select>
                </div>

                {/* Name */}
                <div className="form-group mb-3">
                  <label>Patient Name</label>
                  <input
                    type="text"
                    name="pname"
                    className="form-control"
                    placeholder="Enter your name"
                    value={pname}
                    onChange={this.handleInputChange}
                  />
                </div>

                {/* Mobile */}
                <div className="form-group mb-3">
                  <label>Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    className="form-control"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={this.handleInputChange}
                  />
                </div>

                {/* Date */}
                <div className="form-group mb-3">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={date}
                    onChange={this.handleInputChange}
                  />
                </div>

                {/* Email */}
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={this.handleInputChange}
                  />
                </div>

                {/* NIC/Passport */}
                <div className="form-group mb-3">
                  <label>NIC/Passport</label>
                  <input
                    type="text"
                    name="nicpass"
                    className="form-control"
                    placeholder="Enter NIC or Passport number"
                    value={nicpass}
                    onChange={this.handleInputChange}
                  />
                </div>

                {/* Area */}
                <div className="form-group mb-3">
                  <label>Area</label>
                  <input
                    type="text"
                    name="area"
                    className="form-control"
                    placeholder="Enter your area"
                    value={area}
                    onChange={this.handleInputChange}
                  />
                </div>

                {/* Submit */}
                <center>
                  <button
                    type="submit"
                    className="btn btn-warning btn-lg text-dark mt-3"
                  >
                    <i className="far fa-check-square"></i>&nbsp; Save
                  </button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
