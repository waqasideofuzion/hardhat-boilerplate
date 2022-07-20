const hre = require("hardhat");
const network = hre.hardhatArguments.network;
const { updateContractAddresses } = require('../utils/contractsManagement');

async function main() {
  const greeting = "Hello Blockchain Devs";
  const GreeterFactory = await hre.ethers.getContractFactory("Greeter");
  console.log("Deploying Greeter Contract");
  const deployedGreeter = await GreeterFactory.deploy(greeting);

  await deployedGreeter.deployed();


  updateContractAddresses(
    {
      Greeter: deployedGreeter.address
    },
    network,
  );

  if (hre.network.name != "hardhat") {
    
    console.log("Verifying........")
    // wait for half minute so that the contract should be propagated properly on blockchain
    await new Promise(resolve => setTimeout(resolve, 30000));

    await hre.run("verify:verify", {
      address: deployedGreeter.address,
      constructorArguments: [greeting],
    });
  }

  console.log("Contract deployed to:", deployedGreeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
