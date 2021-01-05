import React, { Component } from 'react';
import {
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom';
import Register from './pages/Register';
import StudentList from './pages/StudentList';
import { Container } from 'reactstrap';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Container fluid>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Register} />
            <Route exact path='/student-registration' component={Register} />
            <Route exact path='/view-students' component={StudentList} />
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;