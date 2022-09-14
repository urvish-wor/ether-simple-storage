// imports
const { ethers } = require("hardhat");

// async main function
async function main() {
    // getting the contractFactory object directly
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );

    console.log("Deploying contract... Please wait");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`Deployed contact to: ${simpleStorage.address}`);
}

// main function call
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
