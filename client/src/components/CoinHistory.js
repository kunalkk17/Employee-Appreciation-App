import React, { Component } from 'react'
import Logo from './../Images/img5.png'
import { Header, Input, Label, Segment, Divider, Popup, Grid, GridColumn,Image} from 'semantic-ui-react'
import platinumcoin from './../Images/platinumcoin.jpg'
import golf from './../Images/golf.jpg'
import silver from './../Images/silver.jpg'

class CoinHistory extends Component {

  constructor() {
    super()
    this.state = {
      reverseCoinHistory: []
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
            this.state.reverseCoinHistory.map((item, index) =>
              <div className="item" key ={index}>
              <Grid columns={2}>
                 <GridColumn width={3}><Image src={this.selectCoin(item.coinType)} circular>
                  </Image>
                  <b style={{fontSize:"70%",marginRight:30}} >{item.coinType}</b> <br/>
                  <b style={{fontSize:"90%" ,textAlign:"center"}}>{item.recieverName}
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
              ) : null}
        </div>
      </Segment>


    )
  }
}

export default CoinHistory