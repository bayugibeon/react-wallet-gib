import Web3 from 'web3';

class NetworkClass {
    provider = null;
    contract = null;
    web3 = null;  
    abi = null;

    constructor(_provider, _address, _abi, _contract, _privatekey = null) {
        this.provider = _provider;
        this.web3 = new Web3(this.provider);

        if (_privatekey !== null) {
            this.web3.eth.accounts.privateKeyToAccount(_privatekey.toString());
            this.web3.eth.accounts.wallet.add(_privatekey.toString());
        }

        this.address = _address;

        this.abi = _abi;

        this.web3.setProvider(this.provider); //unknown account solution
        this.web3.eth.setProvider(this.provider); //unknown account solution
        this.contract = new this.web3.eth.Contract(this.abi, _contract, {from : this.address}); //unknown account solution: using from
        // this.contract.setProvider(this.provider);

        this.contract.defaultAccount = this.address;
        this.contract.defaultBlock = "latest";
    }
}

export default NetworkClass;
