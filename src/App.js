import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import Services from "./components/pages/Services";
import Auth from "./components/pages/Auth";
import React from 'react';
import StoreProvider from './components/Store/Provider';
import RoutesPrivate from './components/Routes/Private/Private';
import Main from './components/pages/App/Main'

function App() {

  return (
    <>
      <BrowserRouter>
        <StoreProvider>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/products" exact component={Products}/>
              <Route path="/services" exact component={Services}/>
              <Route path="/auth" exact component={Auth}/>
              <RoutesPrivate path="/app" exact component={Main}/>
            </Switch>
        </StoreProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
