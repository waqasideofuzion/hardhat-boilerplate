const hre = require("hardhat");
const ethers = hre.ethers;
const chai = require("chai");
const { expect } = chai;
const fs = require("fs");
const path = require("path");
const network = hre.hardhatArguments.network;

describe("Greeter: ", function () {
  beforeEach("deploy", async function () {
    [account1] = await ethers.getSigners();

    this.greeter;

    const contractAddresses = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../config.json"), "utf8")
    );

    if (hre.network.name != "hardhat") {
      this.greeter = await hre.ethers.getContractAt(
        "Greeter",
        contractAddresses[network].Greeter,
        account1
      );
    } else {
      const Greeter = await ethers.getContractFactory("Greeter");
      this.greeter = await Greeter.deploy("Hello Blockchain Devs");
      await this.greeter.deployed();
    }
  });

  it("Should return the new greeting once it's changed", async function () {
    expect(await this.greeter.greet()).to.equal("Hello Blockchain Devs");

    let setGreeting = await this.greeter.setGreeting("Welcome");
    await setGreeting.wait();
    
    expect(await this.greeter.greet()).to.equal("Welcome");
  });
});
