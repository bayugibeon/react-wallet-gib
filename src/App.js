import './App.css';
import {Body} from './components/Layout';
import React, {useState, useEffect, createContext, useContext, useRef} from 'react';
import AccountClass from './model/Account';
import NetworkClass from './model/NetworkClass';
import { _checkMetamask, _debug } from './Functions';
import AbiFile from './erc1155-abi.json';
import {NetworkContextProvider} from './components/Context';
import {ConnectWalletButton} from './components/Wallets';
import { MetaMaskButton } from '@metamask/sdk-react-ui';
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';

const App = () => {
  return (
    <MetaMaskUIProvider sdkOptions={{
      dappMetadata: {
        name: "Demo UI React App",
      }
    }}>
      <div className="App">
        <MetaMaskButton theme={'light'} color="white"></MetaMaskButton>
      </div>
    </MetaMaskUIProvider>

  );
};
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
