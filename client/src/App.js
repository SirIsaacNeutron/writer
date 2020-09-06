import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';

import store from './store'

import AppNavbar from './components/AppNavbar';
import { loadUser } from './actions/authActions';

class App extends React.Component {
  componentDidMount() {
    // If the user re-loads the website without having logged out,
    // check if he's still logged in
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />

            <Container>
              <h2>Hello, world!</h2>
              <p>Test paragraph</p>
              <footer>
                <small><a href="https://github.com/SirIsaacNeutron/writer">Source Code</a></small>
              </footer>
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
