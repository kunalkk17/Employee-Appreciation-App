import React from 'react';
import{ Link}    from 'react-router-dom'
import { register } from './UserFunctions'
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
 } from 'semantic-ui-react';
const nameRegex = RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)
const strongRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
const employeeIdRegex= RegExp(/^[0-9]*$/)


class RegisterForm extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        name:"",
        employeeId:"",
        userName:"",
        password:"",
        password2:"",
        nameErr:"",
        employeeIdErr:"",
        userNameErr:"",
        passwordErr:"",
        password2Err:"", 
      };
    }
    valid()
    {
      if(this.state.name=="" )
      {
        this.setState({nameErr:"name name can not be empty"})                    
      }
      if(this.state.employeeId=="")
      {
        this.setState({employeeIdErr:"Employee Id can not be empty"})
      }
      if(this.state.userName==""){
        this.setState({userNameErr:"User Name can not be empty"})
      }
      if(this.state.password==""){
        this.setState({passwordErr:"password can not be empty"})
      }
      if(this.state.password2!=this.state.password){
        this.setState({password2Err:"not Matched"})
      }
      else if(this.state.name!=""&&this.state.employeeId!=""&&this.state.userName!=""
      &&this.state.password!=""&&this.state.password2!=""){
        return true
      }
    }
    handleChange= e=>
    {
      e.preventDefault();
        const {name , value} = e.target;
        let errors = this.state
        switch(name)
        {
            case "name":
              errors.nameErr =!nameRegex.test(value)&& value.length>0?"Invalid User Name ":"";
                break;
            case "employeeId":
              errors.employeeIdErr = !employeeIdRegex.test(value)&& value.length>0 ?"Invalid Employee code should contains numbers only ":"";
                break;
            case "userName":
              errors.userNameErr =value.length>10 && value.length>0 ?"Department Name should be in short form  ":"";
                break;
            case "password":
              errors.passwordErr = !strongRegex.test(value)&& value.length>0?" 8 character required and The string must contain at least one special character":"";
                break;
            case "password2":
              errors.password2Err = !strongRegex.test(value)&& value.length>0?" 8 character required and The string must contain at least one special character":"";
                break;
            default:
            break;
        }
        this.setState({errors,[name]:value},()=>console.log(errors))
    }
    handleSubmit= e=>
    {
     e.preventDefault()
      if(this.valid())
      {
        const newUser = {
          name: this.state.name,
          userName: this.state.userName,
          employeeId: this.state.employeeId,
          password: this.state.password,
          password2: this.state.password2
        }
    
        register(newUser).then(res => {
          this.props.history.push(`/login`)
        })
        alert("form has been submitted");

      }
    }
     render()
     {

       return( 
      <Grid centered columns='3'>
       <Grid.Column>
          <Header as="h2" textAlign="center">
              Register
          </Header>
         <Segment>
            <Form size="small">
              Name<Form.Input
                name = "name" 
                fluid size="small"
                icon="user"
                iconPosition="left"
                placeholder="Name"
                onChange= {this.handleChange}
              />
             {this.state.nameErr.length > 0 &&
              <Message color="red">
                {this.state.nameErr}
              </Message>
              }
              Employee Id<Form.Input
                name= "employeeId"
                placeholder="Employee Id"
                type="text"
                onChange={this.handleChange}
              />
                {this.state.employeeIdErr.length > 0 &&
              <Message color="red">
                {this.state.employeeIdErr}
              </Message>
                }
              User Name<Form.Input
                name="userName"
                placeholder="User Name"
                onChange={this.handleChange}
                />
                {this.state.userNameErr.length > 0 &&
              <Message color="red">
                {this.state.userNameErr}
              </Message>
                }
              Password<Form.Input
                name="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
              />
              {this.state.passwordErr.length > 0 &&
              <Message color="red">
                {this.state.passwordErr}
              </Message>
              }
             confirm Password<Form.Input
                name="password2"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                onChange={this.handleChange}
              />
              {this.state.password2Err.length > 0 &&
              <Message color="red">
                {this.state.password2Err}
              </Message>
              }
              <Button   fluid size="large" onClick = {this.handleSubmit} color='blue'>
              Register
              </Button>
            </Form>
          </Segment>
          <Message>
           Already have an account? <Link to="/login">Login</Link>
          </Message>
          </Grid.Column>
      </Grid>
       );
     }
  }

  export default RegisterForm;