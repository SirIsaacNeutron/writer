import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store'

import AppNavbar from './components/AppNavbar';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <h1>Hello, world!</h1>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
