'use strict';
var tx = 'http://13.68.218.47:8545';
var passphrase = 'Pwd=222222222';
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();
var builtClientPath = './contracts/IoTEnvironmentSummary.json';
var text = fs.readFileSync(builtClientPath, 'utf8');//truffle compile result

function waitForTransactionReceipt(contract, payload) {
    console.log('waiting for contract to be mined');
    const receipt = web3.eth.getTransactionReceipt(contract.transactionHash);
    // If no receipt, try again in 1s
    if (receipt == null) {
        setTimeout(() => {
            waitForTransactionReceipt(contract, payload);
        }, 1000);
    } else {
        // The transaction was mined, we can retrieve the contract address
        var contractInterface = JSON.parse(text);
        var myContract = web3.eth.contract(contractInterface.abi).at(receipt.contractAddress);
        var opts = {from: web3.eth.accounts[0]};
        var hash = myContract.updateSummary.sendTransaction(true, web3.eth.accounts[0], '{}', JSON.stringify(payload),opts);
        console.log('myContract.updateSummary hash:' + hash);
    }
}
module.exports = {
    post: function environmentAlert_post(req, res) {
        console.log('JavaScript HTTP trigger function processed a request.');
        //var tx = process.env.TX_NODE_URL;//GetEnvironmentVariable('TX_NODE_URL');
        //var passpharse = process.env.PRODUCER_PASSPHRASE;//GetEnvironmentVariable('PRODUCER_PASSPHRASE');
        //var builtOraclePath = __dirname + '\\contracts/IoTOracleContract.json';
        //var builtClientPath = __dirname + '\\IoTEnvironmentSummary.json';

        console.log(req.body.test);
        var payload = JSON.stringify(req.body);
        console.log(payload);
        web3.setProvider(new web3.providers.HttpProvider(tx));

        //unlock accounts that we'll be using
        web3.personal.unlockAccount(web3.eth.accounts[0], passphrase);
        var contractInterface = JSON.parse(text);
        //deploy the contract with constructor parameters, we need to supply gas so that the contract can be deployed
        var alertContract = web3.eth.contract(contractInterface.abi).new({ from: web3.eth.accounts[0], data: contractInterface.unlinked_binary, gas: 3000000 });
        //wait for the contract been mined
        waitForTransactionReceipt(alertContract, payload);

        res.json('accepted');//return accepted to client (ASA)
    }
};