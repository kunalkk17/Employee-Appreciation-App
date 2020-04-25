import React, { Component } from 'react'
import { register } from '../client/src/components/UserFunctions'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      userName: '',
      employeeId: '',
      password: '',
      password2:'',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      name: this.state.name,
      userName: this.state.userName,
      employeeId: this.state.employeeId,
      password: this.state.password,
      password2: this.state.password2
    }

    register(newUser).then(res => {
      this.props.history.push(`/login`)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">User name</label>
                <input
                  type="text"
                  className="form-control"
                  name="userName"
                  placeholder="Enter your User name"
                  value={this.state.userName}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="employeeId">Employee Id</label>
                <input
                  type="employeeId"
                  className="form-control"
                  name="employeeId"
                  placeholder="Enter employeeId"
                  value={this.state.employeeId}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  placeholder="Confirm Password"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register