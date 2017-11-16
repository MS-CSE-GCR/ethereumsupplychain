pragma solidity ^0.4.10;

import "./IoTOracleContract.sol";

/*
IoTOracleContract: '0x28c0b5f1985a7e812DDeD805842faD43E09BDE9d'
IoTEnvironmentSummary: 0xf499a3328698423bd27ce4fc16e76c3ca84d0a8e
*/

//my client contract
contract IoTOracleApp {
    IoTOracleContract public oracle;

    function IoTOracleApp() {
        oracle = IoTOracleContract(0x28c0b5f1985a7e812DDeD805842faD43E09BDE9d);
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
		queryOracle(isAlert, sender,  receiver,  summary,  indexes);
    }
}
