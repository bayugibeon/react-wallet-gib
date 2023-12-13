import React from 'react';
import { Core } from '@walletconnect/core';
import { Web3Wallet } from '@walletconnect/web3wallet';
import Button from '@mui/material/Button';
import { useWeb3Modal, createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatUnits } from 'ethers'

const projectId = process.env.REACT_APP_WALLET;
const core = new Core({
  projectId: process.env.REACT_APP_WALLET
});

const web3wallet = await Web3Wallet.init({
  core, // <- pass the shared `core` instance
  metadata: {
    name: 'Demo app',
    description: 'Demo Client as Wallet/Peer',
    url: 'www.walletconnect.com',
    icons: []
  }
});

export function WalletConnector() {
    const connect = web3wallet;
    return (
            <Button >Connect</Button>
    );
}
const mainnet = {
  chainId: 80001,
  name: 'Mumbai',
  currency: 'MATIC',
  explorerUrl: 'https://mumbai.polygonscan.com',
  rpcUrl: 'https://polygon-mumbai-pokt.nodies.app'
}
  
const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://react-wallet-gib.vercel.app/'
  };

createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [mainnet],
    projectId
  });

  
export  function ConnectModal() {
  const { open } = useWeb3Modal();

  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const ethersProvider =  new BrowserProvider(walletProvider);


  
  return (
    <>
      <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
      {(!isConnected) ? <></> : <>
        <p>Address : {address}</p>
      </>
      }
      
    </>
  )
  }

//  export function ConnectModal() {

//     const { open, close } = useWeb3Modal();
    
//     const connect = open({ view: 'Connect' });
    
//     return (
//         <Button onClick={connect}>Connect modal</Button>
// );
// }