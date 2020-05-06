import React from 'react';
import { Link } from 'react-router-dom'
import { register } from './UserFunctions'
import {
  Button, Form, Grid, Header, Message, Segment, GridColumn, Dropdown, Select, Radio,
} from 'semantic-ui-react';
import {TeamLeadList, DeptOption, TeamOption, nameRegex, strongPassRegex, EmpCodeRegex } from './CommonFunction'
import { ValidateRegistrationForm } from './Validation'

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      employeeId: "",
      userName: "",
      department: "",
      team: "",
      teamlead: "",
      email: "",
      password: "",
      password2: "",
      OptionValue: '',isTeamLead: true,
      errors: {
        nameErr: "",
        employeeIdErr: "",
        userNameErr: "",
        depterr: '',
        teamErr: '',
        emailErr: "",
        passwordErr: "",
        password2Err: "",
        OptionValuErr: ""
      }

    };
  }


  handleChange = (e, { name, value }) => {
    e.preventDefault();
    let states = this.state
    let errors = this.state.errors
    console.log(value, name)
    switch (name) {
      case "name":
        errors.nameErr = !nameRegex.test(value) && value.length > 0 ? "Invalid User Name " : "";
        break;
      case "employeeId":
        errors.employeeIdErr = !EmpCodeRegex.test(value) && value.length > 0 ? "Invalid Employee code should contains numbers only " : "";
        break;
      case "userName":
        errors.userNameErr = value.length > 10 && value.length > 0 ? "UserName Name should be in short form  " : "";
        break;
      case "team":
        console.log(TeamLeadList)
        let teamList = TeamLeadList.filter(leader=>{return leader.Team ===value})
        console.log(teamList[0],'teamList')
         states.teamlead =teamList[0].TeamLead
        states.team = value
        states.isTeamLead = value.length >0 ?false: true
        errors.teamErr = value.length < 0 ? "please select team" : ''
        break;
      case "department":
        states.department = value
        errors.depterr = value.length < 0 ? "please select your departmnet" : ''
        break;
      case "email":
          errors.emailErr = value.length >50 ? "please enter valid email Address" : ''
          break;
      case "password":
        errors.passwordErr = !strongPassRegex.test(value) && value.length > 0 ? " 8 character required and The string must contain at least one special character" : "";
        break;
      case "password2":
        errors.password2Err = !strongPassRegex.test(value) && value.length > 0 ? " 8 character required and The string must contain at least one special character" : "";
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value, states }, () => console.log(errors))
    console.log(this.state.teamlead,'teamLead')
  }

  handleSubmit = e => {
    e.preventDefault()
    let states = this.state
    console.log({ states })
    const { errors, isValid } = ValidateRegistrationForm(this.state)
    console.log(isValid,'validation')
    if (isValid) {
      console.log('New User')
      const newUser = {
        name: this.state.name,
        userName: this.state.userName,
        employeeId: this.state.employeeId,
        department:this.state.department,
        team: this.state.team,
        teamLead: this.state.teamlead,
        emailId:this.state.email,
        password: this.state.password,
        password2: this.state.password2
      }

      register(newUser).then(res => {
        console.log(res);
        //console.log('user registered')
        alert("form has been submitted");
        this.props.history.push(`/login`)
        
      })
      

    }

    else {
      console.log(errors)
      this.setState({ errors })
    }
  }
  handleSelectValue = (e, { value }) => {
    let errors = this.state.errors
    console.log(value)
    errors.OptionValuErr = ''
    this.setState({ OptionValue: value, errors })
  }

  render() {
    return (
      <Grid centered >
        <Grid.Column width={6} >
          <Header as="h2" textAlign="center">
            Register
          </Header>
          <Segment>
            <Form size="large">

              <Form.Input
                name="name"
                fluid 
                icon="user"
                iconPosition="left"
                placeholder="Name"
                onChange={this.handleChange}
              />
              {this.state.errors.nameErr.length > 0 &&
                <p style={{ color: 'red' }}> {this.state.errors.nameErr}</p>

              }
              <Form.Input
                name="userName"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="User Name"
                onChange={this.handleChange}
              />
              {this.state.errors.userNameErr.length > 0 &&
                <p style={{ color: 'red' }}> {this.state.errors.userNameErr}</p>
              }
              <Grid columns={2}>
                <GridColumn  >
                  <Form.Input
                    name="employeeId"
                    placeholder="Employee Id"
                    type="text"
                    onChange={this.handleChange}
                  />
                  {this.state.errors.employeeIdErr.length > 0 &&
                    <p style={{ color: 'red' }}> {this.state.errors.employeeIdErr}</p>
                  }
                </GridColumn>
                <Grid.Column  >
                  <Dropdown
                    placeholder='Department'
                    name="department"
                    fluid
                    onChange={this.handleChange}
                    selection
                    options={DeptOption}
                  />
                  {this.state.errors.depterr.length > 0 &&
                    <p style={{ color: 'red' }}> {this.state.errors.depterr}</p>
                  }
                </Grid.Column>
              </Grid><br />
              <Grid columns={2}>
                <GridColumn>
                 <Dropdown name="team" placeholder='Team' fluid search selection options={TeamOption}
                    onChange={this.handleChange} >
                  </Dropdown>
                  {this.state.errors.teamErr.length > 0 &&
                    <p style={{ color: 'red' }}>
                      {this.state.errors.teamErr}
                    </p>
                  }
                </GridColumn>
                <GridColumn>
                  <Form.Input name="teamlead" placeholder={this.state.teamlead} disabled={this.state.isTeamLead}
                  focus readOnly>

                  </Form.Input>
                </GridColumn>

              </Grid><br></br>
              <Form.Input
                name="email"
                fluid
                placeholder="Email ID"
                onChange={this.handleChange}
              />
              {this.state.errors.emailErr.length > 0 &&
                <p style={{ color: 'red' }}> {this.state.errors.emailErr}</p>
              }

              <Form.Input
                name="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.handleChange}
              />
              {this.state.errors.passwordErr.length > 0 &&
                <p style={{ color: 'red' }}> {this.state.errors.passwordErr}</p>
              }
             <Form.Input
                name="password2"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                onChange={this.handleChange}
              />
              {this.state.errors.password2Err.length > 0 &&
                <p style={{ color: 'red' }}> {this.state.errors.password2Err}</p>
              }
              <Button fluid size="large" onClick={this.handleSubmit} style={ {background:'#1EA896',color:'white'}}>
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