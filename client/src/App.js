import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import MainForm from './components/MainForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/profile" component={Profile} />
            {/* <Route exact path="/main" component={MainForm} /> */}
          </div>
        </div>
      </Router>
    )
  }
}

export default App