import React,{useState} from 'react'
import { RevokeAccessFromUser } from '../utils/Access'
import Loader from './Loader'

export default function AccessList(props) {
    const [loading, setLoading] = useState({status:false,para:null})

    const RevokeAccess = async () => {
        setLoading({status:true,para:'Revoking Access...'})
        await RevokeAccessFromUser(props.imageURL, props.accessList.userAddress, props.state)
        props.onRevoke(props.accessList.userAddress)
        setLoading({status:false,para:null})
    }

    return (
        <>
            {loading.status && <Loader para={loading.para} />}
            <li style={{ display: props.accessList.status ? 'flex' : 'none' }}><p>{props.accessList.userAddress}</p><button onClick={RevokeAccess}>Revoke Access</button></li>
        </>
    )
}
