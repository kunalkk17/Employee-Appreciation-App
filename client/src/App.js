import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar1'
import Landing from './components/Landing'
import UsersList from './components/UsersList'
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
            <Route exact path="/home" component={UsersList} />
            <Route exact path="/about" component={Landing} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App