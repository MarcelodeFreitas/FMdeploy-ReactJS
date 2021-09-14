import './App.css'
import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from "./components/pages/Home"
import Products from "./components/pages/Products"
import Services from "./components/pages/Services"
import Auth from "./components/pages/Auth"
import StoreProvider from './components/Store/Provider'
import RoutesPrivate from './components/Routes/Private/Private'
import My from './components/pages/App/My'
import Public from './components/pages/App/Public'
import Shared from './components/pages/App/Shared'
import New from './components/pages/App/New'
import Run from './components/pages/App/Run'
import Edit from './components/pages/App/Edit'
import Share from './components/pages/App/Share'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <StoreProvider>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/products" exact component={Products}/>
              <Route path="/services" exact component={Services}/>
              <Route path="/auth" exact component={Auth}/>
              <Route path='/docs' exact component={() => { 
                  window.location.href = 'http://127.0.0.1:8000/'; 
                  return null;
              }}/>
              <RoutesPrivate path="/my" exact component={My}/>
              <RoutesPrivate path="/shared" exact component={Shared}/>
              <RoutesPrivate path="/public" exact component={Public}/>
              <RoutesPrivate path="/new" exact component={New}/>
              <RoutesPrivate path="/run" exact component={Run}/>
              <RoutesPrivate path="/edit" exact component={Edit}/>
              <RoutesPrivate path="/share" exact component={Share}/>
            </Switch>
        </StoreProvider>
      </BrowserRouter>
    </>
  )
}

export default App