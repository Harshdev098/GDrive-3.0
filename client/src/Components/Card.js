import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import preview from '../preview.jpg'
import { pinata } from '../utils/pinata'
import { GiveAccessToUser } from '../utils/Access'
import AccessList from './AccessList'
import Loader from './Loader'

export default function Card(props) {
  const [dialogBox, setDialogBox] = useState(false)
  const [accessList,setAccessList]=useState([])
  const [loading,setLoading]=useState({status:false,para:null})
  const name = useRef()

  const DeleteFile = async () => {
    if (window.confirm("Are You sure to delete this file")) {
      setLoading({status:true,para:'Deleting Your File'})
      try {
        const unpin = await pinata.unpin([`${props.data.fileURL}`])
        alert("File deleted successfuly!")
        setDialogBox(false)
      } catch (err) {
        console.log("an error occured while deletion ", err)
        alert("An error occured while deletion")
      }
      setLoading({status:false,para:null})
    }
  }

  const GiveAccess = async() => {
    const userAddress = name.current.value.trim()
    if (!userAddress || !/^0x[a-fA-F0-9]{40}$/.test(userAddress)) {
      alert("Please enter a valid Ethereum address.");
      return;
    }
    setLoading({status:true,para:'Forwarding Access!'})
    const result=await GiveAccessToUser(props.data.fileURL,userAddress, props.state)
    console.log("result of giveaccess",result)
    if (result) {
      setAccessList((prev) => [...prev, { status: true, userAddress }]);
      alert("Access given to the user: " + userAddress);
    } else {
      alert("Failed to give access to the user.");
    }
    setLoading({status:false,para:null})
  }

  const handleRevokeAccess=(address)=>{
    setAccessList((prev)=>prev.filter(item=>item.userAddress!==address))
  }

  useEffect(()=>{
    const displayAccessList=async()=>{
      setLoading({status:true,para:'Please Wait!!'})
      const list=await props.state.contract.getAccessList(props.data.fileURL)
      const parsedList = list.map(item => ({
        status: item[0], 
        userAddress: item[1] 
      }));
      setAccessList(parsedList);
      setLoading({status:false,para:null})
    }
    if(props.state.contract){
      displayAccessList()
    }
  },[dialogBox])

  return (
    <>
    {loading.status && <Loader para={loading.para} />}
      <li>
        <img src={preview} alt="" />
        <div className="hover-text"><button onClick={() => { setDialogBox(true) }}>Access & Details<i className="fa-solid fa-diamond-turn-right" style={{ fontSize: "19px", padding: "0 6px" }}></i></button></div>
        <h3 onClick={() => { setDialogBox(true) }} style={{ cursor: 'pointer' }}>FileName</h3>
        <p>Date Modified: {props.data.timeStamp} </p>
        <p>File size: {props.data.fileSize} </p>
        <Link to={`https://amber-neat-spoonbill-6.mypinata.cloud/ipfs/${props.data.fileURL}`} style={{ textDecoration: 'none' }}><button>Open</button></Link>
      </li>
      {dialogBox ? (
        <div className='dialogContainer'>
          <div className='dialogContainerUpper'>
            <p>File Name: <span>dsfsdfsdfsd</span></p>
            <p>Date Modified: <span>{props.data.timeStamp}</span></p>
            <p>Size: <span>{props.data.fileSize}</span></p>
            <p>Access Given:</p>
            <ol>
              {accessList.length!==0 ? accessList.map((list,index)=>{
                return <AccessList key={index} accessList={list} state={props.state} imageURL={props.data.fileURL} onRevoke={handleRevokeAccess} />
              }) : <p>No access List present</p>}
            </ol>
            <p>Link:</p>
            <p><span>{`https://amber-neat-spoonbill-6.mypinata.cloud/ipfs/${props.data.fileURL}`}</span></p>
            <button className='CopyLink' onClick={(e) => {
              navigator.clipboard.writeText(`https://amber-neat-spoonbill-6.mypinata.cloud/ipfs/${props.data.fileURL}`); e.target.innerText = 'Copied!!'
            }}>Copy Link</button>
            <p>Share Access</p>
            <form>
              <input type="text" placeholder='Enter User Address 0x...' ref={name} />
              <button type='button' onClick={GiveAccess}>Give Access</button>
            </form>
          </div>
          <div className='ContainerBtn'>
            <button onClick={DeleteFile}>Delete</button>
            <button onClick={() => { setDialogBox(false) }}>Close</button>
          </div>
        </div>
      ) : (<p style={{ display: "none" }}></p>)}
    </>
  )
}
