import React from 'react';
import {
    Form,
    Grid,
    Container,
    } from 'semantic-ui-react';
    
   function Search(props) {
    return(
    <Container  >
        <Grid columns={2}>
            <Grid.Column>
                <Form.Input
                    type = 'text'
                    icon ='search'
                    iconPosition='left'
                    placeholder='seacrch' 
                    size='small'    
                    width='8'    
                    onChange={props.handlUser}          
                    />
            </Grid.Column>
        </Grid>
    </Container>
);    
}
    export default Search;