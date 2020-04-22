import React, { Component} from 'react'
import { Button, Modal, Form, Grid, Radio, GridColumn, Divider } from 'semantic-ui-react'
import {ValidateTransferCoinData} from './Validation'
class TransferCoin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      Coins: '',
      comment: '',
      OptionValue: '',
      errors:{ 
      CoinsErr: '',
      CommentErr: '',
      OptionValuErr:''}
      
    }

  }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  handleChange = (e) => {
    const { name, value } = e.target
    let err = this.state.errors;
    console.log(value)
    switch (name) {
      case "Coins":
        err.CoinsErr =  value >5 ? "Can not Gift More than 5 coins" : "";
        break;
      case "comment":
        err.CommentErr = value.length >50 ? " Comment should not be more than 50 words " : "";
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
      //this.transfer();
      this.setState({Coins: '',
      comment: '',
      OptionValue: '',
      errors:{ 
      CoinsErr: '',
      CommentErr: '',
      OptionValuErr:''}});
      this.close();
    }
   
   }
  handleSelectValue = (e, { value }) => {
     let errors = this.state.errors
     errors.OptionValuErr=''
    this.setState({ OptionValue: value ,errors}) }
  close = () => this.setState({ open: false })
  render() {
    const { open, dimmer } = this.state
    //let userName = this.props.recieverName;
    console.log(this.props, 'hi') 
    let myInputstyle = { width: 200, height: 40, marginRight: 100,borderStyle: 'groove' }
    return (
      <div>
        <Button style={ {background:'#1EA896',color:'white'}} floated='right' onClick={this.show(true)}> Reward Coins <i class="right chevron icon"></i></Button>
        <Modal dimmer={dimmer} open={open} onClose={this.close}
         style={{ width: 700, height: 500, marginLeft: 300, marginTop: 100, borderStyle: 'groove' }}>
          <Modal.Header >Rewards Coins</Modal.Header>
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
                    name='Coins'
                    type='number'
                    min='1' max='5'
                    placeholder='Add coins'
                    onChange={this.handleChange}
                  />
                  {this.state.errors.CoinsErr.length > 0 &&
                    <p style={{marginLeft: '0px !important',color:'red',textAlign:"left",fontSize:"12px"}}>{this.state.errors.CoinsErr}</p>}
                  <Form.TextArea style={{ width: 200, height: 70, marginRight: 100}} type='string' name='comment'
                    placeholder='Comment' min='10' max='60'
                    onChange ={this.handleChange}/>
                  {this.state.errors.CommentErr.length > 0 &&
                    <p style={{textAlign:'left',color:'red',fontSize:"12px"}}>{this.state.errors.CommentErr}</p>}
                </Form>
              </GridColumn>
              <GridColumn>
                <Form>
                  <Form.Input>
                    <b> Select One Reason</b> 
                  </Form.Input>
                 {this.state.errors.OptionValuErr.length > 0 &&
                  <p style={{color:'red',textAlign:"left",fontSize:"12px"}}>{this.state.errors.OptionValuErr}</p>}
                  <Divider></Divider>
                  <Form.Input>
                    <Radio
                      style={{ display: 'flex',textAlign:'left' }}
                      label='Do you belong to same team'
                      name='option'
                      value='Do you belong to same team'
                      checked={this.state.OptionValue === 'Do you belong to same team'}
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
                      checked={this.state.OptionValue === 'Did you previously work with Him/Her'}
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
                      checked={this.state.OptionValue === 'Are you working on any Integration project with him/her'}
                      onChange={this.handleSelectValue}
                    />
                  </Form.Input>
                  <Form.Field>
                    <Radio
                      style={{ display: 'flex' }}
                      label='Are you Involved in any Organisation policy with Him/her'
                      name='option'
                      value='Are you Involved in any Organisation policy with Him/her'
                      checked={this.state.OptionValue === 'Are you Involved in any Organisation policy with Him/her'}
                      onChange={this.handleSelectValue}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      style={{ display: 'flex' }}
                      label='Others'
                      name='option'
                      value='Others'
                      checked={this.state.OptionValue === 'Others'}
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
        </Modal>
      </div>
    )
  }
}
//onClose={this.close} size="small" id="modaldiv"
export default TransferCoin