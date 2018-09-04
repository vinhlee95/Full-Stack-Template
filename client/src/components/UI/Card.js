import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from './Chip';

import { connect } from 'react-redux';
import * as actions from '../../actions';

class SimpleMediaCard extends Component  {

   handleRemoveItem = () => {
      const { id } = this.props;
      this.props.deleteItem(id);
   }

   render() {
      const { image, name, description, chipLabel, price, url } = this.props;
      return (
         <Card className='card'>
         <CardMedia
            image={image}
            title="Item"
            style={{height: 200}}
         />
         <div className='card-content'>
               <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                     {name}
                  </Typography>
                  <Typography component="p">
                     {description?description:''}
                  </Typography>
               </CardContent>
               <div className='tags-container'>
                  <Chip label={chipLabel} />
                  <Chip label={price} />
               </div> 
               <CardActions className='card-button-row'>
                  <Button size="small" color="primary" onClick={() => window.location.href=`${url}`}>
                     Learn More
                  </Button>
                  <Button size='small' color='secondary' onClick={this.handleRemoveItem}>
                     Remove
                  </Button>
               </CardActions>
         </div>
         </Card>
      );
   }
}

export default connect(null, actions)(SimpleMediaCard)