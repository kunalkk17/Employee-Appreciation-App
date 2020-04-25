import React, { Component } from 'react'
import Logo from './../Images/img5.png'

class CoinHistory extends Component {

    constructor() {
        super()
        this.state = {
          coinHistory:[{
                          givenTo:"Akshita Sharma",
                          noOfCoins:2,
                          reason:"Helped in service generation"
                       },
                       {
                        givenTo:"Kunal Kumar",
                        noOfCoins:1,
                        reason:"Helped in service generation"
                     },
                     {
                      givenTo:"Shefali Gupta",
                      noOfCoins:2,
                      reason:"Helped in service generation"
                     },
                    {
                    givenTo:"Ankit Kumar",
                    noOfCoins:2,
                    reason:"Helped in service generation"
                    },
        ]
        }
      }
  render() {
    console.log(this.props.user)
    return (
      <div class="rewards-history">
        {/* <h3>Coin History</h3> */}
          <div class="ui list">
            {
                this.props.user.coinHistory?
                this.props.user.coinHistory.map((item,i)=>
                
           <div class="item">
             <img class="ui avatar image" src={Logo} tiny/>
               <div class="content">
                 <span><b style={{display:"inline"}}class="header">You </b> Gifted {item.noOfCoins} coins to {item.recieverName}</span>
                    <div class="description">{item.comment}</div>
              </div>
          </div>
          ):null}
        </div>
      </div>
        
    )
  }
}

export default CoinHistory