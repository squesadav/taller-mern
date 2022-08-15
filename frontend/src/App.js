import "./App.css";
import React from 'react';
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import LandingPage from "./Components/screens/LandingPage/LandingPage";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import Notes from "./Components/screens/myNotes/Notes";
import CreateNote from "./Components/screens/createNote/createNotes";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const App= () => (
  <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" exact element={ <LandingPage/> } />
      <Route path="/notes" exact element={ <Notes/> } />
      <Route path="/Login" exact element={ <LogIn/> } />
      <Route path="/createNotes" exact element={ <CreateNote/> } />
      <Route path="/SignUp" exact element={ <SignUp/> } />
    </Routes>
    <Footer/>
  </BrowserRouter>
);
   

export default App;

