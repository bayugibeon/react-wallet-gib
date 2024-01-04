
class AccountClass {
    deployer = "";
    current = "";  
    contract = "";
    chainId = null;    

    constructor(_deployer, _current, _contract, chainId = null){
        this.deployer = _deployer;
        this.current = _current;

        this.contract = _contract;
        this.chainId = chainId;
    }
    
}

export default AccountClass;