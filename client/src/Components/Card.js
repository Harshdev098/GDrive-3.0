import React from 'react'
import { Link } from 'react-router-dom'
import preview from '../preview.jpg'

export default function Card(props) {
  return (
    <>
          <li>
            <img src={preview} alt="" />
            <div className="hover-text"><button>Detail</button></div>
            <h3><Link to={`https://amber-neat-spoonbill-6.mypinata.cloud/ipfs/${props.data.fileURL}`}>FileName</Link></h3>
            <p>Date Modified: {props.data.timeStamp} </p>
            <p>File size: {props.data.fileSize} </p>
            <Link to={`https://amber-neat-spoonbill-6.mypinata.cloud/ipfs/${props.data.fileURL}`} style={{textDecoration:'none'}}><button>Open</button></Link>
          </li>
    </>
  )
}
