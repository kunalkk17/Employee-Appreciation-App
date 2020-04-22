import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar1'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import UsersList from './components/UsersList'
import MainForm from './components/MainForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import UserDetail from './components/UserDetail'

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
            <Route exact path="/main/:id" component={MainForm} />
            <Route exact path="/user/:id" component={UserDetail} />
            <Route exact path="/about" component={Landing} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App