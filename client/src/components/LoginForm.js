import React from 'react';
import{ Link}    from 'react-router-dom'
import history from './history';
import { login } from './UserFunctions'

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  } from 'semantic-ui-react';
const strongRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
const EmpCodeRegex= RegExp(/^[0-9]*$/)
const formValid= errors=>{
    let valid = true;
    Object.values(errors).forEach(val =>{ val.length > 0 && (valid= false)
    });
    return valid;
}
class LoginForm extends React.Component
{
   constructor(props)
   {
      super(props);
      this.state=
      {
        employeeId : null,
         password: null,
         errors:
           {
              employeeIdErr: '',
              passwordErr: '',
           }
     };
    } 

    valid()
  {
    let errors = {...this.state.errors}
     if(this.state.employeeId==null)
    {
      errors.employeeIdErr ='User id Can not be null';
      this.setState({errors})
      
    }
    if(this.state.password==null)
    {
      errors.passwordErr ='password  Can not be null';
      this.setState({errors})
    }
    else if (this.state.employeeId!=null && this.state.password!=null) {
      return true
    }
    else
    {return false}
  }

  handleSubmit = e =>{
    console.log("hellooo")
    e.preventDefault();
    if( this.valid() &&formValid(this.state.errors)){
      console.log("valid true")
      const user = {
        employeeId: this.state.employeeId,
        password: this.state.password
      }
      login(user).then(res => {
        console.log("inside login")
        if (res) {
          console.log(res)
          this.props.history.push(`/home`)
        }
      })
    }
    return false;
    
  }
    handleChange = e =>{
        e.preventDefault();
        const {name , value} = e.target;
        let errors = this.state.errors;
        switch(name)
        {
            case "employeeId":
                errors.employeeIdErr =!EmpCodeRegex.test(value) && value.length>0 ?"Invalid employeeId":"";
                break;
            case "password":
                errors.passwordErr = !strongRegex.test(value)?" 8 character required and The string must contain at least one special character":"";
                break;
            default:
            break;
        }

        this.setState({errors,[name]:value})
    }
   render()
   {
     const{errors} = this.state;
     
     return(
      <Grid textAlign='center' style={{ height: '100vh' }} >
     <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            Login
          </Header>
       <Form size='large'>
        <Segment stacked>
            <Form.Input
                      name ="employeeId"
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Employee Id"
                      type ="text"
                      required
                      onChange={this.handleChange}
                   />
                  
          {errors.employeeIdErr.length>0 &&
            <Message color="red   ">{errors.employeeIdErr}</Message>
          }
            <Form.Input
              name="password" 
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="password"
              type="password"
              required
              onChange={this.handleChange}
            />
            {errors.passwordErr.length>0 &&
            <Message color="red">{errors.passwordErr}</Message>
          }
            <Button   fluid size="large" type= "submit" onClick={this.handleSubmit} color='blue'>
              Login
           </Button>
          
         
        </Segment>
        </Form>
        <Message>
         Dont have an account? <Link to="/Register">Register</Link>
        </Message>
      </Grid.Column>
    
    </Grid>
    
     );
   }
}

export default LoginForm;