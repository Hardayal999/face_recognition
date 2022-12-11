import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png'

const Logo =()=>{
    return(
      <div className='ma4 mt0'>
         <Tilt>
            <div className= "Tilt br3 shadow-2"style={{ height: '100px', width:"100px", backgroundColor: 'darkgreen' }}>
                <h1 className='Tilt-inner pa2'><img style={{paddingTop: "2px"}} src={brain} alt="brain"/></h1>
            </div>
         </Tilt>
      </div>
    )
}

export default Logo;