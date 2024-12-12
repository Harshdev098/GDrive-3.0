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
  const [uploadedFile, setUploadedFile] = useState([])
  const [loading, setLoading] = useState({ status: false, para: null })

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });
        window.ethereum.on('accountsChanged', async (newAccounts) => {
          if (newAccounts.length === 0) {
            console.log("MetaMask wallet disconnected");
            setAccounts(null);
            setState({ provider: null, signer: null, contract: null });
            window.location.reload()
          } else {
            console.log("MetaMask account changed:", newAccounts[0]);
            let provider = new ethers.BrowserProvider(window.ethereum);
            setAccounts(newAccounts[0]);
            await CreateConnection(provider);
          }
        });
      }
    };
    checkConnection();
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => { });
        window.ethereum.removeListener('chainChanged', () => { });
      }
    };
  }, []);

  const CreateConnection = async (provider) => { // creating connection with contract
    let signer = await provider.getSigner()
    const ContractABI = Drive.abi
    const ContractAddress = '0xA7805153cd6989CcECf467f7506c1eF8dFf7Ae09'
    const contract = new ethers.Contract(ContractAddress, ContractABI, signer)
    setState({ provider: provider, signer: signer, contract: contract })
  }

  const ConnectWallet = async () => {
    setLoading({ status: true, para: 'Connecting Wallet...' })
    try {
      let provider
      if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum)
        let network = await provider.getNetwork()
        if ((network.chainId).toString() === '11155111') {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
          setAccounts(accounts[0])
        }
        else {
          alert("please connect to sepolia network")
          return;
        }
      }
      else if (window.web3) {
        provider = new ethers.BrowserProvider(window.web3.currentProvider)
      }
      else {
        alert("No Wallet Found!! Please use Metamask")
      }
      await CreateConnection(provider)
    } catch (err) {
      console.log("an error occured", err)
    } finally {
      setLoading({ status: false, para: null })
    }
  }

  const UploadFiletoPinata = async (selectedFile) => {
    setLoading({ status: true, para: 'Please wait! Uploading your File' })
    const data = await handleSubmit(selectedFile, state); // handling file upload to pinata 
    setUploadedFile({ fileURL: data.fileURL, fileSize: data.fileSize, timeStamp: data.timeStamp })
    setLoading({ status: false, para: null })
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
