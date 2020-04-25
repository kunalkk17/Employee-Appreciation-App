import React, { Component} from 'react'
import { Button, Modal, Form, Grid, Radio, GridColumn, Divider,Popup } from 'semantic-ui-react'
import {ValidateTransferCoinData} from './Validation'
import { transferCoins, sendMail } from './UserFunctions'
class TransferCoin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      coins: '',
      comment: '',
      optionValue: '',
      errors:{ 
      coinsErr: '',
      commentErr: '',
      optionValuErr:''}
      
    }

  }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  handleChange = (e) => {
    const { name, value } = e.target
    let err = this.state.errors;
    console.log(value)
    switch (name) {
      case "coins":
        err.coinsErr =  value >5 ? "Can not Gift More than 5 coins" : "";
        break;
      case "comment":
        err.commentErr = value.length >50 ? " Comment should not be more than 50 words " : "";
        break;
      default:
        break;
    }
    this.setState({ err, [name]: value })
  }

 handleSubmitButton =e=>{
   
  e.preventDefault(); 
  console.log("====inside handle submit====")
  const {errors,isValid} = ValidateTransferCoinData(this.state)
  console.log(isValid)
   if(!isValid){ 
    console.log(errors) 
    this.setState({errors})}

    else{
      console.log('everything valid');
      alert("form submitted")
      this.transfer();
      this.setState({coins: '',
      comment: '',
      optionValue: '',
      errors:{ 
      coinsErr: '',
      commentErr: '',
      optionValuErr:''}});
      this.close();
    }
   
   }
  handleSelectValue = (e, { value }) => {
     let errors = this.state.errors
     errors.optionValuErr=''
    this.setState({ optionValue: value ,errors}) }
  close = () => this.setState({ open: false })

  transfer(){
    console.log("inside transfer coins");
    console.log("sender: ", this.props.activeUser);
    console.log("reciever: ", this.props.selectedUser);
    console.log("Reason:",this.state.comment);
    console.log("coin input:",this.state.coins);
    let sender=this.props.activeUser;
    let reciever=this.props.selectedUser;
    let coins=this.state.coins;
    const currentDate= new Date();
    
      const updateCoinHistory={
        noOfCoins:coins,
        recieverId:this.props.selectedUser._id,
        recieverName:this.props.selectedUser.name,
        reason:this.state.optionValue,
        comment:this.state.comment,
        date:currentDate
      }
      const updateRewardsHistory={
        noOfCoins:coins,
        senderId:this.props.activeUser._id,
        senderName:this.props.activeUser.name,
        reason:this.state.optionValue,
        comment:this.state.comment,
        date:currentDate
      }
      const mailBody={
        name:this.props.activeUser.name,
        email:this.props.selectedUser.emailId,
        content:`Viola!!!!!\n ${this.props.activeUser.name} has rewarded you with ${coins} coins because ${this.state.optionValue}`
      }

    console.log("======Update CoinHistory====",updateCoinHistory);
    console.log("======Update Rewards====",updateRewardsHistory);
     sender.coinBalance=parseInt(sender.coinBalance)-parseInt(this.state.coins);
     sender.coinHistory.unshift(updateCoinHistory);
     reciever.rewards=parseInt(this.state.coins)+parseInt(reciever.rewards);
     reciever.rewardsHistory.unshift(updateRewardsHistory);
     console.log("Updated Sender",sender);
     console.log("Updated Reciever",reciever);
     const users={sender:sender,reciever:reciever}

     transferCoins(users).then(res => {
      console.log("Coins Transferred now sending mail")
      console.log("==-====mail body======",mailBody)
      sendMail(mailBody).then(resp => {
        console.log("Mail sent")
         if (resp) {
          console.log(resp)
          this.props.history.push(`/home`)
        }
      })
    })

  }

  render() {
    const { open, dimmer } = this.state
    //let userName = this.props.recieverName;
    console.log(this.props, 'hi') 
    let myInputstyle = { width: 200, height: 40, marginRight: 100,borderStyle: 'groove' }
    return (
      <div>
        {this.props.activeUser._id!=this.props.selectedUser._id?
        <div>
        <Button style={ {background:'#1EA896',color:'white'}} floated='right' onClick={this.show(true)}> Reward Coins 
          <i class="right chevron icon"></i></Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}
         style={{ width: 700, height: 500, marginLeft: 300, marginTop: 100, borderStyle: 'groove' }}>
          <Modal.Header ><i class="gift icon"></i>Rewards Coins</Modal.Header>
          <Modal.Actions >
            <Grid columns={2}>
              <GridColumn width={7}>
                <Form size='large'>
                  <Form.Input
                    style={myInputstyle}
                    icon='user'
                    type='read'
                    readOnly
                    placeholder={this.props.selectedUser.name}
                  />
                  <Form.Input
                    style={myInputstyle}
                    name='coins'
                    type='number'
                    min='1' max='5'
                    placeholder='Add coins'
                    onChange={this.handleChange}
                  />
                  {this.state.errors.coinsErr.length > 0 &&
                    <p style={{marginLeft: '0px !important',color:'red',textAlign:"left",fontSize:"12px"}}>{this.state.errors.coinsErr}</p>}
                  <Form.TextArea style={{ width: 200, height: 70, marginRight: 100}} type='string' name='comment'
                    placeholder='Comment' min='10' max='60'
                    onChange ={this.handleChange}/>
                  {this.state.errors.commentErr.length > 0 &&
                    <p style={{textAlign:'left',color:'red',fontSize:"12px"}}>{this.state.errors.commentErr}</p>}
                </Form>
              </GridColumn>
              <GridColumn>
                <Form>
                  <Form.Input>
                    <b> Select One Reason</b> 
                  </Form.Input>
                 {this.state.errors.optionValuErr.length > 0 &&
                  <p style={{color:'red',textAlign:"left",fontSize:"12px"}}>{this.state.errors.optionValuErr}</p>}
                  <Divider></Divider>
                  <Form.Input>
                    <Radio
                      style={{ display: 'flex',textAlign:'left' }}
                      label='Do you belong to same team'
                      name='option'
                      value='Do you belong to same team'
                      checked={this.state.optionValue === 'Do you belong to same team'}
                      onChange={this.handleSelectValue}
                    />
                  </Form.Input>
                  <Form.Input>
                    <Radio
                      style={{ display: 'flex' }}
                      float = 'left'
                      label='Did you previously work with Him/Her'
                      name='option'
                      value='Did you previously work with Him/Her'
                      checked={this.state.optionValue === 'Did you previously work with Him/Her'}
                      onChange={this.handleSelectValue}
                    />
                  </Form.Input>
                  <Form.Input>
                    <Radio
                      style={{ display: 'flex' }}
                      float = 'left'
                      label='Are you working on any Integration project with him/her'
                      name='option'
                      value='Are you working on any Integration project with him/her'
                      checked={this.state.optionValue === 'Are you working on any Integration project with him/her'}
                      onChange={this.handleSelectValue}
                    />
                  </Form.Input>
                  <Form.Field>
                    <Radio
                      style={{ display: 'flex' }}
                      label='Are you Involved in any Organisation policy with Him/her'
                      name='option'
                      value='Are you Involved in any Organisation policy with Him/her'
                      checked={this.state.optionValue === 'Are you Involved in any Organisation policy with Him/her'}
                      onChange={this.handleSelectValue}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      style={{ display: 'flex' }}
                      label='Others'
                      name='option'
                      value='Others'
                      checked={this.state.optionValue === 'Others'}
                      onChange={this.handleSelectValue}
                    />
                  </Form.Field>
                </Form>
              </GridColumn>
            </Grid>
            <Grid columns={2}>
              <GridColumn><Button style={myInputstyle} onClick={this.close}>Cancle</Button></GridColumn>
              <GridColumn><Button style={myInputstyle} color='green' onClick={this.handleSubmitButton}>Submit</Button>
              </GridColumn>
            </Grid>
          </Modal.Actions>
        </Modal></div>:
       <div><Popup content='Cannot transfer coins to yourself' trigger={<div><Button disabled style={ {background:'#1EA896',color:'white'}} floated='right' onClick={this.show(true)}> Reward Coins 
       <i class="right chevron icon"></i></Button></div>}/></div>}
      </div>
    )
  }
}
//onClose={this.close} size="small" id="modaldiv"
export default TransferCoin