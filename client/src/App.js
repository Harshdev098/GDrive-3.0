import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import { ethers } from 'ethers';
import Drive from './contracts/contracts/Drive.sol/Drive.json'
import Main from './Components/Main';
import { handleSubmit } from './utils/UploadFile';
import Loading from './Loading.gif'

function App() {
  const [state, setState] = useState({ provider: null, signer: null, contract: null })
  const [accounts, setAccounts] = useState(null)
  const [uploadedFile,setUploadedFile]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        window.ethereum.on('chainChanged', () => {
          window.location.reload()
        })
        window.ethereum.on('accountsChanged', async () => {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          setAccounts(accounts[0])
        })
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        let provider = new ethers.BrowserProvider(window.ethereum)
        CreateConnection(provider)
        setAccounts(accounts[0])
      }
    }
    checkConnection()
  }, [])

  const CreateConnection = async (provider) => {
    let signer = await provider.getSigner()
    console.log("signer: ", signer)
    const ContractABI = Drive.abi
    const ContractAddress = '0xAA8D47967484e950c92349fC602b2aA4Ee1B6E03'
    const contract = new ethers.Contract(ContractAddress, ContractABI, signer)
    setState({ provider: provider, signer: signer, contract: contract })
  }

  const ConnectWallet = async () => {
    setLoading(true)
    let provider
    if (window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccounts(accounts[0])
    }
    else if (window.web3) {
      provider = new ethers.BrowserProvider(window.web3.currentProvider)
    }
    else {
      alert("No Wallet Found!! Please use Metamask")
    }
    await CreateConnection(provider)
    setLoading(false)
  }

  const UploadFiletoPinata=async(selectedFile)=>{
    setLoading(true)
    console.log("calling uploadFiletoPinata function")
    const data=await handleSubmit(selectedFile,state);
    console.log("data in the function uploadfiletopinata is ",data)
    setUploadedFile({fileURL:data.fileURL,fileSize:data.fileSize,timeStamp:data.timeStamp})
    setLoading(false)
  }

  return (
    <BrowserRouter>
    <Header ConnectWallet={ConnectWallet} state={state} accounts={accounts} UploadFiletoPinata={UploadFiletoPinata} />
      <Routes>
        <Route path='/' element={<Main ConnectWallet={ConnectWallet} state={state} accounts={accounts} uploadedFile={uploadedFile} />} />
        <Route path='/about' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// https://amber-neat-spoonbill-6.mypinata.cloud/ipfs/bafkreic73mduqnytqacz6rwpak7a4tvfjfbkem6xcbobofhdyivf5znmse
