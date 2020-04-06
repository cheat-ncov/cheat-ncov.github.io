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

  constructor(props) {
    super(props);
    this.state = {
      data : [
        {
          code: 'MLN40_FE_2932',
          upload_date: '2020-08-12 12:20:20' 
        },
        {
          code: 'MLN40_FE_2932',
          upload_date: '2020-08-12 12:20:20' 
        },
        {
          code: 'MLN40_FE_2932',
          upload_date: '2020-08-12 12:20:20' 
        },
        {
          code: 'MLN40_FE_2932',
          upload_date: '2020-08-12 12:20:20' 
        },
      ]
    };
  }
  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <ListExam data={this.state.data} />
          </Route>
          <Route path="/exam">
            <Exam></Exam>
          </Route>
        </Switch>
      </Router>
    )
  }
}

