import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { getProfile } from './UserFunctions'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      users:null
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    console.log(decoded);
    console.log(token)
    getProfile(token).then(res => {
      //console.log("inside login")
      if (res) {
        console.log(res)
        this.setState({
          users:res
        })
      }
    })
    
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Users</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              {
                this.state.users?
                this.state.users.map((item,i)=>
                <tr>---{item.name}</tr>
                ):null
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Profile