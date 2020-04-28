import React, { Component } from 'react'
import Logo from './../Images/img5.png'
import { Header, Input, List, Segment, Divider, Popup } from 'semantic-ui-react'

class CoinHistory extends Component {

  constructor() {
    super()
    this.state = {
      coinHistory: [{
        givenTo: "Akshita Sharma",
        noOfCoins: 2,
        reason: "Helped in service generation"
      },
      {
        givenTo: "Kunal Kumar",
        noOfCoins: 1,
        reason: "Helped in service generation"
      },
      {
        givenTo: "Shefali Gupta",
        noOfCoins: 2,
        reason: "Helped in service generation"
      },
      {
        givenTo: "Ankit Kumar",
        noOfCoins: 2,
        reason: "Helped in service generation"
      },
      ]
    }
  }
  render() {
    console.log(this.props.user)
    const myScrollbar = { height: 160, overflowY: 'auto', overflowX: false, borderStyle: 'groove' }
    return (
      <Segment style={myScrollbar}>
        {/* <h3>Coin History</h3> */}
        <div class="ui list">
          {
            this.props.user.coinHistory ?
              this.props.user.coinHistory.map((item, i) =>
                <div class="item">
                  <img class="ui avatar image" src={Logo} tiny/>
                    <Popup
                       trigger={<a><p class="header" style={{ display: "inline" }}>You</p></a>} hoverable style={{ width: 300, height: 200 }}>
                      <Header as='h4'>Comment</Header>
                      <p>{item.comment}</p>
                      <Header as='h4'>Option</Header>
                      <p>{item.reason}</p>
                    </Popup> Gifted {item.noOfCoins} coins to {item.recieverName} on {new Date(item.date).toDateString()}
                </div>
              ) : null}
        </div>
      </Segment>


    )
  }
}

export default CoinHistory