import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from "./components/pages/Home"
import Products from "./components/pages/API"
import Services from "./components/pages/Documentation"
import Auth from "./components/pages/Auth"
import My from './components/pages/App/My'
import Public from './components/pages/App/Public'
import Shared from './components/pages/App/Shared'
import New from './components/pages/App/New'
import Run from './components/pages/App/Run'
import Edit from './components/pages/App/Edit'
import Share from './components/pages/App/Share'
import Profile from './components/pages/Profile'
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/theme/theme'
import ProtectedRoute from './auth/protected-route'

const App = () => {

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/api" exact component={Products} />
            <Route path="/documents" exact component={Services} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/profile" exact component={Profile} />
            <Route path='/docs' exact component={() => {
              window.location.href = 'http://127.0.0.1:8000/';
              return null;
            }} />
            <ProtectedRoute path="/my" exact component={My} />
            <ProtectedRoute path="/shared" exact component={Shared} />
            <ProtectedRoute path="/public" exact component={Public} />
            <ProtectedRoute path="/new" exact component={New} />
            <ProtectedRoute path="/run" exact component={Run} />
            <ProtectedRoute path="/edit" exact component={Edit} />
            <ProtectedRoute path="/share" exact component={Share} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App