import './App.css';
import {Body} from './components/Layout';
import React, {useState, useEffect, createContext, useContext, useRef} from 'react';
import AccountClass from './model/Account';
import NetworkClass from './model/NetworkClass';
import { _checkMetamask, _debug, metamaskAccount } from './Functions';
import AbiFile from './erc1155-abi.json';
import {NetworkContextProvider} from './components/Context';
import {metadata, mainnet, projectId, getWeb3Modal} from './components/Wallets';
import Button from '@mui/material/Button';
import { useWeb3Modal, createWeb3Modal, defaultConfig, 
  useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { BrowserProvider, Contract, formatUnits } from 'ethers';
import {ethers} from 'ethers';

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
});


function App() {
  const [initLoad, setInitLoad] = useState('Done');

  const { address, chainId, isConnected } = useWeb3ModalAccount()

  const [showNFT, setshowNFT] = useState(false);
  
  const { open } = useWeb3Modal();

  const showNFTEvent = () => {
    setshowNFT(true);
  }

  const { walletProvider } = useWeb3ModalProvider();
  const browserProvider = new BrowserProvider(walletProvider);
  _debug("walletProvider",walletProvider);
  _debug("browserProvider", browserProvider);

  return (
   <div>
      <h3 className="mb-3">React Wallet</h3>
      <>
        <button onClick={() => open()}>Open Connect Modal</button>
        <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
        {(!isConnected) ? <></> : 
        <>
          <p>Address : {address}</p>
        </>
        }
      </>

        {
          (!isConnected || address === ""? <></> :
            <>
              {/* <NetworkContextProvider provider={browserProvider} account={address}> */}
              <NetworkContextProvider provider={window.ethereum} account={address}>
              <button onClick={showNFTEvent}>Show NFTs</button>
              </NetworkContextProvider> 
            </>
          )
        }
    </div>
    );
}

export default App;
