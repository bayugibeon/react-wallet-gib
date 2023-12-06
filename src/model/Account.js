
class AccountClass {
    deployer = "";
    current = "";  
    contract = "";

    constructor(_deployer, _current, _contract){
        this.deployer = _deployer;
        this.current = _current;

        this.contract = _contract;
    }
    
}

export default AccountClass;