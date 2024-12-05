const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("LockModule", (m) => {

  const contract = m.contract("Drive");

  return { contract };
});


// 0x5FbDB2315678afecb367f032d93F642f64180aa3