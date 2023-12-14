import React, { useEffect, useState }  from 'react';
import {GetMetaNet, GetMainNet, GetAccount} from './Context';
import NFT from '../model/NFTData';
import {_checkMetamask, _promiseArrayResolver, _debug, _checkApproval, _setApproval,
  _transferTokenRequest, _getTransactionReceipt, _watchAsset, _getAccountMetamask} from '../Functions-ether';
import {Supplier} from './Supplier';
// import {Collections} from './Users';
// import {Wallets} from './Wallets';

export let NFTSupplier = [];
export let NFTBalance = [];
export let NFTs = [];

export function Body() {
  // const [metaNet, setMetaNet] = useState();
  const [getNFTState, setgetNFTState] = useState(null);

  const mainNet = GetMainNet();
  const metaNet = GetMetaNet();;
  const account = GetAccount();


  useEffect(() => {
    const getData = async () => {
      let checkRequest = _checkMetamask(metaNet.provider);
      const nftInfo = await checkRequest.then((result) => {
        return getNFTs(mainNet.contract, account);
        // return getNFTsEther(metaNet.contract, account);
      });
      setgetNFTState(nftInfo);
      }
    getData();

    // Promise.all(nftInfo.pNFTSupplier).then((result) => {
    //   _debug("nftInfo Promise result",result);
    //   // 
    // });  
  
  },getNFTState)

  if (getNFTState != null) {   
    NFTSupplier = getNFTState[0];
    NFTs = getNFTState[1];
    NFTBalance = getNFTState[2];
  }
return (
        <div>
        {
          (getNFTState !== null) ? 
          <CTabBody /> 
          :  <></>

        } 
        </div>
        );
  }

  
function getNFTs(contract, account){
  let promiseNFT = [];
  let promiseSupply = [];
  let promiseBalance = [];

  for (var i = 0; i < 3; i++){

    let nftSupply = contract.methods.balanceOf(account.deployer, i+1).call()
      .then( (result) =>{
        return result;
      });

      promiseSupply.push(nftSupply);

      let nftBalance = contract.methods.balanceOf(account.current, i+1).call()
      .then( (result) =>{
        return result;
      });

      promiseBalance.push(nftBalance);

      let nftdata = contract.methods.uri(i+1).call()
      .then((value) => {
        const fetchJson =
        fetch(value)
        .then(response => {
          return response.json();
        }).then(data => {
          return data;
        }).catch((e) => {
          console.log('###--- ERROR ----###');
          console.log(e.message);
        });

        return fetchJson;
        });
    
    promiseNFT.push(nftdata);
  }

      return Promise.all([_promiseArrayResolver(promiseSupply), _promiseArrayResolver(promiseNFT), _promiseArrayResolver(promiseBalance)])
      .then((result) => {
          return result;
      });  
}


function getNFTsEther(contract, account){
  let promiseNFT = [];
  let promiseSupply = [];
  let promiseBalance = [];

  _debug("contract",contract);
  _debug("account",account);

  for (var i = 0; i < 3; i++){

    let nftSupply = contract.balanceOf(account.deployer, i+1)
      .then( (result) =>{
        return result;
      });

      promiseSupply.push(nftSupply);

      let nftBalance = contract.balanceOf(account.current, i+1)
      .then( (result) =>{
        return result;
      });

      promiseBalance.push(nftBalance);

      let nftdata = contract.uri(i+1)
      .then((value) => {
        const fetchJson =
        fetch(value)
        .then(response => {
          return response.json();
        }).then(data => {
          return data;
        }).catch((e) => {
          console.log('###--- ERROR ----###');
          console.log(e.message);
        });

        return fetchJson;
        });
    
    promiseNFT.push(nftdata);
  }

    return Promise.all(promiseSupply, promiseNFT, promiseBalance)
      .then((result) => {
          return result;
      });  
      // pNFTSupplier : _promiseArrayResolver(promiseSupply),
      // pNFTs : _promiseArrayResolver(promiseNFT),
      // pNFTBalance :  _promiseArrayResolver(promiseBalance)
}

function CTabBody(){

    return (<div>
      <div className="card">
        <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                <li className="nav-item">
                    <a href="#supplier" className="nav-link active" aria-current="true" data-bs-toggle="tab" >Supplier</a>
                </li>
                <li className="nav-item">
                  <a href="#users" className="nav-link"  data-bs-toggle="tab" >Users</a>
                </li>
                <li className="nav-item">
                  <a href="#wallets" className="nav-link"  data-bs-toggle="tab" >Wallets</a>
                </li>
            </ul>
        </div>
        <form className="card-body tab-content">
            <ContentSupplier />
            <ContentUsers />
            <ContentWallets />
        </form>
        </div>
      </div>
    );
  }

  
function ContentSupplier(){
  return (
      <div className="tab-pane active" id="supplier">
        <Supplier />
    </div>);
}


function ContentUsers(){
  return (
      <div className="tab-pane" id="users">
        {/* <Collections /> */}
    </div>);
}

function ContentWallets(){
  return (
      <div className="tab-pane" id="wallets">
        {/* <Wallets /> */}
    </div>);
}
