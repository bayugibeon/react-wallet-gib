import Web3 from 'web3';

class NetworkClass {
    provider = null;
    contract = null;
    web3 = null;  
    abi = null;

    constructor(_provider, _address, _abi, _contract, _web3 = null, _privatekey = null) {
        this.provider = _provider;
        this.web3 = new Web3(this.provider);

        this.address = _address;

        this.abi = _abi;
        this.contract = new this.web3.eth.Contract(this.abi, _contract);

        this.contract.defaultAccount = this.address;
        this.contract.defaultBlock = "latest";

        if (_privatekey != null) {
            this.web3.eth.accounts.wallet.add(_privatekey);
        }
    }
}

export default NetworkClass;
