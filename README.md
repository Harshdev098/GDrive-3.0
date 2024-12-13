# GDrive

At GDrive 3.0, we are dedicated to providing a secure and user-friendly platform for storing, managing, and sharing files seamlessly.

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
