import {PinataSDK} from 'pinata-web3'

export const pinata=new PinataSDK({
    pinataJwt:process.env.REACT_APP_PINATA_JWT,
    pinataGateway:process.env.REACT_APP_PINATA_GATEWAY
})