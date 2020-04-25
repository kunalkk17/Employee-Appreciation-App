import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { getUsers } from './UserFunctions'
import axios from 'axios'
import {Pagination, PaginationProps, Label} from 'semantic-ui-react';
import { Search, Grid, Header, Segment, Modal, Image,Button,Icon } from 'semantic-ui-react'
import _ from 'lodash'
import UserProfile from './UserProfile'
import Logo from './../Images/img.jpg'
import Logo2 from './../Images/img4.png'
import CoinHistory from './CoinHistory.js'
import RewardsHistory from './RewardsHistory'
import TransferCoin from './TransferCoin'


interface UserState {
  users: [];
  usersData: [];
  begin: number;
  end: number;
  activePage: number;
}

class Profile extends React.Component<{}, UserState> {
  constructor() {
    super()
    this.state = {
      users:[],
      usersData:[],
      begin:0,
      end:5,
      open:false,
      userProfileIndexToShow:0,
      coinHistory:[{
                      givenBy:"Akshita Sharma",
                      noOfCoins:2,
                      reason:"Helped in service generation"
                   },
                   {
                    givenBy:"Kunal Kumar",
                    noOfCoins:1,
                    reason:"Helped in service generation"
                 },
                 {
                  givenBy:"Shefali Gupta",
                  noOfCoins:2,
                  reason:"Helped in service generation"
                 },
                {
                givenBy:"Ankit Kumar",
                noOfCoins:2,
                reason:"Helped in service generation"
                },
    ],
    activeUser:{},
    isTransfercoin:false
    }
    this.btnClick = this.btnClick.bind(this);
  }

  async btnClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    data: PaginationProps
  ) {
    await this.setState({activePage: data.activePage});
    await this.setState({begin: this.state.activePage * 5 - 5});
    await this.setState({end: this.state.activePage * 5});
    this.setState({
      usersData: this.state.users.slice(this.state.begin, this.state.end),
    });
  }

  show = (dimmer,userProfileindex) => () => {
    this.setState({ dimmer, open: true, userProfileIndexToShow:userProfileindex })
    console.log(userProfileindex)
  }

  closeUserProfile = () => this.setState({ open: false })

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    console.log(decoded.id);
    console.log(token)
    getUsers(token).then(res => {
      //console.log("inside login")
      if (res) {
        console.log(res.length)
        this.setState({
          users:res,
          usersData:res.slice(this.state.begin,this.state.end),
        })
        console.log(this.state.users);
        const user = this.state.users.find((user)=>user._id===decoded.id);
        this.setState({
          activeUser:user
        })
        console.log(this.state.activeUser)
      }
    })
    
  }


  render() {
    const numberPages = Math.floor(this.state.totalResults/4);
    const { open, dimmer} = this.state

    return (
        <div class="ui internally celled grid">
        <div class="row">
          <div class=" twelve wide column">
          <div class="card-container2">
          <Search placeholder="Search Users"
            
          />
            <div class="ui divided items">
              {
                this.state.usersData?
                this.state.usersData.map((item,i)=>
                <div class="item">
                  <div class="ui tiny image">
                    <img src={Logo}/>
                  </div>
                <div class="content">
                <a class="header" onClick={this.show(true,i)}>{item.name}</a>
                <TransferCoin activeUser={this.state.activeUser} selectedUser={this.state.usersData[i]}></TransferCoin>
                <Modal dimmer={dimmer} 
                       open={open} 
                       onClose={this.closeUserProfile}>
    <Modal.Header>
      <Image wrapped size='tiny' src={Logo} />
      {this.state.usersData[this.state.userProfileIndexToShow].name}<div>
        <Label>IT Department</Label><Label>Employee Id : {this.state.usersData[this.state.userProfileIndexToShow].employeeId}</Label>
        <Label style={{background: "rgb(212, 194, 25)",color: "white"}}>
          <i class="copyright icon"></i> {this.state.usersData[this.state.userProfileIndexToShow].rewards} Coins 
        </Label>
        </div></Modal.Header>
    <Modal.Content image>
      
      <Modal.Description>
        <Header>Rewards History</Header>
       <RewardsHistory rewardsHistory={this.state.usersData[this.state.userProfileIndexToShow].rewardsHistory}/>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button negative onClick={this.closeUserProfile}>
      <i class='chevron left icon'></i> Back 
      </Button>
    </Modal.Actions>
  </Modal>
                  
                  <div class="meta">
                    <span class="ui label" >Accounts</span><Label>Employee Id: {item.employeeId}</Label><Label>{item.team}</Label>
                    <span class="ui label" style={{background: "rgb(212, 194, 25)",color: "white"}}><i class="copyright icon"></i> {item.rewards} Coins </span>
                  </div>
                  <div class="description">
                    <p></p>
                  </div>
                </div>
              </div>
                ):null
              }
            </div>
            <Pagination class='center'
          defaultActivePage={1}
          totalPages={Math.ceil(this.state.users.length / 3)}
          onPageChange={this.btnClick}
        />
          </div>
          </div>
          <div class="four wide column">
           <UserProfile activeUser={this.state.activeUser}/>
        </div>
      </div>
      </div>
    )
  }
}

export default Profile