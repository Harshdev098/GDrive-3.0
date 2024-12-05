import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import fileNotFound from '../filenotfound404.png'
// import Loading from '../Loading.gif'

export default function Header(props) {
    const [selectedFile, setSelectedFile] = useState(null)
    const [openUploads, setOpenUploads] = useState(false)

    const ConnectWallet = () => {
        props.ConnectWallet()
    }

    const handleFiles = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const uploadFile=()=>{
        props.UploadFiletoPinata(selectedFile);
        setOpenUploads(false)
    }

    useEffect(() => {
        if (props.state.contract) {
            const listener = (sender, url) => {
                console.log(`Debug: ${sender} uploaded ${url}`);
            };
            props.state.contract.on("DebugUpload", listener);
            return () => {
                props.state.contract.off("DebugUpload", listener);
            };
        }
    }, [props.state.contract]);

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <Link to="/about"><li>About</li></Link>
                        <Link to="https://github.com"><li>Github</li></Link>
                        <Link to="/contact"><li>Contact</li></Link>
                        <li>{props.accounts ? (<p>{`${props.accounts.slice(0, 7)}....${props.accounts.slice(36)}`}</p>) : (<button onClick={ConnectWallet}>Connect Wallet</button>)}</li>
                    </ul>
                </nav>
                <div className='mainHead'>
                    <h2>GDrive 3.0</h2>
                    <p>Your Local Decentralized Drive</p>
                    <button onClick={() => { setOpenUploads(true) }}>Upload Document</button>
                </div>
            </header>
            {openUploads ? (
                <div className='uploads'>
                    <form>
                        <h3>Upload File</h3>
                        <input type="file" onChange={handleFiles} />
                        <div className='uploadBtn'>
                            <button onClick={() => { setOpenUploads(false) }}>Cancel</button>
                            <button type='button' onClick={uploadFile}>Upload</button>
                        </div>
                    </form>
                </div>
            ) : ""}
        </>
    )
}
