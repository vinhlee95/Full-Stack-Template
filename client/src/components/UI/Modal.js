import React from 'react';
import BackDrop from './BackDrop';

const Modal = (props) => {
   return(
      <div>
         <BackDrop handleClickBackDrop={props.handleClickBackDrop} />
         <div style={{zIndex: 1000}}>
            {props.children}
         </div>
      </div>
   )
}

export default Modal;