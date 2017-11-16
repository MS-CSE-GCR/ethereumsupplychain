'use strict';
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();
var builtOraclePath = __dirname + '\\contracts\\IoTOracleContract.json';
var builtClientPath = __dirname + '\\contracts\\IoTEnvironmentSummary.json';    
var text = fs.readFileSync(builtClientPath, 'utf8');//truffle compile result
var contractInterface = JSON.parse(text);
var account = process.env.ACCOUNT;
var tx = process.env.TX_NODE_URL;
var passpharse =  process.env.PRODUCER_PASSPHRASE;


const AMQPClient = require('amqp10').Client;
const Policy = require('amqp10').Policy;
const protocol = 'amqps';
const keyName = 'RootManageSharedAccessKey';
const sasKey = 'fg0rdbeTgm6fJrr3iTLSljwbxXemrPA+6vMJal04IeE=';
const serviceBusHost = 'ethereumbridge.servicebus.windows.net';
const uri = `${protocol}://${encodeURIComponent(keyName)}:${encodeURIComponent(sasKey)}@${serviceBusHost}`;
const queueName = 'producerethereum';
const client = new AMQPClient(Policy.ServiceBusQueue);

web3.setProvider(new web3.providers.HttpProvider(tx));
account = web3.eth.accounts[0];




function waitForTransactionReceipt(contract,msg) {
    console.log('waiting for contract to be mined');
    const receipt = web3.eth.getTransactionReceipt(contract.transactionHash);
    // If no receipt, try again in 1s

    

    if (receipt == null) {
        setTimeout(() => {
            waitForTransactionReceipt(contract, msg);
        }, 1000);
    } else {

        // The transaction was mined, we can retrieve the contract address
        console.log('contract address: ' + receipt.contractAddress);
        console.log('receipt=' + JSON.stringify(receipt));
        contract = web3.eth.contract(contractInterface.abi).at(receipt.contractAddress);
        console.log('oracle address: ' + contract.oracle.call());

        //due to Stream Analytics string serialization mechanism, string content sent to Serivce Bus would be surrounded by serialization evlope, we will need to deal with it.
        //sample string: @strin3http://schemas.microsoft.com/2003/10/Serialization/��{"temperature":22.3096027,"humidity":44.5839,"n2":54.48175,"o2":24.1778889,"co2":11.1051846,"pm25":90.51089,"batchid":"A001","buildingid":"Bld001","isalret":1}
        console.log(typeof msg.body);
        var data = '';
        if (typeof msg.body == 'string'){
            data = msg.body.substring(msg.body.indexOf("{"), (msg.body.lastIndexOf("}") + 1));
        }else{
            data = JSON.stringify(msg.body);
        }

        console.log('[' + data + ']');	
        var txnData = JSON.stringify(data);
        var hash = contract.updateSummary.sendTransaction(true, account, web3.sha3(txnData), data, { from: account, gas:3000000 });
        console.log('hash=' + hash);
    }
}

function processEnvironmentAlert(message) {
    //var msg = JSON.parse(message);
    var body = message.body;
    web3.personal.unlockAccount(account, passpharse, 30000);
    var contract = web3.eth.contract(contractInterface.abi).new({ from: account, data: contractInterface.bytecode, gas: 3000000 });

    waitForTransactionReceipt(contract, message);
}

client.connect(uri)
.then(() => Promise.all([client.createReceiver(queueName)]))
.spread((receiver) => {
    console.log('--------------------------------------------------------------------------');
    receiver.on('errorReceived', (err) => {
        // check for errors
        console.log(err);
    });
    receiver.on('message', (message) => {
        console.log('Received message');
        //console.log(message);
        processEnvironmentAlert(message);
        console.log('----------------------------------------------------------------------------');
    });
})
.error((e) => {
    console.warn('connection error: ', e);
});