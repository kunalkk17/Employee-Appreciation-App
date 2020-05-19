import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { getUsers } from './UserFunctions'
import { Bar, Pie } from 'react-chartjs-2'
import axios from 'axios'
import { Pagination, PaginationProps, Label, GridColumn } from 'semantic-ui-react';
import { Search, Grid, Header, Segment, Modal, Image, Button, Icon } from 'semantic-ui-react'
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
      error:null,
      users: [],
      usersData: [],
      begin: 0,
      end: 5,
      open: false,
      userProfileIndexToShow: 0,
      otherUser: "",
      activeUser: {},
      isTransfercoin: false,
      isRefreshHomePage:false
    }
    this.btnClick = this.btnClick.bind(this);
  }

  coinSorter(coins){
    return function(a,b){
      if(a[coins] > b[coins]){return -1;}
      else{ return 1;}
    }
  }

  async btnClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    data: PaginationProps
  ) {
    await this.setState({ activePage: data.activePage });
    await this.setState({ begin: this.state.activePage * 5 - 5 });
    await this.setState({ end: this.state.activePage * 5 });
    this.setState({
      usersData: this.state.users.slice(this.state.begin, this.state.end),
    });
    console.log(this.state);
  }

  show = (dimmer, userProfileindex) => () => {
    this.setState({ dimmer, open: true, userProfileIndexToShow: userProfileindex })
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
          console.log(res.data.length)
          this.setState({
            users: res.data,
            usersData: res.data.slice(this.state.begin, this.state.end),
          })
          console.log(this.state.users, "users");
          console.log(this.state.usersData, "usersData");
          const user = this.state.users.find((user) => user._id === decoded.id);
          this.setState({
            activeUser: user
          })
          console.log(this.state.activeUser)
      }).
    catch(error =>
    { console.log(error)
      this.setState({error})})
  }

  handleResultSelect = (e, { result }) => { this.setState({ otherUser: result.name }) }
  handleUser = (e, { value }) => {
    console.log(value)
    this.setState({ otherUser: value })

  }

  refreshHomePage = ()=>{
    console.log("refresh home page")
    this.setState({isRefreshHomePage:true})
  }
  render() {
    const resultRenderer = ({ name }) => <p><b>{name}</b></p>
    const datat = this.state.users?this.state.users.sort(this.coinSorter("rewards")):null

    console.log(datat,"sortedArray")
    const filterUserData = this.state.users.filter(user => {
      return user.name.toLowerCase().includes(this.state.otherUser.toLowerCase())
    })
    this.state.usersData = filterUserData.slice(this.state.begin, this.state.end)
    const numberPages = Math.floor(this.state.totalResults / 4);
    const { open, dimmer } = this.state
    var chartOptions = {

      showLines: false,
      scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                min: 0,
                max: 50    
            }
          }]
       }
    }

 if(this.state.isRefreshHomePage){
   return(<Profile></Profile>)
 } 
 else{
  return (
    <div className="ui internally celled grid">
      <div className="row">
        <div className=" twelve wide column">
          <div className="card-container2">
            <Grid columns={2}>
            <GridColumn width={14}>
            <Search
              placeholder="Search Users"
              onSearchChange={this.handleUser}
              value={this.state.otherUser}
              onResultSelect={this.handleResultSelect}
              size="small"
             // results={this.state.usersData}
              showNoResults ={false}
              resultRenderer={resultRenderer}
            />
            </GridColumn>
            <GridColumn width={2}>
              <Button size ="small" onClick={this.refreshHomePage}> Refresh</Button>
            </GridColumn>
            </Grid>
            
            <div className="ui divided items">
            {this.state.error && <Header  color="red">Network Issue!!</Header>}
              {
                this.state.usersData ?
                  this.state.usersData.map((item, i) =>
                    <div className="item" key={i}>
                      <div className="ui tiny image">
                        <img src={Logo} />
                      </div>
                      <div className="content">
                        <a className="header" onClick={this.show(true, i)}>{item.name}</a>
                        <TransferCoin activeUser={this.state.activeUser} selectedUser={this.state.usersData[i]} refreshHomePage ={this.refreshHomePage }></TransferCoin>
                        <Modal dimmer={dimmer}
                          open={open}
                          onClose={this.closeUserProfile}>
                          <Modal.Header>
                            <Image wrapped size='tiny' src={Logo} />
                            {this.state.usersData[this.state.userProfileIndexToShow].name}<div>
                              <Label>IT Department</Label><Label>Employee Id : {this.state.usersData[this.state.userProfileIndexToShow].employeeId}</Label>
                              <Label style={{ background: "rgb(212, 194, 25)", color: "white" }}>
                                <i className="copyright icon"></i> {this.state.usersData[this.state.userProfileIndexToShow].rewards} Coins
                              </Label>
                              <Bar data={{
                                labels: ["Platinum", "Gold", "Silver"],
                                datasets: [{
                                  label: "Reward Coins",
                                  data: [this.state.usersData[this.state.userProfileIndexToShow].rewardCoinType.Platinum
                                    , this.state.usersData[this.state.userProfileIndexToShow].rewardCoinType.Gold,
                                  this.state.usersData[this.state.userProfileIndexToShow].rewardCoinType.Silver, 0],
                                  backgroundColor: [
                                    'teal',
                                    "#DAA520",
                                    'Silver']
                                }]
                              }} options={chartOptions} height="100"
                              ></Bar>
                      </div>
                            </Modal.Header>
                          <Modal.Content image>

                            <Modal.Description>
                              <Header>Rewards History</Header>
                              <RewardsHistory rewardsHistory={this.state.usersData[this.state.userProfileIndexToShow].rewardsHistory} />
                            </Modal.Description>
                          </Modal.Content>
                          <Modal.Actions>
                            <Button negative onClick={this.closeUserProfile} color="red">
                             Cancel
                             </Button>
                          </Modal.Actions>
                        </Modal>

                        <div className="meta">
                          <span className="ui label" >Accounts</span><Label>Employee Id: {item.employeeId}</Label><Label>{item.team}</Label>
                          <span className="ui label" style={{ background: "rgb(212, 194, 25)", color: "white" }}><i className="copyright icon"></i> {item.rewards} Coins </span>
                        </div>
                        <div className="description">
                          <p></p>
                        </div>
                      </div>
                    </div>
                  ) : null
              }
            </div>
          <Pagination className='center'
            defaultActivePage={1}
            totalPages={Math.ceil(this.state.users.length / 3)}
            onPageChange={this.btnClick}
          />
        </div>
      </div>
      <div className="four wide column">
        <UserProfile activeUser={this.state.activeUser} />
        </div>
      </div>
      </div>
)
 }
    
  }
}

export default Profile