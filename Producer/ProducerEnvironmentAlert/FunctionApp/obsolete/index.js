'use strict';
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3();
var builtOraclePath = __dirname + '\\contracts/IoTOracleContract.json';
var builtClientPath = __dirname + '\\IoTEnvironmentSummary.json';    

//var address5 = GetEnvironmentVariable('ENV_ALERT_CONTRACT_ADDR');//deployed contract address
var text = fs.readFileSync(builtClientPath, 'utf8');//truffle compile result
var contractInterface = JSON.parse(text);


module.exports = function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');
    var tx = process.env.TX_NODE_URL;//GetEnvironmentVariable('TX_NODE_URL');
    var passpharse =  process.env.PRODUCER_PASSPHRASE;//GetEnvironmentVariable('PRODUCER_PASSPHRASE');
    passpharse = 'Pwd=222222222'
    tx='http://13.82.171.141:8545';
    

    web3.setProvider(new web3.providers.HttpProvider(tx));
    var opts = {from:web3.eth.accounts[0]};
    if(req.body.function == 'contract'){
        web3.personal.unlockAccount(web3.eth.accounts[0], passpharse, 30000);
        var alertContract = web3.eth.contract(contractInterface.abi).new({ from: web3.eth.accounts[0], data: contractInterface.unlinked_binary, gas: 3000000 });
        context.res = {
            status:'accepted',
            transactionHash : alertContract.transactionHash
        };
        context.done();
    }else if(req.body.function == 'updateSummary'){
        web3.personal.unlockAccount(web3.eth.accounts[0], passpharse, 30000);
        var contract = web3.eth.contract(contractInterface.abi).at(req.body.hash);
        var hash = contract.updateSummary.sendTransaction(true, web3.eth.accounts[0], '{}', JSON.stringify(req.body.data),opts);
        context.res = {
            status:'accepted',
            transactionHash : hash
        };
        context.done();       
    }else if(req.body.function == 'query'){
        context.log('query...' + req.body.functionName);
        web3.personal.unlockAccount(web3.eth.accounts[0], passpharse, 30000);
        if(req.body.functionName == 'contract'){
                const receipt = web3.eth.getTransactionReceipt(req.body.transactionHash);
                context.log('receipt='+receipt);
                context.res = {
                    status:receipt == null ? 'mining' : 'mined',
                    transactionHash : req.body.transactionHash,
                    contractAddress : receipt != null ? receipt.contractAddress : null
                };
                context.done();   
        }else{
                const updateResult = web3.eth.getTransactionReceipt(req.body.transactionHash);
                context.res = {
                    status:updateResult == null ? 'mining' : 'mined',
                    transactionHash : req.body.transactionHash,
                    contractAddress : updateResult != null ? updateResult.contractAddress : null
                };
                context.done();             
        }
    }else{
        context.res = {
            status:'error'
        };
        context.done();    
    }

};