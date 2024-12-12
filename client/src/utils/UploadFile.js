import { pinata } from '../utils/pinata'

export const handleSubmit = async (selectedFile, state) => {
    if (!selectedFile) {
        alert("Please select a file")
        return;
    }
    try {
        if (state.contract) {
            console.log("props ar: ", state.contract)
            const upload = await pinata.upload.file(selectedFile)
            const ipfsURL = await pinata.gateways.convert(upload.IpfsHash)
            const ipfsHash = upload.IpfsHash.toString();
            const Size = upload.PinSize
            const timeStamp = upload.Timestamp.toString()
            const formattedTimeStamp=(timeStamp.split('Z')[0]).replace('T',', ')
            const uploadContract = await state.contract.uploadFile(`${ipfsHash}`,'filename',formattedTimeStamp,Size);
            uploadContract.wait()
            return {fileURL:ipfsHash,fileSize:Size,timeStamp:formattedTimeStamp};
        }
    } catch (err) {
        console.log("an error occured while uploading file",err)
        alert("An error occured while uploading file")
    }
}