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
import Button from '@mui/material/Button';
import { GetMetaNet } from './components/Context';

const App = () => {
  // let MainNetwork = new NetworkClass(process.env.REACT_APP_RPC, process.env.REACT_APP_ACCOUNT, AbiFile, 
  //     process.env.REACT_APP_CONTRACT, process.env.REACT_APP_KEY);
  // let account = new AccountClass(process.env.REACT_APP_ACCOUNT, defaultState, process.env.REACT_APP_CONTRACT);

  const [curAccount, setcurAccount] = useState("");
  const [initConnect, setinitConnect] = useState(false);
  const currentAccount = { curAccount, setcurAccount };

  const [isMetamaskInstalled, setisMetamaskInstalled] = useState(false);

  let mainNetwork = null;
  let accountClass = null;
  let metamaskNetwork = null;

  window.ethereum.on('accountsChanged', handleAccountsChanged);
       
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
    } else if (accounts[0] !== curAccount && curAccount !== null && curAccount !== "" ) {
     //  reqAccount = accounts[0];
      setcurAccount(accounts[0]);
    }
  }

  const connectMetamask = () => {
    return window.ethereum.request({ method: 'eth_requestAccounts' })
    .then((accounts) => {
      return true;
      // setcurAccount(accounts[0]);
      // setinitConnect(true);
    })
    .catch((err) => {
      console.error(err);
    });
  };

  const getAccount = () => {
       return window.ethereum.request({ method: 'eth_accounts' })
      .then((accounts) => {
        // setcurAccount(accounts[0]);
        return accounts[0];
      })
      .catch((err) => {
        console.error(err);
      });
    };

            // .then(handleAccountsChanged)
        // window.ethereum.on('accountsChanged', handleAccountsChanged);
    
        // function handleAccountsChanged(accounts) {
        //   if (accounts.length === 0) {
        //   } else if (accounts[0] !== curAccount) {
        //     reqAccount = accounts[0];
        //     // setcurAccount(accounts[0]);
        //   }
       // }

       const accountChange = () => {
           window.ethereum.on('accountsChanged', handleAccountsChanged);
       
           function handleAccountsChanged(accounts) {
             if (accounts.length === 0) {
             } else if (accounts[0] !== curAccount && curAccount !== null && curAccount !== "" ) {
              //  reqAccount = accounts[0];
               setcurAccount(accounts[0]);
             }
           }
          }

  return (
    <>
      <MetaMaskUIProvider sdkOptions={{
      useDeeplink: false,
      // openDeeplink: (link) => {
      //     // window.location("https://metamask.app.link/dapp/react-wallet-gib.vercel.app/");
      //     window.open("https://metamask.app.link/dapp/react-wallet-gib.vercel.app/" + link,"_self")
      //   },
      dappMetadata: {
          name: process.env.REACT_APP_METADATA_NAME
          // "https://metamask.app.link/dapp/react-wallet-gib.vercel.app/"
          // uri: "https://react-wallet-gib.vercel.app"
          // url: window.location.protocol + '//' + window.location.host,
      }}}>
              <button className={'Button-Normal'} style={{ padding: 10, margin: 10 }} onClick={connectMetamask}>
                Connect Metamask
              </button>
              <button className={'Button-Normal'} style={{ padding: 10, margin: 10 }} onClick={getAccount}>
                Request Account
              </button>
              <button className={'Button-Normal'} style={{ padding: 10, margin: 10 }} 
                onClick={() => setinitConnect(connectMetamask())}>
                Connect Metamask
              </button>
              <button className={'Button-Normal'} style={{ padding: 10, margin: 10 }} 
                onClick={() => setcurAccount(getAccount())}>
                Request Account
              </button>
              <button className={'Button-Normal'} style={{ padding: 10, margin: 10 }} onClick={accountChange}>
                Account Change
              </button>
              <p>initConnect : {initConnect.toString()}</p>
              <p>Account : {curAccount}</p>
              <MetaMaskButton theme={'light'} color="white"></MetaMaskButton>
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
