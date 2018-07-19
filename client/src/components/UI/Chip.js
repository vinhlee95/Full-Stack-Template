import React from 'react';
import Chip from '@material-ui/core/Chip';

const Chips = (props) =>  {
  return (
      <Chip className='chip' label={props.label}/>
  );
}

export default Chips;