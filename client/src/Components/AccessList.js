import React from 'react'
import { RevokeAccessFromUser } from '../utils/Access'
import Loading from '../Loading.gif'

export default function AccessList(props) {
    const [loading, setLoading] = useState(false)

    const RevokeAccess = async () => {
        setLoading(true)
        await RevokeAccessFromUser(props.imageURL, props.accessList.userAddress, props.state)
        props.onRevoke(props.accessList.userAddress)
        setLoading(false)
    }

    return (
        <>
            <li style={{ display: props.accessList.status ? 'flex' : 'none' }}><p>{props.accessList.userAddress}</p><button onClick={RevokeAccess}>Revoke Access</button></li>
        </>
    )
}
