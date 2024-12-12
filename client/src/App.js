import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import './App.css';
import Header from './Components/Header';
import { ethers } from 'ethers';
import Drive from './contracts/contracts/Drive.sol/Drive.json'
import Main from './Components/Main';
import { handleSubmit } from './utils/UploadFile';
import Loader from './Components/Loader';

function App() {
  const [state, setState] = useState({ provider: null, signer: null, contract: null })
  const [accounts, setAccounts] = useState(null)
  const [uploadedFile,setUploadedFile]=useState([])
  const [loading,setLoading]=useState({status:false,para:null})

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

  const CreateConnection = async (provider) => { // creating connection with contract
    let signer = await provider.getSigner()
    const ContractABI = Drive.abi
    const ContractAddress = '0xf3EAddc851d608E6262f5F8985bAdf548c22Bb95'
    const contract = new ethers.Contract(ContractAddress, ContractABI, signer)
    setState({ provider: provider, signer: signer, contract: contract })
  }

  const ConnectWallet = async () => {
  setLoading({status:true,para:'Connecting Wallet...'})
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
    setLoading({status:false,para:null})
  }

  const UploadFiletoPinata=async(selectedFile)=>{
    setLoading({status:true,para:'Please wait! Uploading your File'})
    const data=await handleSubmit(selectedFile,state); // handling file upload to pinata 
    console.log("data in the function uploadfiletopinata is ",data)
    console.log('file data in app.js function uploadFiletopinata',data.fileSize,data.timeStamp)
    setUploadedFile({fileURL:data.fileURL,fileSize:data.fileSize,timeStamp:data.timeStamp})
    setLoading({status:false,para:null})
  }

  return (
    <BrowserRouter>
    <Header ConnectWallet={ConnectWallet} state={state} accounts={accounts} UploadFiletoPinata={UploadFiletoPinata} />
    {loading.status && <Loader para={loading.para} />}
      <Routes>
        <Route path='/' element={<Main ConnectWallet={ConnectWallet} state={state} accounts={accounts} uploadedFile={uploadedFile} />} />
        <Route path='/about' />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// https://amber-neat-spoonbill-6.mypinata.cloud/ipfs/bafkreic73mduqnytqacz6rwpak7a4tvfjfbkem6xcbobofhdyivf5znmse
