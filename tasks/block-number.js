const { task } = require("hardhat/config");

task("block-number", "Prints the current Block Number").setAction(
    // async function blockTask(args) {}
    // const blockTask = async function(args) {}
    // async (args) => {} This declares an anonymous function (Also called the arrow function)
    // above declarations are kinda similar

    async (taskArgs, hre) => {
        const currentBlockNumber = await hre.ethers.provider.getBlockNumber();
        console.log(`Current Block Number : ${currentBlockNumber}`);
    }
);

module.exports = {};
