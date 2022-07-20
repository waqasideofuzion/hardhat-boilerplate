const hre = require('hardhat');
const ethers = hre.ethers;

function convertToBigNumber (val) {
  return ethers.utils.parseEther(val.toString()).toString();
}
function convertFromBigNumber (val) {
  return ethers.utils.formatEther(val.toString()).toString();
}
module.exports = {
  convertFromBigNumber,
  convertToBigNumber,
};
