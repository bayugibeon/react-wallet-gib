import React, { useEffect, useState }  from 'react';
import { MetaMaskButton, MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import {GetMetaNet, GetMainNet, GetAccount} from './Context';
import NFT from '../model/NFTData';
// import {_promiseArrayResolver, _debug, _checkApproval, _setApproval, _setApprovalWeb3,
//   _transferTokenRequest, _getTransactionReceipt, _watchAsset} from '../Functions-ether';
  import {_promiseArrayResolver, _debug, _checkApproval, _setApproval, 
    _transferTokenRequest, _getTransactionReceipt, _watchAsset} from '../Functions';
  import {NFTSupplier, NFTBalance, NFTs} from './Layout';
import NetworkEtherClass from './../model/NetworkEtherClass';

export function Supplier() {

  return (
        <div>
            <div>
              <AddNFTs />
              <CTabs />
            </div>
        </div>)
        ;
  }

function AddNFTs(){
  let metaNet = GetMetaNet();
  let account = GetAccount();

  const addnft = () => {
    for(let i = 0; i<3; i++){
      _watchAsset(metaNet, account, i + 1);
    }
  };

  return (<div className="my-3 mx-2">
        <button type="button" className="btn btn-primary" onClick={() => addnft()}>
              Update NFTs in Wallet
        </button>
  </div>);
}

function CTabs(){
    return(
    <div>
      <CTabMain/>
    </div>);
  }

  function CTabMain(){

    return (<div>
      <div className="card">
        <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs" data-bs-tabs="tabs">
                <li className="nav-item">
                    <a href="#deposit" className="nav-link active" aria-current="true" data-bs-toggle="tab" >Deposit</a>
                </li>
                <li className="nav-item">
                  <a href="#withdraw" className="nav-link"  data-bs-toggle="tab" >Withdraw</a>
                </li>
            </ul>
        </div>
        <form className="card-body tab-content">
            <ContentDeposit />
            <ContentWithdraw />
        </form>
        </div>
      </div>
    );
  }

  
function ContentDeposit(){
    return (
        <div className="tab-pane active" id="deposit">
          <Contents title="Deposit" />
      </div>);
}

function ContentWithdraw(){
    return (
        <div className="tab-pane fade" id="withdraw">
          <Contents title="Withdraw" />
      </div>);
}

function Contents({title}){

  return (
    <div>
      <CardStacks title={title} />      
    </div>
  );
}

function CardStacks({title}){
    return(
        <div className="row">
            <CardColumns title={title}/>
        </div>
    );
}

function CardColumns({title}) {
  let amount = [];
  if (title === "Deposit")
    amount = NFTSupplier;
  else
    amount = NFTBalance;
  
    var stacks = [];
    for (var i = 0; i < 3; i++) {
      let numberAmount = Number(amount[i]);
        if (numberAmount > 0)
        {
            stacks.push(
            <div className="col col-4" id={"card-content-" +i.toString()}>
                <CardContent index={i} title={title} amount={numberAmount}/>
            </div>
            );
        }
    }
    return stacks;
}


function CardContent({index, title, amount}){
  const [transferState, setTransferState] = useState("");

  let nft = NFTs[index];
  var toAccount = "";
  var fromAccount = "";
  var account = GetAccount();
  var metaNet = GetMetaNet();
  var mainNet = GetMainNet();
  var contract = metaNet.contract;
  var mainContract = mainNet.contract;
  var id = index + 1;
  var balance = NFTBalance[index];

  if (title == "Deposit")
  {
    toAccount = account.current;
    fromAccount = account.deployer;
  }
  else if (title == "Withdraw")
  {
    toAccount = account.deployer;
    fromAccount = account.current;
  }

  // var etherContract = new NetworkEtherClass(mainNet.provider, mainNet.address, mainNet.abi, null, mainNet.privateKey);

  // mainContract.defaultAccount = account.deployer;
  // mainContract.defaultBlock = "latest";

  // metaNet.defaultAccount = account.current;
  // metaNet.defaultBlock = "latest";

  const transferTokenAndReceipt = () => {
    setTransferState("Send Request...");
    _transferTokenRequest(mainNet, metaNet, id, fromAccount, toAccount, account.contract, account.current).then((requestResult) => {

              _debug("requestResult",requestResult);

              if (requestResult === null || requestResult === "")
              {
                setTransferState("");
              }
              else {
                if (typeof(requestResult) === 'undefined' || requestResult == null || requestResult == "") {
                  setTransferState("");
                  return;
                }

                setTransferState("Waiting for Receipt...");

                _getTransactionReceipt(metaNet, requestResult).then((receiptResult) => {			
  
                  if (title == "Deposit" && (balance != null && parseInt(balance) < 1) ) {
                    setTransferState("Update NFTs in Wallet...");
                  
                    _watchAsset(metaNet, account, id).then((watchResult) => {
                      window.location.reload(false);
                    }).error((result) => {
                      window.location.reload(false);
                    });							  
                  } else {
                    window.location.reload(false);
                  }
                });
  
              }
            });
  }

  const transfer = () => {

    setTransferState("Checking Approval...");

    _checkApproval(account.deployer, account.current, mainContract).then((isApproved) => {
      _debug("isApproved",isApproved);
      if (!isApproved){
        setTransferState("Ask Approval...");
        _setApproval(mainNet, metaNet, id, account.deployer, account.current, account.contract, account.current).then((approvalResult) => {
          // _setApprovalWeb3(account.deployer, account.current, mainNet).then((approvalResult) => {
          transferTokenAndReceipt();							
        });
      }
      else {
        transferTokenAndReceipt();							
      }
  });


  }

  return (
    <div className="card">
      <img className="card-img-top" src={nft.image} alt="Card image cap"/>
      <div className="card-body">
        <div className="card-title text-center">
          {nft.name}
        </div>
        <div className="card-text text-center">
          {nft.description}
        </div>
        <div className="card-text text-center">
          {amount}
        </div>
      </div>
      <div className="card-body text-center">
        <button type="button" className="btn btn-primary" onClick={() => transfer()}>
          {title}
        </button>
        <div className="h5 mt-2"> {transferState}</div>
      </div>
    </div>
    );
} //----- endof CardContent


