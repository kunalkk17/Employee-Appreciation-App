import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Landing extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }

  render() {
    const loginRegLink = (
        <div class="ui fluid small inverted menu">
          <Link to="/" class="item active">
            About
          </Link>
          <Link to="/login" class="item ">
            Login
          </Link>
          <Link to="/register" class="item">
            Register
          </Link>
          </div>
        
    )

    const userLink = (
        <div class="ui fluid small inverted menu">
          <Link to="/home" class="item"><i class="home icon"></i>
            Home
          </Link>
          <Link to="/about" class="item"><i class="info icon"></i>
            About
          </Link>
          {/* <div class="ui category search item">
                <div class="ui icon input">
                  <input class="prompt" type="text" placeholder="Search users..."/>
                  <i class="search icon"></i>
                </div>
                <div class="results"></div>
              </div> */}
              <div class="right menu">
              <div class="item">
              <div class="ui right floated primary button" onClick={this.logOut.bind(this)} style={ {background:'#1EA896',color:'white'}}>
              <i class="sign out alternate icon"></i>
                              Sign out
                            </div>
                  
              </div>
            </div>
          
       </div>
    )

    return (
      <div>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      
    )
  }
}

export default withRouter(Landing)