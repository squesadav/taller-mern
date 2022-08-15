import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

function MainScreen({ children, title }) {
    return (
      <div className="mainback">
        <Container>
          <Row>
            <div className="page">
              {title && (
                <>
                  <h1 className="heading">{title}</h1>
                  <hr />
                </>
              )}
              {children}
            </div>
          </Row>
        </Container>
      </div>
    );
  }
  
  export default MainScreen;
