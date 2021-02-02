import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Home from './Pages/Home/Components/Login/Home';
import Register from './Pages/Register/Register';
import Footer from './Pages/Components/Footer';
import Login from './Pages/Login/Login';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#a60ae4',
    },
    secondary: {
      main: '#4b58d2',
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
