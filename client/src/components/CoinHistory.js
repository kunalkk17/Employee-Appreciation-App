import React, { Component } from 'react'
import Logo from './../Images/img5.png'
import { Header, Input, List, Segment, Divider, Popup } from 'semantic-ui-react'

class CoinHistory extends Component {

  constructor() {
    super()
    this.state = {
      reverseCoinHistory: []
    }
  }
  render() {
    var reverseArr=  this.props.user.coinHistory?this.props.user.coinHistory.forEach(element => {
      this.state.reverseCoinHistory.unshift(element);
    }
    ):null;
    console.log(this.props.user)
    const myScrollbar = { height: 160, overflowY: 'auto', overflowX: false, borderStyle: 'groove' }
    return (
      <Segment style={myScrollbar}>
        {/* <h3>Coin History</h3> */}
        <div className="ui list">
          {
            this.state.reverseCoinHistory ?
            this.state.reverseCoinHistory.map((item, i) =>
                <div className="item">
                    <Popup
                       trigger={<a><p className="header" style={{ display: "inline" ,color:"blue" }}>You</p></a>} hoverable style={{ width: 300, height: 200 }}>
                      <Header as='h4'>Comment</Header>
                      <p>{item.comment}</p>
                      <Header as='h4'>Option</Header>
                      <p>{item.reason}</p>
                    </Popup> Gifted {item.coinType} coins to {item.recieverName} on <b>{new Date(item.date).toDateString()}</b>
                </div>
              ) : null}
        </div>
      </Segment>


    )
  }
}

export default CoinHistory