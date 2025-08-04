const hre = require("hardhat");

async function deployGBT(priceFeed) {
  const GBT = await hre.ethers.getContractFactory("GoldBarTether");
  const gbt = await GBT.deploy(priceFeed);
  await gbt.deployed();
  return gbt.address;
}

module.exports = { deployGBT };
