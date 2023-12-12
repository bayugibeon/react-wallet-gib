import './App.css';
import {Body} from './components/Layout';
import React, {useState, useEffect, createContext, useContext, useRef} from 'react';
import AccountClass from './model/Account';
import NetworkClass from './model/NetworkClass';
import { _checkMetamask, _debug, metamaskAccount } from './Functions';
import AbiFile from './erc1155-abi.json';
import {NetworkContextProvider} from './components/Context';
import {ConnectWalletButton} from './components/Wallets';
import { MetaMaskButton } from '@metamask/sdk-react-ui';
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';
import detectEthereumProvider from '@metamask/detect-provider';
import { useSDK } from '@metamask/sdk-react';
import Button from '@mui/material/Button';
import { GetMetaNet } from './components/Context';

const App = () => {
  // let MainNetwork = new NetworkClass(process.env.REACT_APP_RPC, process.env.REACT_APP_ACCOUNT, AbiFile, 
  //     process.env.REACT_APP_CONTRACT, process.env.REACT_APP_KEY);
  // let account = new AccountClass(process.env.REACT_APP_ACCOUNT, defaultState, process.env.REACT_APP_CONTRACT);

  const [curAccount, setcurAccount] = useState("");
  const currentAccount = { curAccount, setcurAccount };

  const [isMetamaskInstalled, setisMetamaskInstalled] = useState(false);
  const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();
  const [response, setResponse] = useState();
  const [contextReady, setContextReady] = useState();

  let mainNetwork = null;
  let accountClass = null;
  let metamaskNetwork = null;

  // useEffect(() => {
  //   try{ 
  //     let detection = detectEthereumProvider();
  
  //     detection.then((result) => {
  //         if (result !== null && window.ethereum.isMetaMask) {
  //           setisMetamaskInstalled(true);

  //           window.ethereum.request({ method: 'eth_accounts' })
  //           .then(handleAccountsChanged)
  //           .catch((err) => {
  //             console.error(err);
  //           });
      
  //         window.ethereum.on('accountsChanged', handleAccountsChanged);
      
  //         function handleAccountsChanged(accounts) {
  //           if (accounts.length === 0) {
  //           } else if (accounts[0] !== account) {
  //             setAccount(accounts[0]);
  //           }
  //         }
  
  //         }
  //     });
  
  //   } catch(e) { 
  //       console.error(e); 
  //   }
  
  // },[account]);
  const connectAndSign = () => {
    try {
      const signResult = sdk?.connectAndSign({
        msg: 'Connect + Sign message'
      });
      setResponse(signResult);
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  _debug(useSDK());
  const connect = () => {
    
    try {
      sdk.connect().then((result) => {
        _debug("result",result);
      });
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const getAccount = () => {
    let reqAccount = "";
    window.ethereum.request({ method: 'eth_requestAccounts' })
    .then((requestResult) => {
      _debug(requestResult);
        window.ethereum.request({ method: 'eth_accounts' })
        .then((result) => {
          document.getElementById("account").value = result[0];
        })
        // .then(handleAccountsChanged)
        .catch((err) => {
          console.error(err);
        });
        // window.ethereum.on('accountsChanged', handleAccountsChanged);
    
        // function handleAccountsChanged(accounts) {
        //   if (accounts.length === 0) {
        //   } else if (accounts[0] !== curAccount) {
        //     reqAccount = accounts[0];
        //     // setcurAccount(accounts[0]);
        //   }
        // }
        return reqAccount;
    })
    .catch((err) => {
      console.error(err);
    });

  };

  return (
    <>

      <MetaMaskUIProvider sdkOptions={{
      useDeeplink: false,
      dappMetadata: {
          name: process.env.REACT_APP_METADATA_NAME,
          url: window.location.protocol + '//' + window.location.host,
      }}}>
              <button className={'Button-Normal'} style={{ padding: 10, margin: 10 }} onClick={connect}>
                Connect
              </button>
              <button className={'Button-Normal'} style={{ padding: 10, margin: 10 }} onClick={connectAndSign}>
                Connect w/ Sign
              </button>
              <button className={'Button-Normal'} style={{ padding: 10, margin: 10 }} onClick={getAccount}>
                Request Account
              </button>
              <p>Response : {response}</p>
              <p id="account">Account : {account}</p>
              <p>Chain : {chainId}</p>
              <MetaMaskButton theme={'light'} color="white"></MetaMaskButton>
              <p>Account : {curAccount}</p>
      </MetaMaskUIProvider>
    </>
    );
};



  {/* 
                 
                {
                  (isMetamaskInstalled === false) ?  <></>
                  :
                  <Button variant="outlined" onClick={() => connect()}>Connect</Button>

                }
                <h4>Current Account : {account}</h4> 
              }
  
                  
  
  (account !== null && account !== "") ? 
  <NetworkContextProvider account={account}>
    </NetworkContextProvider>  : <></> */}


// function App() {
//   const [initLoad, setInitLoad] = useState('Done');
//   const [defaultState, setDefaultState] = useState('');

//   let defaultAccount = null;
//   let MetamaskNetwork = null;
//   let MainNetwork = null;
//   let account = null;
  
//   MainNetwork = new NetworkClass(process.env.REACT_APP_RPC, process.env.REACT_APP_ACCOUNT, AbiFile, 
//       process.env.REACT_APP_CONTRACT, process.env.REACT_APP_KEY);
//   account = new AccountClass(process.env.REACT_APP_ACCOUNT, defaultState, process.env.REACT_APP_CONTRACT);

//   // useEffect(() => {
//   //   setInitLoad('Loading');

//   //   let checkAccount = _checkMetamask(window.ethereum);
//   //   checkAccount.then((accountResult) => {
//   //     setDefaultState(accountResult);

//   //     if (accountResult != null) {
//   //       setInitLoad('Done');
//   //     } else {
//   //       setInitLoad('NoMetamask');
//   //     }
//   //   });

    
//   // }, [setDefaultState]);  


//   // if (defaultState != null && defaultState != "") {
//   //   MetamaskNetwork = new NetworkClass(window.ethereum, null, AbiFile, process.env.REACT_APP_CONTRACT);
//   //   MainNetwork = new NetworkClass(process.env.REACT_APP_RPC, process.env.REACT_APP_ACCOUNT, AbiFile, 
//   //     process.env.REACT_APP_CONTRACT, process.env.REACT_APP_KEY);
  
//   //   account = new AccountClass(process.env.REACT_APP_ACCOUNT, defaultState, process.env.REACT_APP_CONTRACT);
  
//   // }


//   return (
//    <div>
//       <h3 className="mb-3">React Wallet</h3>
      
//       {initLoad === 'Loading' || initLoad === ''? <h1>Loading</h1> :
//        initLoad === 'NoMetamask' ? <h1>No Metamask</h1> :
//        (
//         <div>
//         <NetworkContextProvider mainProvider={MainNetwork} account={account}>
        
//             <Body />
//         </NetworkContextProvider> 
//           </div>
//           /* <NetworkContextProvider metaProvider={MetamaskNetwork} mainProvider={MainNetwork} account={account}>
//             <Body />
//         </NetworkContextProvider> */
//        )
//       }
//     </div>
//     );
// }

export default App;
