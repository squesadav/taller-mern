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
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

import MainScreen from "../../MainScreen";
import notes from "../../data/myNotes";
import axios from "axios";

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      data: [],
      error: false,
    };

    this.onChangeError = this.onChangeError.bind(this);
  }

  async componentDidMount() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${this.state.userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/notes`, config);

      this.state.data = data;
      console.log(data);
      this.forceUpdate();
    } catch (error) {
      console.log(error);
    }
  }

  onChangeError(value) {
    this.setState({
      error: value,
    });
  }

  async editNote(id) {
    localStorage.setItem("noteInfo", JSON.stringify(id));
    window.location.replace("/createNotes");
  }

  async deleteNote(id) {
    console.log(id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${this.state.userInfo.token}`,
        },
      };

      const { data } = await axios.delete(`/api/notes/${id}`, config);
      window.location.reload();
    } catch (error) {
      this.onChangeError(true);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Link to="/createNotes">
            <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
              Create New Note
            </Button>
          </Link>
          {this.state.data.map((note) => (
            <Accordion defaultActiveKey={["0"]} key={note._id}>
              <Accordion.Item eventkey="0">
                <Card style={{ margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      <Accordion.Button as={Card.Text} variant="link">
                        {note.noteName}
                      </Accordion.Button>
                    </span>

                    <div>
                      <Button
                        onClick={() => {
                          this.editNote(note._id);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => {
                          this.deleteNote(note._id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventkey="0">
                    <Card.Body>
                      <blockquote className="blockquote mb-0">
                        <ReactMarkdown children={note.content} remarkPlugins={[remarkGfm]} />
                        
                        <footer className="blockquote-footer">
                          Created on {note.createdAt.substring(0, 10)}
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion.Item>
            </Accordion>
          ))}
        </Container>
      </React.Fragment>
    );
  }
}

//Accordion.Collapse eventKey='0'>
//</Accordion.Collapse>
