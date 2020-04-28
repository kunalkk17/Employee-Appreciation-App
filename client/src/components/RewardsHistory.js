import React, { Component } from 'react'
import Logo from './../Images/img5.png'
import { Header, Input, List, Segment, Divider, Popup } from 'semantic-ui-react'

class RewardsHistory extends Component {

  constructor() {
    super()
    this.state = {
      rewardsHistory: [{
        givenBy: "Akshita Sharma",
        noOfCoins: 2,
        reason: "Helped in service generation"
      },
      {
        givenBy: "Kunal Kumar",
        noOfCoins: 1,
        reason: "Helped in service generation"
      },
      {
        givenBy: "Shefali Gupta",
        noOfCoins: 2,
        reason: "Helped in service generation"
      },
      {
        givenBy: "Ankit Kumar",
        noOfCoins: 2,
        reason: "Helped in service generation"
      },
      ]
    }
  }
  render() {
    const myScrollbar = { height: 160, overflowY: 'auto', overflowX: false, borderStyle: 'groove' }
    console.log("========Rewards History=======", this.props.rewardsHistory)
    var ts = new Date("May 1,2019 11:20:00").toDateString(); 
// console.log(ts.toDateString(),"date");
console.log( new Date("May 1,2019 11:20:00").toDateString(),"dateString");
    return (
      <Segment style={myScrollbar}>
        <List>
        {
            this.props.rewardsHistory ?
              this.props.rewardsHistory.map((item, i)=>
                <div class="item">
                  <img class="ui avatar image" src={Logo} tiny style={{ display: "inline" }} />
                  <div class="content">
                   <Popup
                    trigger={<a><b  class="header">{item.senderName} </b></a>} hoverable style={{width:300 , height:200}}>
                    <Header as='h4'>Comment</Header>
                    <p>{item.comment}</p>
                    <Header as ='h4'>Option</Header>
                    <p>{item.reason}</p>
                   </Popup> Gifted {item.noOfCoins} coins On { new Date(item.date).toDateString()}
                  </div>
                </div>
              ) : null

          }
        </List>
      </Segment>

    )
  }
}

export default RewardsHistory