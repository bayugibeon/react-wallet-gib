import React from 'react';
import Web3 from 'web3';

const APP_NAME = 'NFT Management'
const DEFAULT_ETH_JSONRPC_URL = process.env.REACT_APP_RPC
const DEFAULT_CHAIN_ID = process.env.REACT_APP_CHAINID

export const coinbaseWallet = new CoinbaseWalletSDK({

    appName: APP_NAME,
    darkMode: true
  })
  
  // Initialize a Web3 Provider object
  export const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)
  
  // Initialize a Web3 object
  export const web3Wallet = new Web3(ethereum);

export function Wallets() {
    return (
        <div>
            <div>
                <h3>Wallet</h3>
                <ConnectWalletButton />
            </div>
            <div>
                <h3>Wallet</h3>
                <ConnectButton />
            </div>
        </div>
    );
  }
  