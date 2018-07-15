import React from 'react';

const BackDrop = (props) => {
   return(
      <div
         onClick={props.handleClickBackDrop} 
         style={{
         position: 'absolute',
         top: 0, left: 0,
         width: '100%', height: '100vh',
         backgroundColor: 'rgba(0,0,0,0.6)',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         
      }}>
      </div>
   )
}

export default BackDrop;