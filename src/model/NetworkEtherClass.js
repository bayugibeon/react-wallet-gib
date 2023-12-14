import {BrowserProvider, Contract} from 'ethers';
import {ethers} from 'ethers';

class NetworkEtherClass {
    provider = null;
    contract = null;
    contractTx = null;
    web3 = null;  
    abi = null;
    signer = null;

    constructor(_provider, _address, _abi, _contract, _web3 = null, _privatekey = null) {
        
        this.provider =  new BrowserProvider(_provider);
        this.signer = this.provider.getSigner()
        // this.provider = new ethers.providers.Web3Provider(_provider);
        // this.web3 = new Web3(this.provider);

        this.address = _address;

        this.abi = _abi;
        this.contract = new Contract(_contract, this.abi, this.provider);
        this.contractTx = new Contract(_contract, this.abi, this.signer);

        // this.contract.defaultAccount = this.address;
        // this.contract.defaultBlock = "latest";

        // if (_privatekey != null) {
        //     this.web3.eth.accounts.wallet.add(_privatekey);
        // }
    }
}

export default NetworkEtherClass;
