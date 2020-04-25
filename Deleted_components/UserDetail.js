import React from "react";
import {
    Grid,Header, GridColumn, GridRow, Button,
    } from 'semantic-ui-react';

    class UserDetails extends React.Component{
    constructor(props){ 
        super(props); 
    }    
    render(){  
        const {id} = this.props.match.params
        const coinsDetails = this.props.location.state.id
        console.log(coinsDetails,'us')              
        return(
            <GridColumn >
            <Header as='h2' color="orange" textAlign='center'><i> Recieved coin history of '{id}'</i></Header>
            <Grid centered columns={4} >
                    <GridRow>
                        <GridColumn color='purple'>SenderName</GridColumn>
                        <GridColumn  color='purple'>Coins </GridColumn>
                        <GridColumn  color='purple'>comment</GridColumn> 
                    </GridRow>
            </Grid>
            <Grid centered columns={4}>
                {
                    coinsDetails?coinsDetails.map((li,key) => (
                    <GridRow key={li.id} >
                        <GridColumn  color='grey'><i><u>{li.SenderName}</u></i></GridColumn>
                        <GridColumn color='grey'>{li.coins} </GridColumn>
                        <GridColumn color='grey'>{li.comment} </GridColumn>                   
                    </GridRow>
                    )):null
                }
            </Grid>
            
            {/* {this.state.isTransfercoin &&<TransferCoin/>} */}
        </GridColumn>
        )

    }
       
}

export default UserDetails ;