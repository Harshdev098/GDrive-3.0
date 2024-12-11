import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import fileNotFound from '../filenotfound404.png'
import Loading from '../Loading.gif'


export default function Main(props) {
  const {state}=props
  const [fileData, setFileData] = useState([])
  const [userFiles, setUserFiles] = useState(false)
  const [accessedFiles, setAccessedFiles] = useState(false)
  const [allFiles, setAllFiles] = useState(true)
  const [loading,setLoading]=useState(false)

  //displaying accessed files 
  const displayAccessFiles = async () => {
    if (props.state.contract) {
      setLoading(true)
      const data = await props.state.contract.displayData()
      console.log("uploaded data: ", data)
      const formattedData = data.map((fileURL) => ({
        fileURL,
        fileSize: "23432",
        timeStamp: "3245345345"
      }));
      setFileData(formattedData);
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(allFiles===true){
      console.log("displaying the recently uploaded file",props.uploadedFile)
      setFileData((prevFiles)=>[...prevFiles,props.uploadedFile])
    }
    else if(userFiles===true){
      setUserFiles((prevFiles)=>[...prevFiles,props.uploadedFile])
    }
  },[props.uploadedFile])

  //displaying user files
  const displayUserFiles = async () => {
    if (props.state.contract) {
      setLoading(true)
      const Userdata = await props.state.contract.displayUserFiles(props.accounts)
      console.log("user uploaded data: ", Userdata)
      const formattedData = Userdata.map((fileURL) => ({
        fileURL,
        fileSize: "23432",
        timeStamp: "3245345345"
      }));
      setFileData(formattedData);
      setLoading(false)
    }
  }

  useEffect(() => {
    if (props.state.contract) {
      if (allFiles === true) {
        displayAccessFiles()
        displayUserFiles()
      }
      else if (accessedFiles === true) {
        displayAccessFiles()
      }
      else if (userFiles === true) {
        displayUserFiles()
      }
    }
  }, [props.state.contract, accessedFiles, allFiles, userFiles])

  return (
    <>
      <main>
        <div className='btns'>
          <button onClick={() => { setAccessedFiles(false); setAllFiles(true); setUserFiles(false) }} style={{backgroundColor: allFiles ? 'black' : 'white', color: allFiles ? 'white' : 'black'}}>All</button>
          <button onClick={() => { setAccessedFiles(false); setAllFiles(false); setUserFiles(true) }} style={{backgroundColor: userFiles ? 'black' : 'white', color: userFiles ? 'white' : 'black'}}>Uploads</button>
          <button onClick={() => { setAccessedFiles(true); setAllFiles(false); setUserFiles(false) }} style={{backgroundColor: accessedFiles ? 'black' : 'white', color: accessedFiles ? 'white' : 'black'}}>Other</button>
        </div>

        <ul className='container'>
          {fileData.length > 0 ? (fileData.map((files, index) => {
            return (<Card key={index} data={files} state={state} />)
          })) : (
            <div style={{ textAlign: 'center' }}>
              <img src={fileNotFound} alt="No files Uploaded yet!" />
            </div>
          )}
        </ul>
      </main>
    </>
  )
}
