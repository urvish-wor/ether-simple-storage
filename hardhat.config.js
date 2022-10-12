require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("./tasks/check-balance");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = "K4O4QtzUWpSa7ipBFfB-AHpMO6JyKcLL";
const PRIVATE_KEY =
    "aff499e364d327fec8e210fb29129e826af0b07991ef3f9450e38bf3ece05adc";
const ETHERSCAN_API_KEY = "WPCYWC9PPKAFXZK7JK85CETQAUUNHFXA2R";
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${PRIVATE_KEY}`],
            chainId: 5,
        },
    },
    solidity: "0.8.7",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
};
