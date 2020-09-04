import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppNavbar from './components/AppNavbar';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <h1>Hello, world!</h1>
        </div>
      </Router>
    );
  }
}

export default App;
