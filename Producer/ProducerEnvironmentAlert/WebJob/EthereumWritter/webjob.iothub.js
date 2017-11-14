'use strict';
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();
var builtOraclePath = __dirname + '\\contracts/IoTOracleContract.json';
var builtClientPath = __dirname + '\\IoTEnvironmentSummary.json';    

//var address5 = GetEnvironmentVariable('ENV_ALERT_CONTRACT_ADDR');//deployed contract address
var text = fs.readFileSync(builtClientPath, 'utf8');//truffle compile result
var contractInterface = JSON.parse(text);
var EventHubClient = require('azure-event-hubs').Client;
var connectionString = '{iothub connection string}';
var tx = process.env.TX_NODE_URL;//GetEnvironmentVariable('TX_NODE_URL');
var passpharse =  process.env.PRODUCER_PASSPHRASE;//GetEnvironmentVariable('PRODUCER_PASSPHRASE');


passpharse = 'Pwd=222222222'
tx='http://13.82.171.141:8545';

var printError = function (err) {
    console.log(err.message);
};

var printMessage = function (message) {
    console.log('Message received: ');
    console.log(JSON.stringify(message.body));
    console.log('');
};
var handleMessage = function(message){
    printMessage(message);
    
    if(message.body.isAlert == true){
        var result = web3.personal.unlockAccount(web3.eth.accounts[0],passpharse);
        if(result){
            var hash = web3.eth.contract(contractInterface.abi).new({ from: web3.eth.accounts[0], data: contractInterface.unlinked_binary, gas: 3000000 });
            waitForTransactionReceipt(hash);
        }
    }
};

var waitForTransactionReceipt = function (hash, payload) {
    console.log('waiting for contract to be mined');
    const receipt = web3.eth.getTransactionReceipt(hash);
    // If no receipt, try again in 1s
    if (receipt == null) {
        setTimeout(() => {
            waitForTransactionReceipt(hash,payload);
        }, 1000);
    } else {
        // The transaction was mined, we can retrieve the contract address
        console.log('contract address: ' + receipt.contractAddress);
        var contract = web3.eth.contract(contractInterface.abi).at(receipt.contractAddress);
        var opts = {from:web3.eth.accounts[0]};
        var hash = contract.updateSummary.sendTransaction(true, web3.eth.accounts[0], '{}', '{' + JSON.stringify(payload) + '}',opts);
        console.log('updateSummary hash=' + hash);
    }
};

var client = EventHubClient.fromConnectionString(connectionString);
client.open()
    .then(client.getPartitionIds.bind(client))
    .then(function (partitionIds) {
        return partitionIds.map(function (partitionId) {
            return client.createReceiver('$Default', partitionId, { 'startAfterTime' : Date.now()}).then(function(receiver) {
                console.log('Created partition receiver: ' + partitionId)
                receiver.on('errorReceived', printError);
                receiver.on('message', handleMessage);
            });
        });
    })
    .catch(printError);