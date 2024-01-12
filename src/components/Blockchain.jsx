import { _debug } from "../Functions";
import React, { useEffect, useState, Children }  from 'react';
import {GetMetaNet, GetMainNet, GetAccount} from './Context';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {ChainsData} from './../lib/ChainsData';


const Blockchain = () => {

  const contentPerPage = 10;

  const rateLimit = 150;
  const endPointLimit = 5;
  let allowedRequests = rateLimit / endPointLimit;
  let cursor = null;

  let metaNet = GetMetaNet();
  let account = GetAccount();

  const [collectionState, setCollectionState] = useState();
  const [accountState, setAccountState] = useState(account.current);
  const [accountChangedState, setAccountChangedState] = useState(account.current);
  const [apiResult, setApiResult] = useState(null);
  const [chainState, setChainState] = useState();
  const [totalPageState, setTotalPageState] = useState(0);
  const [cursorState, setCursorState] = useState([]);
  const [currentPageState, setCurrentPageState] = useState("");
  const [fetchState, setFetchState] = useState(false);

  const findAccount = (flag) => {
    const options = {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_API },
    };

    setFetchState(false);
    if (accountState !== '' && accountState !== null && chainState !== null)
    {
      let cursorParam = "";

      if (cursorState.length === 0){
        setCursorState([]);
        setAccountChangedState(accountState);

      }

      switch (flag) {
        case 0:
            cursorParam = '&cursor=' + "";          
          break;
        case -1:
          if (currentPageState === 2) {
            cursorParam = '&cursor=' + "";
          } else {
            cursorParam = '&cursor=' + cursorState[currentPageState - 2];
          }
          break;
        case 1:
          cursorParam = '&cursor=' + cursorState[currentPageState - 1];
          break;
        case -99:
          setFetchState(true);
          break;
        default:
          break;
      }

      const chainHex = '0x' + chainState.toString(16);
      let apiUrl = 'https://deep-index.moralis.io/api/v2.2/'+accountState+'/nft?chain=' +chainHex
        + '&limit=' + contentPerPage.toString() + cursorParam

      fetch(apiUrl, options)
        .then((response) => response.json())
        .then((data) => {
          
          if (data.page > cursorState.length) {
            setCursorState(old => [...old, data.cursor]);            
          }

          setCurrentPageState(data.page);

          if (flag ==0) {
            setApiResult(data);
          }
      })
      .catch((err) => {
          _debug('fetch error',err.message);
      });

      window.scrollTo(0, 0);
    }  
  }

  const ComboLayout = () => {
    let menuItems = [];

    ChainsData.forEach((data, i) => {
      menuItems.push(
        <MenuItem value={data.Id}>{data.Name + " (" + data.Id +")"}</MenuItem>
      );
    });

    return (
      <FormControl fullWidth>
      <InputLabel id="select-chain">Chain</InputLabel>
      <Select
        id="select-chain"
        value={chainState}
        label="Chain"
        onChange={e => setChainState(e.target.value)}
      >
        {menuItems}
      </Select>
    </FormControl>          

    );
    
  }

    return (
        <div>
        <div class="input-group mb-3 w050 ">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Account</span>
          </div>
          <div className="w-100">
            <div style={{width: '600px', height: '50px'}}>
              <input type="text" value={accountState} className="form-control" aria-label="account" aria-describedby="basic-addon1" 
                name="inputAccount" onChange={e => setAccountState(e.target.value)}
              />
            </div>
          </div>
          <div style={{width: '300px', height: '50px'}}>
            <ComboLayout />
          </div>
          <button type="button" className="btn btn-primary mx-3" onClick={() => findAccount(0)}>
              Show All
          </button>
          <button type="button" className="btn btn-primary mx-3" onClick={() => findAccount(-99)}>
              Fetch
          </button>
        </div>
        {(apiResult !== null && apiResult.result.length > 0) ? 
        <>
          <h4>Found {apiResult.result.length} NFTs</h4>
          <ViewNFTMetadata data={apiResult.result} lastItemCount={(currentPageState - 1) * contentPerPage}/>
          <div className="mt-1 text-center">
            <div className="mb-3">
              <h4>Page : {currentPageState}</h4>
              
            </div>
            {(currentPageState === 1) ? <></> :
              <button type="button" className="btn btn-primary mx-3" onClick={() => findAccount(-1)}>
                Prev
              </button>
            }  
            {
              (parseInt(apiResult.result.length) < parseInt(contentPerPage)) ? <></> : 
              <button type="button" className="btn btn-primary mx-3" onClick={() => findAccount(1)}>
                Next
              </button>
            }          

        </div>

        </>
        : <></>}

     
        
      </div>

    );
}

export default Blockchain;

function ViewNFTMetadata({data, lastItemCount}) {
  let htmlResult = [];

  for(var nfts=0;nfts < data.length;nfts++) {
    let keyNames = Object.keys(data[nfts]);
    let columnResult = [];
    let nftData = Object.values(data[nfts]);
    for (var i=0;i < keyNames.length;i++)
     {
      if (nftData[i] === null) {
        // _debug('current KeyName', keyNames[i]);
        // _debug('current nftData', nftData[i]);
  
      }
      if (keyNames[i] === 'metadata') {
        columnResult.push(
          <div className="card">
            <div className="card-title">
              {keyNames[i]}
            </div>
            <div className="card-body">
                  {nftData[i] !== null ? 
                    <ComponentTree data={(nftData[i])} />
                  : <></>}
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

     htmlResult.push(
      <div className="col col-sm-12 col-md-6 mb-5">
          <div className="card">
          <div className="h3 card-title bold text-center">
            {lastItemCount + nfts + 1}
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

function ComponentTree({data}) {
  
  let metaObj = [];

  if (data.constructor.name === "String") //first layer of input from metadata is String, further layer become Object because JSON parsing
  {
    metaObj = JSON.parse(data);
  }
  else {
    metaObj = data;
  }

  let metaKeys = Object.keys(metaObj);
  let metaValues = Object.values(metaObj);

  return(
    <>
    <div className="row">
      {
        metaValues.map((value, index) => {
          return (
            <>
              <div className="col col-4 py-1">
                  <div className="card-text">
                    {metaKeys[index]}
                  </div>
              </div>
              <div className="col col-8 py-1">
              { 
                value.constructor.name === "Array" || value.constructor.name === "Object"? 
                <>
                  <ComponentTree data={value}/>
                </> : 
                <>
                      <div className="card-text">
                        {
                          (!metaKeys[index].includes('url') && (metaKeys[index].includes('image') || metaKeys[index].includes('picture') || metaKeys[index].includes('img'))) ? 
                          <img className="nft-image" src={value} alt="Card image cap"/>
                          : 
                          value
                        }
                      </div>
                  </>
                }
                </div>
            </>);
        })
        }
        </div>
    </>
  );
}