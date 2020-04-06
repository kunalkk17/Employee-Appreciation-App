import React from "react";
import {
    Grid,Header, GridColumn, GridRow, Button, Input,
    } from 'semantic-ui-react';

    class MainUserCoinHistroy extends React.Component{
    constructor(props){ 
        super(props);  
    }             
        render(){ 
            let coinsDetails = this.props.user
            console.log(coinsDetails,'coinhiory')  
        return(
            <GridColumn >
            <Header as='h5' color="orange" textAlign='center'><i> Recieved coin history</i></Header>
            <Grid columns={3} >
                    <GridRow >
                        <GridColumn ><i><u> SenderName</u></i></GridColumn>
                        <GridColumn ><i><u>Coins</u></i> </GridColumn>
                        <GridColumn ><i><u>Comment</u></i></GridColumn> 
                    </GridRow>
            </Grid> 
            <Grid columns={3}>
                { coinsDetails?coinsDetails.map(l => (l.map(li=>(
                    <GridRow key={li.id} >
                        <GridColumn>{li.SenderName}</GridColumn>
                        <GridColumn >{li.coins} </GridColumn>
                        <GridColumn>{li.comment} </GridColumn>                   
                    </GridRow>
                    ))
                 )):null
                }
            </Grid>
        </GridColumn>
        )
    }      
}

export default MainUserCoinHistroy ;