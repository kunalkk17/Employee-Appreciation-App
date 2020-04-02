import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
    } from 'semantic-ui-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
class MainForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state ={isLoginOpen: true, isRegisterOpen:false};
    }
  
    showLoginBox(){
      this.setState({isLoginOpen: true ,isRegisterOpen:false})
    }
    showRegisterBox(){
      this.setState({isRegisterOpen: true ,isLoginOpen:false})
    }
 render()
 {
   return(      
     <Grid centered >
       <Header as= "h1" >
        </Header>
        <Header as= "h1" color="blue" textAlign="center">
            Employee Appriciation App
        </Header>
       <Grid.Row>
        <Segment>
          <Form>
            <Button onClick={this.showLoginBox.bind(this)}>Login</Button>
            <Button onClick={this.showRegisterBox.bind(this)}>Register</Button>
          </Form>
        </Segment>
       </Grid.Row>
       {this.state.isLoginOpen && <LoginForm/>}
       {this.state.isRegisterOpen && <RegisterForm/>}
    </Grid>
  );
 }
}
export default MainForm;
