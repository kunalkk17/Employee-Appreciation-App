import React, { Component } from 'react'
import Logo from './../Images/img5.png'

class RewardsHistory extends Component {

    constructor() {
        super()
        this.state = {
          rewardsHistory:[{
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
        ]
        }
      }
  render() {
    console.log("========Rewards History=======", this.props.rewardsHistory)
    return (
      <div className="rewards-history">
        {/* <h3>Rewards History</h3> */}
          <div className="ui list">
            {
                this.props.rewardsHistory?
                this.props.rewardsHistory.map((item,i)=>
                
           <div className="item">
             <img className="ui avatar image" src={Logo} tiny/>
               <div className="content">
                 <span><b style={{display:"inline"}}className="header">{item.senderName} </b> Gifted {item.noOfCoins} coins</span>
                    <div className="description">{item.comment}</div>
              </div>
          </div>
          ):null}
        </div>
      </div>
        
    )
  }
}

export default RewardsHistory