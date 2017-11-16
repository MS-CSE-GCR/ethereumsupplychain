'use strict';
var tx = process.env.TX_NODE_URL;
var passpharse = process.env.PRODUCER_PASSPHRASE;

var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();
var oracleContractAddress = process.env.ORACLE_ADDRESS;
var oracleContractAddress = '0x28c0b5f1985a7e812DDeD805842faD43E09BDE9d';


web3.setProvider(new web3.providers.HttpProvider(tx));

//unlock accounts that we'll be using
web3.personal.unlockAccount(web3.eth.accounts[0], passpharse, 30000);   //sender
web3.personal.unlockAccount(web3.eth.accounts[1], passpharse, 30000);   //oracle

function waitForTransactionReceipt(hash) {
    console.log('waiting for contract to be mined');
    const receipt = web3.eth.getTransactionReceipt(hash);
    // If no receipt, try again in 1s
    if (receipt == null) {
        setTimeout(() => {
            waitForTransactionReceipt(hash);
        }, 1000);
    } else {
        // The transaction was mined, we can retrieve the contract address
        console.log('contract address: ' + receipt.contractAddress);
        console.log('receipt=' + JSON.stringify(receipt));
    }
}
const OracleContractPath = './contracts/IoTOracleContract.json';
const IoTEnvSummaryContractPath = './contracts/IoTEnvironmentSummary.json';
//configure Oracle callback address
var text = fs.readFileSync(OracleContractPath, 'utf8');
var oracleInterface = JSON.parse(text);
var oracle = web3.eth.contract(oracleInterface.abi).at(oracleContractAddress);

text = fs.readFileSync(IoTEnvSummaryContractPath, 'utf8');
var envInterface = JSON.parse(text);

//set callback address, this is the oracle account address, when oracle callback to our contract, the caller address must match address specified here
//var hash = oracle.setCallbackAddress.sendTransaction(web3.eth.accounts[1], { from: web3.eth.accounts[1], gas: 3000000 }); //'0x1f83fa84c03a2f4e50be16947a3991cab6018376'
console.log(oracle);

//setup oracle address
var oh = oracle.setCallbackAddress.sendTransaction(web3.eth.accounts[1], {from:web3.eth.accounts[1],gas:3000000});

var queryEvent = oracle.QueryEvent();
console.log('watching for query event');

queryEvent.watch(function (err, result) {
    if (!err) {
        console.log('QueryEvent fired:' + JSON.stringify(result));
        //callback
        var address = result.args.summary;
        var envContract = web3.eth.contract(envInterface.abi).at(address);
        var envHash = envContract._callback.sendTransaction({ from: web3.eth.accounts[1], gas: 3000000 });
        console.log('envhash = ' + envHash);
        //...TODO...check if the transaction succeed and error handling
    } else {
        console.log('error=' + JSON.stringify(err));
    }
});
