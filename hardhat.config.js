require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks:{
    sepolia:{
      url:"https://eth-sepolia.g.alchemy.com/v2/nwmvtEptIKP1WKAUnxantNO3N8P9Cnax",
      accounts:['af71f2a2457f4e6aa6b2154f30682c279734786bdcd0a691a6194a6be96843b9']
    },
    Ganache:{
      url:'HTTP://127.0.0.1:7545',
      accounts:['0xa0871d5c2f1351adcab2e9b99e3ffae6ece60f6be35b9ca7b97fb73c84285444']
    }
  },
  paths:{
    artifacts:"./client/src/contracts",
  }
};


// sepolia- 0x94f61B6e0a5E757F032F6575f991b842d97F68fb