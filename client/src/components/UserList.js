import React from 'react'
import {
    Button,Grid,Header, GridColumn, GridRow, Label,
    } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import TransferCoin from './TransferCoin'

class UserList  extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            isTransfercoin:false
        }
    }
    render(){
        let UserList = this.props.list;
            return(
            <GridColumn>
                <Header as='h3' color="orange"><i>other users coin</i></Header>
                <Grid columns={3} >
                        <GridRow>
                            <GridColumn><Label>user</Label> </GridColumn>
                            <GridColumn><Label>RecievedCoins</Label> </GridColumn>
                            <GridColumn><Label>AddCoins</Label> </GridColumn>
                        </GridRow>
                </Grid>
                <Grid columns={3}>
                    {
                        UserList.map((li,key)=>
                        <GridRow key={li.EmployeeCode}>
                            <GridColumn>< Link to = {{pathname:`/user/${li.Username}`,state:{id:li.coinsDetails}}}>
                                {li.Username}</ Link> </GridColumn>
                            <GridColumn>{li.TotalRecieveCoin} </GridColumn>
                            <GridColumn>
                                <Button onClick={(e) => this.setState({isTransfercoin:true})}> +</Button>
                                {this.state.isTransfercoin &&<TransferCoin usercode ={li.EmployeeCode}/>}
                            </GridColumn>
                        </GridRow>
                        )
                    }                         
                </Grid>
            </GridColumn>
        )
    }

}

export default UserList;