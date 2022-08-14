import "./App.css";
import React from 'react';
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import LandingPage from "./Components/screens/LandingPage/LandingPage";
import myNotes from "./Components/screens/myNotes/myNotes";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
const App= () => (
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" exact element={ <LandingPage/> } />
      <Route path="/notes" exact element={ <myNotes/> } />
      <Route path="/Login" exact element={ <LogIn/> } />
      <Route path="/SignUp" exact element={ <SignUp/> } />
    </Routes>
    <Footer/>
  </BrowserRouter>
);
   

export default App;
