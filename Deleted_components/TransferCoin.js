import React, { Component, Children } from 'react'
import { Button, Header, Image, Modal, Form, Grid, Segment, Dropdown, Menu, Item, GridColumn,TextArea } from 'semantic-ui-react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import $ from 'jquery'
import { transferCoins } from './UserFunctions'

class TransferCoin extends Component {
  constructor(props)
  {
    super(props)
    this.state={
      open: false,
      coinInput:0,
      reason:'',
      reasonError:'',
    }
  }

  handleChange= e=>
    {
      e.preventDefault();
        const {name , value} = e.target;
        //let errors = this.state
        if(name=='reason'){
          let error= !value.length>0?"Invalid User Name":"";
          console.log(error);
          this.setState({reasonError:error,reason:value})
        }
        if(name=='coinInput'){
          this.setState({coinInput:value})
        }
        console.log("Reason:",this.state.reason);
        console.log("coin input:",this.state.coinInput);
    }

    handleSubmit= e=>
    {
     e.preventDefault();
    console.log("Reason:",this.state.reason);
    console.log("coin input:",this.state.coinInput);
    // console.log(this.state.reasonError.length);
    if(this.state.reason.length>0 && this.state.coinInput>0){
      console.log('everything valid');
      this.transfer();
      this.setState({reason:'',coinInput:0});
      this.close();
      }
      else {
        this.setState({reason:'',coinInput:0})
        alert("Validation Failed");
        this.close();
      }
    }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  transfer(){
    console.log("inside transfer coins");
    console.log("sender: ", this.props.activeUser);
    console.log("reciever: ", this.props.selectedUser);
    console.log("Reason:",this.state.reason);
    console.log("coin input:",this.state.coinInput);
    let sender=this.props.activeUser;
    let reciever=this.props.selectedUser;
    let coins=this.state.coinInput;
    const currentDate= new Date();
    
      const updateCoinHistory={
        noOfCoins:coins,
        recieverId:this.props.selectedUser._id,
        reason:this.state.reason,
        date:currentDate
      }
      const updateRewardsHistory={
        noOfCoins:coins,
        senderId:this.props.activeUser._id,
        reason:this.state.reason,
        date:currentDate
      }

    console.log("======Update CoinHistory====",updateCoinHistory);
    console.log("======Update Rewards====",updateRewardsHistory);
     sender.coinBalance=sender.coinBalance-this.state.coinInput;
     sender.coinHistory.unshift(this.state.updateCoinHistory);
     reciever.rewards=parseInt(this.state.coinInput)+parseInt(reciever.rewards);
     reciever.rewardsHistory.unshift(this.state.updateRewardsHistory);
     console.log("Updated Sender",sender);
     console.log("Updated Reciever",reciever);
     const users={sender:sender,reciever:reciever}
     transferCoins(users).then(res => {
      console.log("Coins Transferred now moving to home page")
      if (res) {
        console.log(res)
        this.props.history.push(`/home`)
      }
    })

  }

  render() {
    const { open, dimmer } = this.state
    let usercode = this.props.usercode;
    // console.log("sender: ", this.props.activeUser);
    // console.log("reciever: ", this.props.selectedUser);
    return (
      <div>
        <Button primary floated='right' onClick={this.show(true)}> Reward Coins <i class="right chevron icon"></i></Button>

        <Modal dimmer={dimmer}
          open={open} 
          onClose={this.close} size ='mini'>
            <Modal.Header >Reward Coins</Modal.Header>
          <Modal.Actions >
              <Grid centered>
                  <Segment>
                      <Form>
                         User Name <Form.Input
                                Icon='user'
                                placeholder ={usercode}
                                value={this.props.selectedUser.name}
                          />
                          <Form.Group inline>
                          <label>No of Coins</label>
                          <Form.Input type='number' name='coinInput' placeholder='Max 5 coins' min="1" max="2" onChange={this.handleChange}/>
                          </Form.Group>
                          <Form.Field
                            control={TextArea}
                            label='Reason'
                            name='reason'
                            onChange={this.handleChange}
                            placeholder='Why are you rewarding Coins...?'
                          />  
                           
                           <Grid columns={2}>
                               <GridColumn><Button negative onClick={this.close}>Cancle</Button></GridColumn>
                               <GridColumn><Button onClick = {this.handleSubmit} >Submit</Button></GridColumn>
                            </Grid>                    
                      </Form>
                  </Segment>
              </Grid>
                
          </Modal.Actions>
        </Modal>

      </div>
    )
  }
}
//onClose={this.close} size="small" id="modaldiv"
export default TransferCoin