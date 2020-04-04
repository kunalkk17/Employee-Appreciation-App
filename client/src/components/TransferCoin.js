import React, { Component, Children } from 'react'
import { Button, Header, Image, Modal, Form, Grid, Segment, Dropdown, Menu, Item, GridColumn } from 'semantic-ui-react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import $ from 'jquery'
class TransferCoin extends Component {
  constructor(props)
  {
    super(props)
    this.state={open: true , Coins:'1'}
    
  }
  ///show = (dimmer) => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })
  render() {
    const { open, dimmer } = this.state
    let usercode = this.props.usercode;
    console.log(this.props,'hi')
    return (
      <div>
        <Modal centered  open={open} onClose={this.close} size ='mini'>
            <Modal.Header >TransferCoin</Modal.Header>
          <Modal.Actions >
              <Grid centered>
                  <Segment>
                      <Form>
                         EmployeeCode <Form.Input
                                Icon='user'
                                placeholder ={usercode}
                          />
                             <Dropdown
                              icon='dropdown icon'
                              placeholder = 'coins'
                              search 
                              selection
                              multiple
                              options={this.state.Coins}
                              />
                           <Form.Input type='text' name='Comment' placeholder='Comment'/>
                           <Grid columns={2}>
                               <GridColumn><Button onClick={this.close}>Cancle</Button></GridColumn>
                               <GridColumn><Button>Submit</Button></GridColumn>
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