import React, { Component } from 'react'
import Logo from './../Images/img5.png'
import { Header, Input, List, Segment, Divider, Popup } from 'semantic-ui-react'

class RewardsHistory extends Component {

  constructor() {
    super()
    this.state = {
      reverseArr:[]
    }
  }

  render() {
 var reverseArr=  this.props.rewardsHistory?this.props.rewardsHistory.forEach(element => {
     this.state.reverseArr.unshift(element);
   }
   ):null;
   const myScrollbar = { height: 160, overflowY: 'auto', overflowX: false, borderStyle: 'groove' }
    console.log("========Rewards History=======", this.props.rewardsHistory)
    return (
      <Segment style={myScrollbar}>
        <List>
          {
            this.state.reverseArr ?
              this.state.reverseArr.map((item, i)=>
                <div class="item">
                  <div className="content" style={{ display: "inline" }} >
                   <Popup
                    trigger={<a><b  style={{ display: "inline",color:"blue" }} className="header">{item.senderName} </b></a>} hoverable style={{width:300 , height:200}}>
                    <Header as='h4'>Comment</Header>
                    <p >{item.comment}</p>
                    <Header as ='h4'>Option</Header>
                    <p>{item.reason}</p>
                   </Popup> Gifted <b>{item.coinType}</b> coins On <b>{ new Date(item.date).toDateString()}</b> 
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