import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import FlockList from "./components/flock-list.component";
import EditFlock from "./components/edit-flock.component";
import CreateFlock from "./components/create-flock.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <Router>
      
    <Navbar />
    <div className="container">
    <br/>
    <Route path="/" exact component={FlockList} />
    <Route path="/edit/:id" exact component={EditFlock}/>
    <Route path="/create" exact component={CreateFlock}/>
    <Route path="/user" exact component={CreateUser}/>
    </div>
    </Router>
  );
}

export default App;
