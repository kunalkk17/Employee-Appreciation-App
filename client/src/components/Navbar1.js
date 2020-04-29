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
        <div className="ui fluid small inverted menu">
          <Link to="/" className="item active">
            About
          </Link>
          <Link to="/login" className="item ">
            Login
          </Link>
          <Link to="/register" className="item">
            Register
          </Link>
          </div>
        
    )

    const userLink = (
        <div className="ui fluid small inverted menu">
          <Link to="/home" className="item"><i className="home icon"></i>
            Home
          </Link>
          <Link to="/about" className="item"><i className="info icon"></i>
            About
          </Link>
          {/* <div className="ui category search item">
                <div className="ui icon input">
                  <input className="prompt" type="text" placeholder="Search users..."/>
                  <i className="search icon"></i>
                </div>
                <div className="results"></div>
              </div> */}
              <div className="right menu">
              <div className="item">
              <div className="ui right floated primary button" onClick={this.logOut.bind(this)} style={ {background:'#1EA896',color:'white'}}>
              <i className="sign out alternate icon"></i>
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