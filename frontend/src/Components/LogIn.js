import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, Redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

export default class LogIn extends Component {
  constructor(props) {
    super(props);

    this.onChangeusername = this.onChangeusername.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onChangenoMatch = this.onChangenoMatch.bind(this);
    this.onChangeloading = this.onChangeloading.bind(this);

    this.state = {
      username: "",
      password: "",
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
        "/api/users/login",
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

  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <logHelperConsumer>
              <div className="row">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  required
                  className="form-control"
                  placeholder="Your username......"
                  value={this.state.username}
                  onChange={this.onChangeusername}
                ></input>

                <label>Password</label>
                <input
                  type="password"
                  secureTextEntry={true}
                  name="password"
                  required
                  className="form-control"
                  placeholder="Your password......"
                  value={this.state.password}
                  onChange={this.onChangepassword}
                ></input>
              </div>

              {this.state.noMatch ? (
                <label>Username or Password incorrect!</label>
              ) : (
                <label></label>
              )}

              <div className="row">
                <div className="col-10 mx-auto my-2 text-center">
                  {this.state.loading && <Loading></Loading>}
                  <Button
                    onClick={() => {
                      this.validateData(
                        this.state.username,
                        this.state.password
                      );
                    }}
                  >
                    Log in
                  </Button>
                </div>
              </div>
              <div className="row">
                <div className="col-10 mx-auto my-2 text-center">
                  <Link to="/" className="ml-auto">
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </logHelperConsumer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
