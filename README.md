# GDrive

At GDrive 3.0, we are dedicated to providing a secure and user-friendly platform for storing, managing, and sharing files seamlessly.

## Key Features

- ✅ Decentralized Storage – Files are stored on IPFS, ensuring censorship resistance and global accessibility.
- ✅ Seamless File Uploads – Users can upload documents, images, and other files directly to the decentralized network.
- ✅ Access Control via Smart Contracts – Share file access with specific users and revoke it anytime through blockchain-powered permissions.
- ✅ End-to-End Encryption 🔐 – Ensures data privacy and security.
- ✅ Immutable & Tamper-Proof – No centralized entity can modify or delete your files.

![Image](https://github.com/user-attachments/assets/9d0898eb-51ab-4c75-8f23-b134409dfb26)

![Image](https://github.com/user-attachments/assets/4093d8fc-9216-4894-9a9a-b1e23561b376)

## Tech Stack

- Decentralized Storage – IPFS
- Frontend – React.js, Next.js
- Blockchain – Solidity, Hardhat, ethers.js

## Running the Application

- Install all the dependencies 
  ```
  npm install
  ```
- Compile the smart contract
  ```
  npx hardhat compile
  ```
  Read more abourt working with smart contract and hardhat [here](https://hardhat.org/hardhat-runner/docs/guides/project-setup)
- Deploy the smart contract
  ```
  npx hardhat ignition deploy ./ignition/modules/Deploy.js --network YOUR NETWORK (sepolia,ganache,localhost)
  ```
  Read more about deploying smart contract [here](https://hardhat.org/hardhat-runner/docs/guides/deploying)
- Make a .env file and add the JWT token and Gateway from [Pinata](https://pinata.cloud/) inside the client folder 
  ```
  REACT_APP_PINATA_JWT= YOUR JWT TOKEN KEY
  REACT_APP_PINATA_GATEWAY= YOUR GATEWAY
  ```
- Run the client application
  ```
  cd client
  npm install
  npm start
  ```
