require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const ALCHEMY_API_KEY = "K4O4QtzUWpSa7ipBFfB-AHpMO6JyKcLL";
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`${PRIVATE_KEY}`],
            chainID: 420,
        },
    },
    solidity: "0.8.7",
};
