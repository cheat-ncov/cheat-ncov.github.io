import React, { Component } from 'react'
import ListExam from './components/ListExam';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.scss'
import Exam from './components/Exam'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ListExam}>
          </Route>
          <Route path="/exam" component={Exam}>
          </Route>
        </Switch>
      </Router>
    )
  }
}

