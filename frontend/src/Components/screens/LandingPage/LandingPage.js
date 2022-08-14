import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './LandingPage.css'
import { Link } from 'react-router-dom'
const LandingPage = () => {
  return (
    <div className='main'>
      <Container>
        <Row>
            <div className='intro-text'>
                <div>
                    <h1 className='title'>
                        Welcome to... NoteDev
                    </h1>
                </div>
                <div className='buttonContainer'>
                        <a href='/login'>
                            <Button size="lg" className='landingbutton' >
                                <Link to='/login'/>
                                Login
                            </Button>
                        </a>

                        <a href='/SignUp'>
                            <Button size="lg" className='landingbutton' >
                              <Link to='/SignUp'/>
                                Sign Up
                            </Button>
                        </a>
                </div>
            </div>
        </Row>
      </Container>
    </div>
  )
}

export default LandingPage
