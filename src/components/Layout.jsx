import React, { useEffect, useState }  from 'react';
import {GetMetaNet, GetMainNet, GetAccount} from './Context';
import NFT from '../model/NFTData';
import {_promiseArrayResolver, _debug, _checkApproval, _setApproval,
  _transferTokenRequest, _getTransactionReceipt, _watchAsset} from '../Functions';
import {Supplier} from './Supplier';
// import {Collections} from './Users';
// import {Wallets} from './Wallets';

export let NFTSupplier = [];
export let NFTBalance = [];
export let NFTs = [];

export function Body() {
  const [getNFTState, setgetNFTState] = useState();

  const metaNet = GetMetaNet();
  const mainNet = GetMainNet();
  
  // GetNFTs(metaNet.contract);

    return (
        <div>
          <CTabBody />
        </div>)
        ;
  }

  
function GetNFTs(contract){
  const [getNFTState, setgetNFTState] = useState();

  let promiseNFT = [];
  let promiseSupply = [];
  let promiseBalance = [];

  let account = GetAccount();

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


  useEffect(() => {
    
    NFTSupplier = _promiseArrayResolver(promiseSupply);
    NFTs = _promiseArrayResolver(promiseNFT);
    NFTBalance = _promiseArrayResolver(promiseBalance);

    Promise.all([NFTSupplier,NFTs,NFTBalance]).then((result) => {
      setgetNFTState(result);
    });

  }, []);

  if (getNFTState != null) {   
    NFTSupplier = getNFTState[0];
    NFTs = getNFTState[1];
    NFTBalance = getNFTState[2];
  }
  
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
