import React, { useEffect, useState }  from 'react';
import {Supplier} from './Supplier';
import {_promiseArrayResolver, _debug, _checkApproval, _setApproval,
  _transferTokenRequest, _getTransactionReceipt, _watchAsset} from '../Functions';
import { GetAccount, GetMetaNet } from './Context';


let NFTs = [];
let NFTBalance = [];

export function Collections(){
  const [collectionState, setCollectionState] = useState();
  const [accountState, setAccountState] = useState("");
  let metaNet = GetMetaNet();

  const findAccount = () => {
    setCollectionState("");
    _debug("accountState",accountState);
    if (accountState !== "") {
      _debug("accountState INSIDE",accountState);
      let resultPromise = getNFTs(metaNet.contract, accountState);
      resultPromise.then((result) => {
        _debug("accountState result",result);
        setCollectionState("Done");
      });
    }
  }

  return (<div>
      <div>
        <div class="input-group mb-3 w050 ">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Account</span>
          </div>
          <input type="text" className="form-control w-25" aria-label="account" aria-describedby="basic-addon1" 
            name="inputAccount" onChange={e => setAccountState(e.target.value)}
          />
          <button type="button" className="btn btn-primary" onClick={() => findAccount()}>
            Find
          </button>
        </div>
      </div>

      {(collectionState == "Done")
      ? <CardStacks /> : <div></div> 
      }
      
  </div>);
}
  
function getNFTs(contract, accountAddress){

  let promiseNFT = [];
  let promiseBalance = [];

  for (var i = 0; i < 3; i++){

      let nftBalance = contract.methods.balanceOf(accountAddress, i+1).call()
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


    
    NFTs = _promiseArrayResolver(promiseNFT);
    NFTBalance = _promiseArrayResolver(promiseBalance);

    return Promise.all([NFTs,NFTBalance]).then((result) => {
      NFTs = result[0];
      NFTBalance = result[1];
    });
  
}


function CardStacks({title}){
  return(
      <div className="row">
          <CardColumns title={title}/>
      </div>
  );
}

function CardColumns({title}) {  
  var stacks = [];
  for (var i = 0; i < 3; i++) {
    let numberAmount = Number(NFTBalance[i]);
    if (numberAmount > 0)
    {
      stacks.push(
        <div className="col col-2" id={"card-content-" +{i}}>
            <CardContent index={i} title={title} amount={numberAmount} />
        </div>
        );
      }

  }
  if (stacks.length == 0) stacks.push(<h3>User doesn't have any NFT from this contract</h3>)
  return stacks;
}



function CardContent({index, title, amount}){
  let nft = NFTs[index];

  const request = () => {

  }

  return (
    <div className="card ">
    { (typeof(nft) !== 'undefined') ?
    <div>
    <img className="card-img-top collection-items" src={nft.image} alt="Card image cap"/>
      <div className="card-body">
        <div className="card-title text-center">
          {nft.name}
        </div>
        <div className="card-text text-center">
          {amount}
        </div>
      </div>
      <div className="card-body text-center">
        {/* <button type="button" className="btn btn-primary" onClick={() => request()}>
          Request
        </button> */}
        {/* <div className="h5 mt-2"> {transferState}</div> */}
      </div>

    </div>

      : <div></div>
    }
    </div>
    );
} //----- endof CardContent

