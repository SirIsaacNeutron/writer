import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';

import store from './store'

import AppNavbar from './components/AppNavbar';
import UsersList from './components/UsersList';
import CreatePost from './components/CreatePost';
import PostView from './components/PostView';
import UserView from './components/UserView';
import Home from './components/Home';

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
              <Route path="/" exact component={Home} />
              <Route path="/users" exact component={UsersList}/>
              <Route path="/users/:id/" component={UserView} />
              <Route path='/create-post' component={CreatePost} />
              <Route path='/posts/:id' component={PostView} />
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
