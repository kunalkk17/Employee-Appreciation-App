import React, { Component } from 'react'
import Logo from './../Images/img5.png'
import { Header, Input, List, Segment, Divider, Popup, Grid, GridColumn,Image, Label} from 'semantic-ui-react'
import platinumcoin from './../Images/platinumcoin.jpg'
import golf from './../Images/golf.jpg'
import silver from './../Images/silver.jpg'

class RewardsHistory extends Component {

  constructor() {
    super()
    this.state = {
      reverseArr:[],
      colorcoin:""
    }
  }
selectCoin(coinType)
{
  if(coinType==="Platinum")
  {
    return platinumcoin
  }
  if(coinType==="Gold")
  {
    return golf
  }
  if(coinType==="Silver")
  {
    return silver
  }
}
  render() {
 var reverseArr=  this.props.rewardsHistory?this.props.rewardsHistory.forEach(element => {
     this.state.reverseArr.unshift(element);
   }
   ):null;
   const myScrollbar = { height: 140, overflowY: 'auto', overflowX: false, borderStyle: 'groove' }
    console.log("========Rewards History=======", this.props.rewardsHistory)
    return (
      <Segment style={myScrollbar}>
        <List>
          {
            this.state.reverseArr ?
              this.state.reverseArr.map((item, index)=>
                 <div className="item" key={index}>
               <Grid columns={2}>
                 <GridColumn width={3}><Image src={this.selectCoin(item.coinType)} width="50" circular>
                  </Image>
                  <b style={{fontSize:"70%",marginRight:30}}>{item.coinType}</b> <br/>
                  <b style={{fontSize:"90%" ,textAlign:"center"}}>{item.senderName}
                  </b>
                 </GridColumn>
                 <GridColumn  width={13}>
                 <b style={{fontSize:"100%"}}>"{item.comment}"</b>
                 <Divider style={{width:40}}></Divider>
                 <b style={{fontSize:"100%"}}><i>"{item.reason}"</i></b> <br/>
                 <b style={{fontSize:"80%"}}>{ new Date(item.date).toDateString()}</b> 
                 </GridColumn>
               </Grid> 
               <Divider></Divider>
              </div>
              ) : null
          }
        </List>
      </Segment>

    )
  }
}

export default RewardsHistory