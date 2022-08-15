import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import Loading from "./Loading";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onChangeusername = this.onChangeusername.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangenombreCompleto = this.onChangenombreCompleto.bind(this);
    this.onChangefechaNacimiento = this.onChangefechaNacimiento.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangenoMatch = this.onChangenoMatch.bind(this);
    this.onChangeloading = this.onChangeloading.bind(this);

    this.state = {
      username: "",
      password: "",
      nombreCompleto: "",
      fechaNacimiento: new Date(),
      noMatch: "",
      email: "",
      noMatch: false,
      loading: false,
    };
  }
  componentDidMount() {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      window.location.replace("/notes");
    }
  }

  onChangeusername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangepassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangenombreCompleto(e) {
    this.setState({
      nombreCompleto: e.target.value,
    });
  }

  onChangefechaNacimiento(date) {
    this.setState({
      fechaNacimiento: date,
    });
  }

  onChangeemail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  async validateData(username, password) {
    this.onChangenoMatch(false);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      this.onChangeloading(true);

      const { data } = await axios.post(
        "/api/users",
        {
          username,
          password,
        },
        config
      );

      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));

      this.onChangeloading(false);
      window.location.replace("/notes");
    } catch (error) {
      this.onChangenoMatch(true);
      this.onChangeloading(false);
    }
  }

  onChangenoMatch(value) {
    this.setState({
      noMatch: value,
    });
  }

  onChangeloading(value) {
    this.setState({
      loading: value,
    });
  }

  render() {
    return (
      <div className="container py-5">
        {/* Body */}
        <div className="row">
          <div className="col-10 mx-auto col-md-6 my-3">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                required
                className="form-control"
                placeholder="Your new user......"
                value={this.state.username}
                onChange={this.onChangeusername}
              ></input>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                secureTextEntry={true}
                required
                className="form-control"
                placeholder="Your password......"
                value={this.state.password}
                onChange={this.onChangepassword}
              ></input>
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                required
                className="form-control"
                placeholder="Your full name......"
                value={this.state.nombreCompleto}
                onChange={this.onChangenombreCompleto}
              ></input>
            </div>

            <div className="form-group">
              <label>Email Adress</label>
              <input
                type="text"
                name="fullname"
                required
                className="form-control"
                placeholder="Your email adress......"
                value={this.state.email}
                onChange={this.onChangeemail}
              ></input>
            </div>

            <div className="form-group">
              <label>Birthday </label>
              <div>
                <DatePicker
                  name="birthday"
                  selected={this.state.fechaNacimiento}
                  onChange={this.onChangefechaNacimiento}
                />
              </div>
            </div>

            <div>{this.state.noMatch}</div>

            <Button
              onClick={() => {
                this.validateData(this.state.username, this.state.password);
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
