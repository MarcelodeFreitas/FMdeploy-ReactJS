import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import Services from "./components/pages/Services";
import Auth from "./components/pages/Auth";
import React, { useState } from 'react'


function App() {
  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Login = (email, password) => {
    console.log(email, password);
    return (email, password)
  }

  const Logout = () => {
    console.log("Logout");
    return true
  }

  return (
    <>
      <Router>
        <Navbar/>
        
          {(user.email != "") ? (
            <div>
              <p>logged in</p>
            </div>
          )
        :
        (
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/products" exact component={Products}/>
            <Route path="/services" exact component={Services}/>
            <Route path="/auth" exact component={Auth}/>
          </Switch>
          
        )}
        
      </Router>
    </>
  );
}

export default App;
