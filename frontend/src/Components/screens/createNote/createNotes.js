import React, { Component } from 'react';
import { Button, Col, Container, Row , Card, Accordion ,Badge} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import MainScreen from '../../MainScreen';
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import './createNotes.css'


export default class createNotes extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);  
        this.setMarkdown = this.setMarkdown.bind(this);
        this.state = {
            name:'',
            markDown:'', 
            setMarkdown:''
        }
    }
    onChangeName(e) {
        this.setState({
            username: e.target.value
        })
    }
    setMarkdown(e){
        this.setState({
            markDown: e.target.value
        })
    }
    render(){
        return (
            <React.Fragment>
                <Container>
                    <Button variant="success">Save note</Button>
                    <Button variant="danger" className="mx-2">Cancel</Button>
                </Container>
                <Container >
                    <Card>
                    <Card.Header as="h5">
                    <input type="text" name="name" required
                        className="form-control" 
                        placeholder="Title..."
                        value={this.state.username}
                        onChange={this.onChangeName}>
                        </input>
                    </Card.Header>
                    <Card.Body>
                        <Container style={{display: 'flex'}} >
                        <textarea
                            value={this.markDown}
                            onChange={this.setMarkdown}
                            className="textarea"
                        ></textarea>
                        <div className="output">
                            <ReactMarkdown>{this.markDown}</ReactMarkdown>
                        </div>
                        </Container>
                    </Card.Body>
                    </Card>
                </Container>
            </React.Fragment>
        );
    } 
}


