import {GetMetaNet, GetMainNet, GetAccount} from './components/Context';

export function _checkMetamask(provider) {
    var account = null;
    _debug("provider", provider);

    if (typeof provider !== 'undefined') {
        //Metamask is installed
        account = provider
        .request({method: 'eth_requestAccounts' })
        .then((accounts) => {
          // console.log('###--- ACCOUNTS ----###');
          // console.log(accounts);
          return accounts[0];
        })
        .catch((err) => {
          // console.log('!!!--- ERROR ----!!!');
          // console.log(err);
        });
      }     
    _debug("account", account);
    return account;
}

export function wallet_requestPermissions(provider) {
  var result = "";

  if (typeof provider !== 'undefined') {
      //Metamask is installed
      result = provider
      .request({method: 'wallet_requestPermissions' ,
      params: [{ eth_accounts: {} }],})
      .then(() => {
        return "";
      })
      .catch((err) => {
        return "error";
        // console.log('!!!--- ERROR ----!!!');
        // console.log(err);
      });
    }     
  return result;
}


export function _promiseArrayResolver(_data){
  return Promise.all(_data.map(function(innerPromiseArray) {
    return Promise.resolve(innerPromiseArray);
  }));
}

export function _debug(_name,_value){
  console.log("###--- " + _name + " / " + typeof value + "---###");
  console.log(_value);
}


export function _setApproval(fromAccount, toAccount, contract){
  return contract.methods.setApprovalForAll(toAccount, true).estimateGas()
            .then( (gasResult) =>{

              contract.methods.setApprovalForAll(toAccount, true).send({
                from : fromAccount,
                gas : gasResult
              })
              .on('transactionHash', function(hash){
                })
                .on('confirmation', function(confirmationNumber, receipt){
                })
                .on('receipt', function(receipt){
                  return receipt.status;
                })
              .then( (result) =>{
              });
            });
}

export function _checkApproval(fromaccount, toAccount, contract){
  return contract.methods.isApprovedForAll(fromaccount, toAccount).call()
            .then( (result) =>{
              return result;
            });

}

export function _transferTokenRequest(_network, _id, fromAccount, toAccount, contractAddress, currentAccount) {
  let provider = _network.provider;
  const web3 = _network.web3;

  fromAccount = fromAccount.toString();
  toAccount = toAccount.toString();
  currentAccount = currentAccount.toString();
 
  // _debug("fromAccount",fromAccount);
  // _debug("toAccount",toAccount);
  // _debug("currentAccount",currentAccount);
  // _debug("_id",_id);

  // let fromAccountEn = _encodeParameter("address",fromAccount);

  var encodedData = web3.eth.abi.encodeFunctionCall({
      name: "safeTransferFrom",
      type: "function",
      inputs: [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ]
    }, [fromAccount.toString(), toAccount.toString(), parseInt(_id), parseInt(1), "0x0"]);

    // _debug("encodedData",encodedData);

    const transactionParameters = {
        to: contractAddress.toString(),
        from: currentAccount.toString(),
        data: encodedData
    };

    // _debug("transactionParameters",transactionParameters);

    const txHash = provider.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      }).then((result) => {
        return result;
      }).catch(function (e) {
        console.log('###--- eth_sendTransaction / error ----###');
        console.log(e);
    });

    var txHashPromise = Promise.resolve(txHash);
    
    return txHashPromise.then((hashResult)=>{
        return hashResult;
    }); 
}

function _encodeParameter(web3Obj,type,value) {
  web3Obj.eth.abi.encodeParameter(type,value);
}

export function _getTransactionReceipt(_network, hashResult){

  let provider = _network.provider;
  // _debug("hashResult",hashResult);
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        var receipt = null;
        while (receipt == null || receipt == ""){
          var receipt = provider.request({
            method: 'eth_getTransactionReceipt',
            params: [hashResult.toString()],
          }).then((receiptResult) =>{
            return receiptResult;
          });
        }
        resolve(receipt == null || receipt == "" ? false : true);
      }, 10000);
      });
}


export function _watchAsset(_network, _account, _id){
  let provider = _network.provider;
  let contract = _account.contract;
  // _debug("contract",contract);
  var watchRequest = [];
  var requestId = provider.request({method: 'wallet_watchAsset' ,
      params: {
      type: 'ERC1155',
      options: {
        address: contract.toString(),
        tokenId: _id.toString()
        },
        },
    })
    .then((success) => {
      return success;
    })
    .catch((err) => {
      console.log('!!!--- ERROR ----!!!');
      console.log(err);
    });

return Promise.resolve(requestId);
}

export function metamaskAccount(provider){
  let currentAccount = null;
  
  provider.request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      console.error(err);
    });

  provider.on('accountsChanged', handleAccountsChanged);

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
    }
  }
  return currentAccount;;
}

