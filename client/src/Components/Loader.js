import React from 'react'
import Loading from '../Loading.gif'

export default function Loader(props) {
  return (
    <div className='Loader'>
        <img src={Loading} alt="" style={{width:'10vw'}} />
        <p style={{textAlign:'center',fontSize:'20px',color:'white',fontWeight:'bold'}}>{props.para}</p>
    </div>
  )
}
