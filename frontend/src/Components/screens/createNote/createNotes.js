import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Card,
  Accordion,
  Badge,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import MainScreen from "../../MainScreen";
import ReactMarkdown from "react-markdown";
import ReactDom from "react-dom";
import "./createNotes.css";
import axios from "axios";

export default class createNotes extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.setMarkdown = this.setMarkdown.bind(this);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      name: "",
      markDown: "",
      noteId: "",
      new: true,
    };
  }

  async componentDidMount() {
    const noteInfo = JSON.parse(localStorage.getItem("noteInfo"));

    if (!this.state.userInfo) {
      window.location.replace("/");
    }

    if (noteInfo) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${this.state.userInfo.token}`,
          },
        };

        const { data } = await axios.get(`/api/notes/${noteInfo}`, config);

        this.state.name = data.noteName;
        this.state.markDown = data.content;
        this.state.noteId = data._id;
        this.state.new = false;
        this.forceUpdate();
        localStorage.removeItem("noteInfo");
      } catch (error) {
        console.log(error);
      }
    }
  }

  async updateNote() {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${this.state.userInfo.token}`,
        },
      };

      const noteName = this.state.name;
      const content = this.state.markDown;

      if (this.state.new) {
        const { data } = await axios.post(
          `/api/notes/create`,
          { noteName: noteName, content: content },
          config
        );
        this.state.noteId = data._id;
        console.log(data);
        this.state.new = false;
      } else {
        const { data } = await axios.put(
          `/api/notes/${this.state.noteId}`,
          { noteName: noteName, content: content },
          config
        );

        console.log(data);
      }

      console.log("Salvado");

      //Aqui viene un mensaje de salvado
    } catch (error) {
      console.log(error);
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  setMarkdown(e) {
    this.setState({
      markDown: e.target.value,
    });
  }
  render() {
    return (
      <React.Fragment>
        <Container>
          <Button
            variant="success"
            onClick={() => {
              this.updateNote();
            }}
          >
            Save note
          </Button>
          <Link to="/notes">
            <Button variant="danger" className="mx-2">
              Cancel
            </Button>
          </Link>
        </Container>
        <Container>
          <Card>
            <Card.Header as="h5">
              <input
                type="text"
                name="name"
                required
                className="form-control"
                placeholder="Title..."
                value={this.state.name}
                onChange={this.onChangeName}
              ></input>
            </Card.Header>
            <Card.Body>
              <Container style={{ display: "flex" }}>
                <textarea
                  value={this.state.markDown}
                  onChange={this.setMarkdown}
                  className="textarea"
                ></textarea>
                <div className="output">
                  <ReactMarkdown>{this.state.markDown}</ReactMarkdown>
                </div>
              </Container>
            </Card.Body>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}
