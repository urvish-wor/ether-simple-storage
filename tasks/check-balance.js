const { task } = require("hardhat/config");
const { ethers } = require("@nomiclabs/hardhat-ethers");

task("balance", "Prints an account's balance")
    .addParam("account", "The account's address")
    .setAction(async (taskArgs, hre) => {
        const balance = await ethers.provider.getBalance(taskArgs.account);

        console.log(ethers.utils.formatEther(balance), "ETH");
    });

module.exports = {};
