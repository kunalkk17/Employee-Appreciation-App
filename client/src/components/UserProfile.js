import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { getProfile } from './UserFunctions'
import Logo from "./../Images/img2.png"
import { Label,Button, Grid, GridColumn,Image} from 'semantic-ui-react';
import CoinHistory from './CoinHistory.js'
import RewardsHistory from './RewardsHistory.js'
import platinumcoin from './../Images/platinumcoin.jpg'
import golf from './../Images/golf.jpg'
import silver from './../Images/silver.jpg'
const isEmpty = require("is-empty");

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
      border: "1px solid ",
      marginLeft:20
    };

    let isValid = isEmpty(this.props.activeUser)
    console.log(this.props.activeUser ,"UserProfile Active User" )
    return (
      <div className="card-container">
		<div className="upper-container">
			<div className="image-container">
				<img src={Logo} />
			</div>
		</div>
		<div className="lower-container">
			<div>
				<h3>{this.props.activeUser.name}</h3>
    <div style={{textAlign:"center"}}><Label>IT Department</Label><Label>Employee Id :
       {this.props.activeUser.employeeId}</Label> <br/>
       <b>Rewards &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp; &nbsp; Coin Balance</b> 
       </div>
			</div>
			<div>
			</div>
			<div>
				<span>
        <label className="btn"> <i className="copyright icon"></i>{this.props.activeUser.rewards} Coins</label>&emsp;&emsp;&emsp;&nbsp;&nbsp;
        <a href="#" className="btn"> <i className="copyright icon"></i>{this.props.activeUser.coinBalance} Coins</a>
        </span>
			</div>
      {!isValid &&  <Grid columns={2}>
     <GridColumn >
        <Label style={{width:33,marginLeft:20}} circular content={this.props.activeUser.rewardCoinType.Platinum}  icon={<Image src={platinumcoin} circular ></Image>}></Label>
        <Label style={{width:33 }} circular content={this.props.activeUser.rewardCoinType.Gold} icon={<Image src={golf} circular ></Image>}></Label>
        <Label style={{width:33}}  circular content={this.props.activeUser.rewardCoinType.Silver}  icon={<Image src={silver} circular ></Image>}></Label>
     </GridColumn>
     <GridColumn>
         <Label style={{width:33}} circular content={this.props.activeUser.coinType.Platinum}  icon={<Image src={platinumcoin} circular ></Image>}></Label>
         <Label style={{width:33}} circular content={this.props.activeUser.coinType.Gold} icon={<Image src={golf} circular ></Image>}></Label>
        <Label style={{width:33}}  circular content={this.props.activeUser.coinType.Silver}  icon={<Image src={silver} circular ></Image>}></Label>
     </GridColumn>
     </Grid>}
      {this.state.showRewards?<div><Button size="tiny" style={activated } onClick={this.handleClick}>Show Rewards</Button>
      <Button size="tiny" style={{marginLeft:20,marginTop:10}} onClick={this.handleClick}>Show Coin Hoistory</Button>
      <RewardsHistory rewardsHistory={this.props.activeUser.rewardsHistory}/>
      </div>
      :<div><Button size="tiny" style={{marginLeft:20,marginTop:10}} onClick={this.handleClick}>Show Rewards</Button>
      <Button size="tiny" style={activated } onClick={this.handleClick}>Show Coin Hoistory</Button>
      <CoinHistory user={this.props.activeUser}/>
      </div>}
		</div>
	</div>
    )
  }
}

export default Profile