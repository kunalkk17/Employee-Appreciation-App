import React from 'react'
import th from './th.jpg';
import { Button,Grid,Divider,Segment,
    Container, GridColumn,Label,Input } from 'semantic-ui-react';
import Search  from './Search'
import UserList from './UserList'
import MainUserCoinHistroy from './MainUserCoinHistory';
   
class MainForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userlist: [{
                id:'101',
                Username:'shefali gupta',
                EmployeeCode:'1198',
                Department:'FAS',
                TotalRecieveCoin:'70',
                coinsDetails:[{
                    id:'101',
                    SenderName:'AkshitaSharma',
                    coins:'2',
                    comment:'she helps how to import data from api'
                },
                {
                    id:'1001',
                    SenderName:'AkshitaSharma',
                    coins:'2',
                    comment:'she helps how to import data from api'
                },
                {
                    id:'1002',
                    SenderName:'AkshitaSharma',
                    coins:'2',
                    comment:'she helps how to import data from api'
                },{
                    id:'1003',
                    SenderName:'AkshitaSharma',
                    coins:'2',
                    comment:'she helps how to import data from api'
                }]
            },
            {
                id:'1004',
                Username:'Akshita gupta',
                EmployeeCode:'1190',
                Department:'FAS',
                TotalRecieveCoin:'60',
                coinsDetails:''
            },
            {
                id:'102',
                Username:'kunal kumar',
                EmployeeCode:'1195',
                Department:'FAS',
                TotalRecieveCoin:'60',
                coinsDetails:''
            },
            {
                id:'104',
                Username:'Aradhya Kansal',
                EmployeeCode:'124',
                Department:'FAS',
                TotalRecieveCoin:'60',
                coinsDetails:''
            },
            {
                id:'106',
                Username:'Gaurav sharma',
                EmployeeCode:'125',
                Department:'FAS',
                TotalRecieveCoin:'60',
                coinsDetails:''
            },
            {
                id:'107',
                Username:'Nikhil gupta',
                EmployeeCode:'126',
                Department:'FAS',
                TotalRecieveCoin:'60',
                coinsDetails:''
            },
            {
                id:'108',
                Username:'Toshi jain',
                EmployeeCode:'128',
                Department:'FAS',
                TotalRecieveCoin:'60',
                coinsDetails:''
            }
            ],
            OtherUsers:''
        }

    }
    handlUser = e=>{
        console.log(e.target.value)
        this.setState({OtherUsers:e.target.value})
    }
    render(){
        const {id}= this.props.match.params
         let filterMainUser = this.state.userlist?this.state.userlist.filter(user =>{
            return user.EmployeeCode.includes(id)}):null  
                                         
        let mainuserCoinHistory = filterMainUser?filterMainUser.map(x =>(x.coinsDetails)):null
        let userDetails = this.state.userlist.filter(user =>{ return user.EmployeeCode !==id})
        let filterUsers = userDetails.filter(user =>{
            return user.Username.toLowerCase().includes(this.state.OtherUsers.toLowerCase())})
return(
<Container>
    <Search handlUser={this.handlUser}/>
    <Segment placeholder>
        <Grid centered columns={2}>
            <UserList list={filterUsers}/>
            <Grid.Column verticalAlign='middle'>
                <Grid.Row>
                    <img src={th} width='100px'/>
                </Grid.Row>
                <Grid.Row>
                    <Grid columns={2}>
                        <GridColumn>
                            <Label> User Name</Label><Input>{filterMainUser?filterMainUser.map(x =>(x.Username)):null}</Input><br/>
                       <br/><Label> EmployeeCode</Label><Input> {filterMainUser.map(x =>(x.EmployeeCode))}</Input> <br/>
                        </GridColumn>
                        <GridColumn>
                            <Label> Department</Label><Input>{filterMainUser.map(x =>(x.Department))}</Input><br/>
                            <br/><Label>Coins</Label><Input>{filterMainUser.map(x =>(x.TotalRecieveCoin))}</Input>
                        </GridColumn>
                    </Grid>
                </Grid.Row>
                <Grid.Row>
                      <MainUserCoinHistroy user={mainuserCoinHistory}/>
                </Grid.Row>
            </Grid.Column>

            </Grid>
            <Divider vertical></Divider>
        </Segment>
</Container>   
    );
}
}

export default MainForm;

 