pragma solidity ^0.4.10;

import "./IoTOracleContract.sol";
import "./IoTOracleResolver.sol";

/*
IoTOracleContract: '0x981f29A905dA1A4CE3c295304A3E78dC7a1e0225'
IoTOracleResolver: '0xD47C737cD7Dd589310ca3F105DD7d3505A754Fbf'
IoTEnvironmentSummary: 0x346d38d32962a32e1e9967acb8e5ccbc949e4197
*/

//my client contract
contract IoTOracleApp {
    IoTOracleResolver public resolver;
    IoTOracleContract public oracle;

    function IoTOracleApp() {
        resolver = IoTOracleResolver(0xD47C737cD7Dd589310ca3F105DD7d3505A754Fbf);//change the address to your OracleResolver.sol checksum address
        resolver.setOracleAddress(0x981f29A905dA1A4CE3c295304A3E78dC7a1e0225);//change the address to your Oracle.sol checksum address
        oracle = IoTOracleContract(resolver.getOracleAddress());
    }

    modifier myOracleAPI {
        _;
    }

    modifier onlyFromCallback {
        require(msg.sender == oracle.callbackAddress());
        _;
    }

    function queryOracle(bool _alert, address _sender, address _receiver, address _contract, string _txnHash) internal myOracleAPI returns(bool) {
        return oracle.triggerEvent(_alert, _sender,  _receiver,  _contract,  _txnHash);
    }

    function _callback() onlyFromCallback {
        //callback function for offchain to call back

    }
}
//https://ethereum.stackexchange.com/questions/3609/returning-a-struct-and-reading-via-web3/3614#3614
contract IoTEnvironmentSummary is IoTOracleApp {
    address public sender;
    address public receiver;
    address public summary;
    string public txnHash;
    bool public isAlert;
    string public indexes;

    function IoTEnvironmentSummary() {
        sender = msg.sender;
        summary = this;
    }

    event OnCallBack();

     // override
    function _callback() onlyFromCallback {
        OnCallBack();
    }

    function updateSummary(bool _isAlert, address _receiver, string _txnHash, string _indexes) {
        receiver = _receiver;
        txnHash = _txnHash;
        isAlert = _isAlert;
        indexes = _indexes;

        queryOracle(isAlert, sender, receiver, summary, txnHash);
    }
}