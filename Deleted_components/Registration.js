import React from 'react';
import logo from './logo.svg';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  GridColumn,
} from 'semantic-ui-react';
const ApplicationOverView = () =>(
    <Grid>
        <GridColumn>
            <p> This application is for to appriciate your team memebers for his or her work</p>
        </GridColumn>
    </Grid>

);
export default () => (
    <Grid>
    <Grid.Column>
    <Header as= "h1" color="blue" textAlign="center">
        Employee Appriciation App
        </Header>
      <Header as="h2" textAlign="center">
        Login
      </Header>
      <Segment>
        <Form size="large">
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Email address"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"  
          />
          <Button   fluid size="large">
          <a href ="https://www.facebook.com/">Login</a> 
          </Button>
        </Form>
      </Segment>
      <Message>
        Not registered yet? <a href="#">Sign Up</a>
      </Message>
    </Grid.Column>
  </Grid>
);