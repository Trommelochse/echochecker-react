import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppContainer from './components/AppContainer.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <AppContainer />
      </ MuiThemeProvider>
    );
  }
}

export default App;
