import { _debug } from "../Functions";
import React, { useEffect, useState }  from 'react';
import {GetMetaNet, GetMainNet, GetAccount} from './Context';

const Blockchain = () => {

  let metaNet = GetMetaNet();
  let account = GetAccount();

  const [collectionState, setCollectionState] = useState();
  const [accountState, setAccountState] = useState(account.current);
  const [apiResult, setApiResult] = useState(null);

  const chainHex = '0x' + account.chainId.toString(16);

  const findAccount = () => {
    const options = {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_API },
    };

    if (accountState !== '' && accountState !== null)
    {
      const apiUrl = 'https://deep-index.moralis.io/api/v2.2/'+accountState+'/nft?chain=' +chainHex;
      _debug("FETCH MORALIS", apiUrl);
      fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        setApiResult(data);
      })
      .catch((err) => {
          _debug('fetch error',err.message);
      });

    }  
  }
    return (
        <div>
        <div class="input-group mb-3 w050 ">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Account</span>
          </div>
          <input type="text" value={accountState} className="form-control w-25" aria-label="account" aria-describedby="basic-addon1" 
            name="inputAccount" onChange={e => setAccountState(e.target.value)}
          />
          <button type="button" className="btn btn-primary" onClick={() => findAccount()}>
            Find
          </button>
        </div>
        {(apiResult !== null && apiResult.result.length > 0) ? 
        <>
          {_debug('apiResult',apiResult)};
          <h4>Found {apiResult.result.length} NFTs</h4>
          <ViewNFTMetadata data={apiResult.result}/>
        </>
        : <></>}
      </div>

    );
}

export default Blockchain;

function ViewNFTMetadata(data) {
  const dataArray = data.data;
  let htmlResult = [];

  for(var nfts=0;nfts < dataArray.length;nfts++) {
    let keyNames = Object.keys(dataArray[nfts]);
    let columnResult = [];
    let nftData = Object.values(dataArray[nfts]);
    _debug('dataArray',dataArray[nfts]);
    for (var i=0;i < keyNames.length;i++)
     {
      if (nftData[i] === null) {
        // _debug('current KeyName', keyNames[i]);
        // _debug('current nftData', nftData[i]);
  
      }
      if (keyNames[i] === 'metadata') {
        let metaResult = [];
        if (nftData[i] !== null){
          let metaObj = JSON.parse(nftData[i]);
          let metaKeys = Object.keys(metaObj);
          let metaValues = Object.values(metaObj);
          for (var m=0; m < metaValues.length; m++ )
          {          
            metaResult.push(
              <>
              <div className="col col-5">
                  <div className="card-text">
                    {metaKeys[m]}
                  </div>
              </div>
              <div className="col col-7">
                  <div className="card-text">
                    {metaKeys[m].includes('image') || metaKeys[m].includes('pic') || metaKeys[m].includes('img') ? 
                      <img className="" src={metaValues[m]} alt="Card image cap"/>
                      : 
                      metaValues[m]
                    }
                  </div>
              </div>
            </>
            );
          }
        }

        columnResult.push(
          <div className="card">
            <div className="card-title">
              {keyNames[i]}
            </div>
            <div className="card-body">
              <div className="row">
                {metaResult}
              </div>
            </div>
        </div>
        );
      } else {
        columnResult.push(
          <>
            <div className="col col-5">
                <div className="card-text">
                  {keyNames[i]}
                </div>
            </div>
            <div className="col col-7">
                <div className="card-text">
                  {nftData[i]}
                </div>
            </div>
          </>
        );
      }
     }

     _debug('columnResult',columnResult);
     htmlResult.push(
      <div className="col col-sm-12 col-md-6 mb-5">
          <div className="card">
          <div className="h3 card-title bold text-center">
            {nfts+1}
          </div>
            <div className="card-body">
              <div className="row">
                {columnResult}
              </div>
            </div>
          </div>
      </div>
     );
  }

  return (
    <div className="row">
      {htmlResult}
    </div>);
}

