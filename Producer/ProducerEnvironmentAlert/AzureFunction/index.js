'use strict';

//this function will be called by ASA when there is an environment alert, or a summary of environment indexes was been sent to ASA.
//the function will write telemetry to smart contract
module.exports = function (context, req) {

    context.log('JavaScript HTTP trigger function processed a request.');
    var tx = process.env.TX_NODE_URL;//GetEnvironmentVariable('TX_NODE_URL');
    var passpharse = process.env.PRODUCER_PASSPHRASE;//GetEnvironmentVariable('PRODUCER_PASSPHRASE');
    tx = 'http://13.68.218.47:8545';
    /*
    var request = require('request');
        request('http://13.68.218.47:8545', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                context.log('ok');
                context.log(body) // Print the google web page.
            }else{
                context.log('error');
            }
        });
    */
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
    //load contract
    var contractInterface = JSON.parse(text);
    //deploy the contract with constructor parameters, we need to supply gas so that the contract can be deployed
    var alertContract = web3.eth.contract(contractInterface.abi).new({ from: web3.eth.accounts[0], data: contractInterface.unlinked_binary, gas: 3000000 });

    /*
    --  Oracle  --
    QueryEvent fired:
        {
        "address":"0x981f29a905da1a4ce3c295304a3e78dc7a1e0225",
        "blockNumber":21368,
        "transactionHash":"0xc16785c1b6b6f5ee09d613230ed172df4b37712dd7204f3630e4c3739df4b78c",
        "transactionIndex":0,
        "blockHash":"0xd989e6f3be60f729169f6fd4003f39c45cca9334bf214603b27b1c13af463fb3",
        "logIndex":0,
        "removed":false,
        "event":"QueryEvent",
        "args":
            {"sender":"0x7265e3b863b7e1b5125eefd1746b00e4b886174f",
            "receiver":"0x1f83fa84c03a2f4e50be16947a3991cab6018376",
            "summary":"0x55fdfb0a4842cba88506c9fa9fd12d11ed009747",
            "txnHash":""}
        }
    --  contract    --
    function updateSummary(bool _isAlert, address _receiver, string _txnHash, string _indexes)
    --  http body   --
    {
        alert:{true|false}
        n2:{},
        o2:{},
        //...etc...
    }
    */
    var text = JSON.stringify(req.body);
    var hash = '';
    if (req.body.alert == 'true' || req.body.alert == ' True') {
        hash = alertContract.updateSummary(true, web3.eth.accounts[0], '', text, { from: web3.eth.accounts[0], gas: 3000000 });
    } else {
        hash = alertContract.updateSummary(false, web3.eth.accounts[0], '', text, { from: web3.eth.accounts[0], gas: 3000000 });
    }
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: hash
    };
    /*
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };

    */
    context.done();
};