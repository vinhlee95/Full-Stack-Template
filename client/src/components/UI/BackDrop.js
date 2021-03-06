import React from 'react';

const BackDrop = (props) => {
   return(
      <div
         onClick={props.handleClickBackDrop} 
         style={{
         position: 'fixed',
         top: 0, left: 0,
         width: '100%', height: '100vh',
         backgroundColor: 'rgba(256,256,256,0.6)',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         
      }}>
      </div>
   )
}

export default BackDrop;