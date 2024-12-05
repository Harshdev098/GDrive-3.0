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
            const uploadContract = await state.contract.uploadFile(`${ipfsHash}`);
            console.log("uploaded contract: ", uploadContract)
            return {fileURL:ipfsHash,fileSize:Size,timeStamp:timeStamp};
            // setFileData((prevFiles) => [...prevFiles, { fileURL: ipfsHash, fileSize: Size, timeStamp: timeStamp }])
        }
    } catch (err) {
        alert("An error occured while uploading file")
    }
}