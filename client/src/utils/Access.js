export const GiveAccessToUser=async(imageURL,userAddress,state)=>{
    try{
        const giveaccess=await state.contract.shareAccess(imageURL,userAddress)
        giveaccess.wait()
        console.log("access given",giveaccess)
        return giveaccess;
    }catch(err){
        console.log("an error occured while giving access",err)
    }
}
export const RevokeAccessFromUser=async(imageURL,userAddress,state)=>{
    try{
        const RevokeAccess=await state.contract.DenyAccess(imageURL,userAddress)
        RevokeAccess.wait()
        console.log("access Revoked",RevokeAccess)
    }catch(err){
        console.log("an error occured while revoking access",err)
    }
}