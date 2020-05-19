import React, { Component } from 'react'
import { Button, Modal, Form, Grid, TextArea, GridColumn, Dropdown, Popup, Icon, Label, Image } from 'semantic-ui-react'
import { ValidateTransferCoinData } from './Validation'
import { transferCoins, sendMail } from './UserFunctions'
import { selectOption } from './CommonFunction'
import platinumcoin from './../Images/platinumcoin.jpg'
import golf from './../Images/golf.jpg'
import silver from './../Images/silver.jpg'
import bronze from './../Images/bronze.jpg'
class TransferCoin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      coins: '',
      comment: '',
      optionValue: '',
      coinType: "Gift Coin",
      colorType: "",
      errors: {
        coinsErr: '',
        commentErr: '',
        optionValuErr: ''
      }

    }

  }

  show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  handleChange = (e, { name, value }) => {
    console.log("Coins Value")
    console.log(value, "coinType")
    let err = this.state.errors;
    console.log(value)
    switch (name) {
      case "optionValue":
        err.optionValuErr = value.length < 0 ? "Please select one option" : ""
      case "comment":
        err.commentErr = value.length > 100 ? " Comment should not be more than 100 words " : "";
        break;
      default:
        break;
    }
    this.setState({ err, [name]: value })
  }
  handleSelectCion(value) {

    let { colorType, errors } = this.state
    switch (value) {
      case "Platinum":
        colorType = "gainsboro";
        errors.coinsErr = "";
        break;
      case "Gold":
        colorType = "#DAA520";
        errors.coinsErr = "";
        break;
      case "Silver":
        colorType = "	gray";
        errors.coinsErr = "";
        break;
      default:
        colorType = "";
        break;
    }
    this.setState({ colorType, coins: "1", coinType: value })
  }

  handleSubmitButton = e => {

    e.preventDefault();
    console.log("====inside handle submit====")
    const { errors, isValid } = ValidateTransferCoinData(this.state)
    console.log(isValid)
    if (!isValid) {
      console.log(errors)
      this.setState({ errors })
    }

    else {
      console.log('everything valid');
      this.transfer();
      this.setState({
        coins: '',
        colorType: "",
        coinType: "Gift Coin",
        comment: '',
        optionValue: '',
        errors: {
          coinsErr: '',
          commentErr: '',
          optionValuErr: ''
        }
      });
      this.close();
    }

  }

  transfer() {
    console.log("activeUserCoinValue", this.props.activeUser.coinType)
    console.log("inside transfer coins");
    console.log("sender: ", this.props.activeUser);
    console.log("reciever: ", this.props.selectedUser);
    console.log("Reason:", this.state.comment);
    console.log("coin input:", this.state.coins);
    let sender = {
      coinType: {}
    };
    let reciever = {
      rewardCoinType: {}
    };
    let coins = this.state.coins;
    let coinType = this.state.coinType
    const currentDate = new Date();

    const updateCoinHistory = {
      coinType: coinType,
      recieverId: this.props.selectedUser._id,
      recieverName: this.props.selectedUser.name,
      reason: this.state.optionValue,
      comment: this.state.comment,
      date: currentDate
    }
    const updateRewardsHistory = {
      coinType: coinType,
      senderId: this.props.activeUser._id,
      senderName: this.props.activeUser.name,
      reason: this.state.optionValue,
      comment: this.state.comment,
      date: currentDate
    }
    const mailBody = {
      name: this.props.activeUser.name,
      //email:"this.props.selectedUser.emailId",
      email: "shefaligupta2may@gmail.com",
      content: `Viola!!!!!\n ${this.props.activeUser.name} has rewarded you with ${coins} coins because ${this.state.optionValue}`
    }

    console.log("======Update CoinHistory====", updateCoinHistory);
    console.log("======Update Rewards====", updateRewardsHistory);
    sender.coinBalance = parseInt(this.props.activeUser.coinBalance) - parseInt(this.state.coins);
    console.log("======Update CoinType====", this.state.coinType, "coinType")
    console.log(this.state.coinType, "coinType")
    sender.coinType.Platinum = this.state.coinType === "Platinum" ? parseInt(this.props.activeUser.coinType.Platinum) - parseInt(this.state.coins) : parseInt(this.props.activeUser.coinType.Platinum);
    reciever.rewardCoinType.Platinum = this.state.coinType === "Platinum" ? parseInt(this.props.selectedUser.rewardCoinType.Platinum) + parseInt(this.state.coins) : parseInt(this.props.selectedUser.rewardCoinType.Platinum);
    sender.coinType.Gold = this.state.coinType === "Gold" ? parseInt(this.props.activeUser.coinType.Gold) - parseInt(this.state.coins) : parseInt(this.props.activeUser.coinType.Gold);
    reciever.rewardCoinType.Gold = this.state.coinType === "Gold" ? parseInt(this.props.selectedUser.rewardCoinType.Gold) + parseInt(this.state.coins) : parseInt(this.props.selectedUser.rewardCoinType.Gold);
    sender.coinType.Silver = this.state.coinType === "Silver" ? parseInt(this.props.activeUser.coinType.Silver) - parseInt(this.state.coins) : parseInt(this.props.activeUser.coinType.Silver);
    reciever.rewardCoinType.Silver = this.state.coinType === "Silver" ? parseInt(this.props.selectedUser.rewardCoinType.Silver) + parseInt(this.state.coins) : parseInt(this.props.selectedUser.rewardCoinType.Silver);

    sender.coinHistory = updateCoinHistory;
    reciever.coinType = this.state.coinType;
    reciever.rewards = parseInt(this.state.coins) + parseInt(this.props.selectedUser.rewards);
    reciever.rewardsHistory = updateRewardsHistory;
    console.log("Updated Sender", sender);
    console.log("Updated Reciever", reciever);
    const users = { sender: sender, reciever: reciever }

    transferCoins(users).then(res => {
      console.log("Coins Transferred now sending mail")
      console.log("==-====mail body======", mailBody)
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
    //console.log(this.props, 'hi') 
    let myInputstyle = { width: 200, height: 40, marginRight: 20, borderStyle: 'groove' }
    return (
      <div>
        {this.props.activeUser._id != this.props.selectedUser._id ?
          <div>
            <Button style={{ background: '#1EA896', color: 'white' }} floated='right' onClick={this.show(true)}> Reward Coins
          <i className="right chevron icon"></i></Button>
            {this.state.open &&
              <Modal dimmer={dimmer} open={open} onClose={this.close}
                style={{ width: 700, height: 500, marginLeft: 400, marginTop: 100, borderStyle: 'groove' }}>
                <Modal.Header ><i className="gift icon"></i>Reward Coins</Modal.Header>
                <Modal.Actions style={{ backgroundColor: `${this.state.colorType}` }}>
                  <Grid columns={2}>
                    <GridColumn width={7} >
                      <Form size='large'>
                        <Form.Input
                          style={myInputstyle}
                          icon='user'
                          type='read'
                          readOnly
                          placeholder={this.props.selectedUser.name}
                        />
                        <Form.Input
                          style={{ width: 110, height: 40, marginLeft: 30, marginRight: 70, borderStyle: 'groove' }}
                          name='coins'
                          value={this.state.coinType}
                          placeholder={this.state.coinType}
                          onChange={this.handleChange}
                        />
                        {this.state.errors.coinsErr.length > 0 &&
                          <p style={{ marginLeft: 60, color: 'red', textAlign: "left", fontSize: "12px" }}>{this.state.errors.coinsErr}</p>}
                      </Form><br />
                      <Grid columns={3}>
                        <GridColumn>  {this.props.activeUser.coinType.Platinum >0 ?
                          <Image src={platinumcoin} circular onClick={() => this.handleSelectCion("Platinum")}
                            style={{ marginLeft: 20, border: "5px solid gainsboro" }}>
                          </Image> :
                          <Popup
                            trigger={<Image src={platinumcoin} circular
                              style={{ marginLeft: 20, border: "5px solid gainsboro" }}>
                            </Image>}
                            hoverable style={{ width: 300, height: 40 }}>
                            <p style={{ color: "red" }}>Your Platinum Coin Balnce is 0!!</p>
                          </Popup>}
                          <Label style={{ color: "black", backgroundColor: "gainsboro", borderStyle: 'groove' }}
                            content={this.props.activeUser.coinType.Platinum}></Label>
                        </GridColumn>
                        <GridColumn> {this.props.activeUser.coinType.Gold > 0 ?
                          <Image src={golf} circular bordered onClick={() => this.handleSelectCion("Gold")}
                            style={{ marginLeft: 10, border: "5px solid #DAA520" }}></Image> :
                          <Popup
                            trigger={<Image src={golf} circular bordered
                              style={{ marginLeft: 10, border: "5px solid #DAA520" }}></Image>}
                            hoverable style={{ width: 300, height: 40 }}>
                            <p style={{ color: "red" }}>Your Gold Coin Balnce is 0!!</p>
                          </Popup>}
                          <Label style={{ color: "black", backgroundColor: "#DAA520", borderStyle: 'groove', marginRight: 10 }}
                            content={this.props.activeUser.coinType.Gold}></Label>
                        </GridColumn>
                        <GridColumn> {this.props.activeUser.coinType.Silver > 0 ?
                          <Image src={silver} circular onClick={() => this.handleSelectCion("Silver")}
                            style={{ marginRight: 30, border: "5px solid 	gray" }}></Image> :
                          <Popup
                            trigger={<Image src={silver} circular  b style={{ marginRight: 30, border: "5px solid 	gray" }}></Image>}
                            hoverable style={{ width: 300, height: 40 }}>
                            <p style={{ color: "red" }}>Your Silver Coin Balnce is 0!!</p>
                          </Popup>}
                          <Label style={{ color: "black", backgroundColor: "gray", borderStyle: 'groove', marginRight: 20 }}
                            content={this.props.activeUser.coinType.Silver}></Label>
                        </GridColumn>

                      </Grid>
                    </GridColumn>
                    <GridColumn>
                      <p style={{ textAlign: 'left', marginLeft: 70 }}><b>How are you associate with that person</b></p>
                      {this.state.errors.optionValuErr.length > 0 &&
                        <p style={{ textAlign: 'left', color: 'red', fontSize: "12px", marginLeft: 70 }}>{this.state.errors.optionValuErr}</p>}
                      <Dropdown
                        style={{ width: 200, marginLeft: 100, borderStyle: 'groove' }}
                        placeholder='Select'
                        name="optionValue"
                        onChange={this.handleChange}
                        selection
                        compact
                        options={selectOption}
                        fluid
                      ></Dropdown>
                    </GridColumn>
                    <TextArea style={{ width: 500, height: 90, marginRight: 100, marginLeft: 15 }} type='string' name='comment'
                      placeholder='Comment' min='10' max='60'
                      onChange={this.handleChange} />
                    {this.state.errors.commentErr.length > 0 &&
                      <p style={{ textAlign: 'left', color: 'red', fontSize: "12px" }}>{this.state.errors.commentErr}</p>}
                  </Grid>
                  <Grid columns={2}>
                    <GridColumn><Button style={{ width: 200, height: 40, marginRight: 80, borderStyle: 'groove' }} onClick={this.close}>Cancle</Button></GridColumn>
                    <GridColumn><Button style={myInputstyle} color='green' onClick={this.handleSubmitButton}>Submit</Button>
                    </GridColumn>
                  </Grid>
                </Modal.Actions>
              </Modal>}</div> :
          <div><Popup content='Cannot transfer coins to yourself' trigger={<div><Button disabled style={{ background: '#1EA896', color: 'white' }} floated='right' onClick={this.show(true)}> Reward Coins
       <i className="right chevron icon"></i></Button></div>} /></div>}
      </div>
    )
  }
}
//onClose={this.close} size="small" id="modaldiv"
export default TransferCoin