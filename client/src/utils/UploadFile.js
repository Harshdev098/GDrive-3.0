import { pinata } from '../utils/pinata'

export const handleSubmit = async (selectedFile, state) => {
    if (!selectedFile) {
        alert("Please select a file")
        return;
    }
    try {
        if (state.contract) {
            console.log("props ar: ", state.contract)
            console.log("file", selectedFile)
            const upload = await pinata.upload.file(selectedFile)
            console.log("upload data: ", upload)
            const ipfsURL = await pinata.gateways.convert(upload.IpfsHash)
            const ipfsHash = upload.IpfsHash.toString();
            console.log("url: ", ipfsURL)
            console.log('signer', state.signer)
            const Size = upload.PinSize
            const timeStamp = upload.Timestamp.toString()
            const formattedTimeStamp=(timeStamp.split('Z')[0]).replace('T',', ')
            const uploadContract = await state.contract.uploadFile(`${ipfsHash}`,'filename',formattedTimeStamp,Size);
            console.log("uploaded contract: ", uploadContract)
            return {fileURL:ipfsHash,fileSize:Size,timeStamp:formattedTimeStamp};
        }
    } catch (err) {
        console.log("an error occured while uploading file",err)
        alert("An error occured while uploading file")
    }
}