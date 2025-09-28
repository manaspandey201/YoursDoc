import React, { Component } from "react";
import axios from "axios";
import "./Allcss.css";

export default class AppBookingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/api/appbooking/${id}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({ post: res.data.post });
        }
      })
      .catch((err) => {
        console.error("Error fetching appointment details:", err);
      });
  }

  render() {
    const { title, pname, mobile, date, email, nicpass, area } = this.state.post;

    return (
      <div className="container mt-4">
        <nav className="navbar b mb-4">
          <div className="container">
            <form className="d-flex nav1" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              &nbsp;
              <button className="btn btn-outline-warning" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>

        <div className="card p-4 shadow-sm rounded bg-light">
          <h4 className="mb-3">Appointment Details</h4>
          <p><strong>Title:</strong> {title}</p>
          <p><strong>Patient Name:</strong> {pname}</p>
          <p><strong>Mobile:</strong> {mobile}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>NIC/Passport:</strong> {nicpass}</p>
          <p><strong>Area:</strong> {area}</p>
        </div>
      </div>
    );
  }
}
