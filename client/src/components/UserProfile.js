import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { getProfile } from './UserFunctions'
import Logo from "./../Images/img2.png"
import { Label,Button} from 'semantic-ui-react';
import CoinHistory from './CoinHistory.js'
import RewardsHistory from './RewardsHistory.js'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      users:null,
      userToShow:{},
      showRewards:true,
      showCoinHistory:false,
    }
  }

  handleClick=()=>{
    console.log(this.state)
    this.setState({
      showRewards:!this.state.showRewards,
      showCoinHistory:!this.state.showCoinHistory
    })
  }

  componentDidMount() {
    // const decodedToken = jwt_decode(localStorage.usertoken);
    // console.log(decodedToken);
    //  const userId = decodedToken.id;
    //  console.log(userId);
    //  const user = this.props.usersList;
    //  console.log(this.props.usersList);
    //this.setState({userToShow:})
  }
  

  render() {
    // const decodedToken = jwt_decode(localStorage.usertoken);
    // const user = this.props.usersList.find((user)=>user._id===decodedToken.id);
    // //this.setState({userToShow:user})
    // console.log(this.state.userToShow);
    const activated = {
      background: "transparent",
      color: "black",
      border: "1px solid "
    };

    
    
    return (
      <div class="card-container">

		<div class="upper-container">
			<div class="image-container">
				<img src={Logo} />
			</div>
		</div>

		<div class="lower-container">
			<div>
				<h3>{this.props.activeUser.name}</h3>
    <div style={{textAlign:"center"}}><Label>IT Department</Label><Label>Employee Id : {this.props.activeUser.employeeId}</Label></div>
				<h5>Rewards &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp; Coin Balance</h5>
			</div>
			<div>
			
			</div>
			<div>
				<span>
        <label class="btn"> <i class="copyright icon"></i>{this.props.activeUser.rewards} Coins</label>&emsp;&emsp;&emsp;&nbsp;&nbsp;<a href="#" class="btn"> <i class="copyright icon"></i>{this.props.activeUser.coinBalance} Coins</a>
        </span>
			</div>
      {this.state.showRewards?<div><Button style={activated} onClick={this.handleClick}>Show Rewards</Button>
      <Button onClick={this.handleClick}>Show Coin Hoistory</Button>
      <RewardsHistory/>
      </div>
      :<div><Button onClick={this.handleClick}>Show Rewards</Button>
      <Button style={activated} onClick={this.handleClick}>Show Coin Hoistory</Button>
      <CoinHistory user={this.props.activeUser}/>
      </div>}
      
		</div>

	</div>
    )
  }
}

export default Profile