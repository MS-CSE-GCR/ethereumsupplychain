'use strict';

module.exports = {
     get: function contracts_get(req, res) {
        context.log('JavaScript HTTP trigger function processed a request.');
        var tx = process.env.TX_NODE_URL;//GetEnvironmentVariable('TX_NODE_URL');
        var passpharse = process.env.PRODUCER_PASSPHRASE;//GetEnvironmentVariable('PRODUCER_PASSPHRASE');
        tx = 'http://13.68.218.47:8545';
        var builtOraclePath = __dirname + '\\contracts/IoTOracleContract.json';
        var builtClientPath = __dirname + '\\IoTEnvironmentSummary.json';
        var fs = require('fs');
        var Web3 = require('web3');
        var web3 = new Web3();
        //var address5 = GetEnvironmentVariable('ENV_ALERT_CONTRACT_ADDR');//deployed contract address
        var text = fs.readFileSync(builtClientPath, 'utf8');//truffle compile result
        web3.setProvider(new web3.providers.HttpProvider(tx));
        //unlock accounts that we'll be using
        web3.personal.unlockAccount(web3.eth.accounts[0], passpharse);
        var contractInterface = JSON.parse(text);
        //deploy the contract with constructor parameters, we need to supply gas so that the contract can be deployed
        var alertContract = web3.eth.contract(contractInterface.abi).new({ from: web3.eth.accounts[0], data: contractInterface.unlinked_binary, gas: 3000000 });
    
         //var ret = new Contract();
         if (req.body.alert == 'true' || req.body.alert == ' True') {
            hash = alertContract.updateSummary(true, web3.eth.accounts[0], '', text, { from: web3.eth.accounts[0], gas: 3000000 });
        } else {
            hash = alertContract.updateSummary(false, web3.eth.accounts[0], '', text, { from: web3.eth.accounts[0], gas: 3000000 });
        }
         //ret.address = 'ok';

         res.json({state:'ok'});
     }
 };


