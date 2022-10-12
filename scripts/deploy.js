// imports
const { ethers, run, network } = require("hardhat"); // run allows us to run any hardhat cmd task from our code
const hardhatConfig = require("../hardhat.config");

// async main function
async function main() {
    // Deploying the whiteList contract first:
    const ACLContractFactory = await ethers.getContractFactory("WhiteList"); // ACL > Access control List

    console.log("Deploying ACL contract...");
    const ACLContract = await ACLContractFactory.deploy();
    await ACLContract.deployed();
    console.log(`ACL contract deployed at : ${ACLContract.address}`);

    // getting the contractFactory object directly
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );

    console.log("Deploying contract... Please wait");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`Deployed contact to: ${simpleStorage.address}`);
    // what happens if we are not on goerli testnet and run the verify function
    // so to avaoid that let's first check the network's chainId which we added to check our deployement network

    if (network.config.chainId === 5 /* && process.env.ETHERSCAN_API_KEY */) {
        console.log("Waiting for block confirmations");
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current value : ${currentValue.toString()}`);

    // lets update our fav number
    const updateFavNumTxnResponse = await simpleStorage.store(12, {
        value: ethers.utils.parseUnits("12", "ether"),
    });
    await updateFavNumTxnResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated value : ${updatedValue.toString()}`);
    let balance = await simpleStorage.getBalance();
    console.log(
        `Contract Balance : ${ethers.utils.formatEther(balance).toString()}`
    );
}

// programatically verify contract on etherscan
async function verify(contractAddress, args) {
    console.log("Verifying Contract...");

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(e);
        }
    }
}

// main function call
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
