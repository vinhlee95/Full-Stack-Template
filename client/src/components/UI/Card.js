import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from './Chip';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
};

const SimpleMediaCard = (props) =>  {

  return (
      <Card className='card'>
        <CardMedia
          image={props.image}
          title="Item"
          style={{height: 350}}
        />
        <div className='card-content'>
            <CardContent>
               <Typography gutterBottom variant="headline" component="h2">
                  {props.name}
               </Typography>
               <Typography component="p">
                  {props.description?props.description:''}
               </Typography>
            </CardContent>
            <div className='tags-container'>
               <Chip label={props.chipLabel} />
               <Chip label={props.price} />
            </div> 
            <CardActions className='card-button-row'>
               <Button size="small" color="primary" onClick={() => window.location.href=`${props.url}`}>
                  Learn More
               </Button>
               <Button size='small' color='secondary'>
                  Remove
               </Button>
            </CardActions>
        </div>
      </Card>
  );
}

export default withStyles(styles)(SimpleMediaCard);