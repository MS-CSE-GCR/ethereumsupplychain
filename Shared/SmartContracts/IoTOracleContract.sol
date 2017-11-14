
pragma solidity ^0.4.10;

contract IoTOracleContract {
    address owner;
    address public callbackAddress;
    string public state;

    event QueryEvent(address sender, address receiver, address summary, string txnHash);

    function IoTOracleContract () {
        owner = msg.sender;
    }

    modifier ownerOnly {
        require(owner == msg.sender);
        _;
    }
    function setCallbackAddress(address _callbackAddress) {
        callbackAddress = _callbackAddress;
    }

    //summary:contract address
    function triggerEvent(bool isAlret, address sender, address receiver, address summary, string txnHash) returns (bool){
		state = txnHash;
        QueryEvent(sender, receiver, summary, txnHash);

        return true;
    }
}