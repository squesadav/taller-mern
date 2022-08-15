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
import notes from "../../data/myNotes";
import axios from "axios";

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/notes")
      .then((response) => {
        this.state.data = response.data;
      })
      .finally(() => {
        this.forceUpdate();
      });
  }

  deleteHandler(id) {
    console.log("ok");
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
                        {note.title}
                      </Accordion.Button>
                    </span>

                    <div>
                      <Button href={`/note/${note._id}`}>Edit</Button>
                      <Button variant="danger" className="mx-2">
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  <Accordion.Collapse eventkey="0">
                    <Card.Body>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Creater on - date
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
