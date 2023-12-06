import { Core } from '@walletconnect/core'
import { Web3Wallet } from '@walletconnect/web3wallet'
import React from 'react'
import { createWeb3Modal, defaultConfig, useWeb3Modal } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.REACT_APP_WALLET
// 2. Set chains
const mainnet = {
  chainId: 80001,
  name: 'Mumbai',
  currency: 'MATIC',
  explorerUrl: 'https://mumbai.polygonscan.com',
  rpcUrl: 'process.env.REACT_APP_WALLET'
}

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'http://localhost:3000/'
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
})

function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal()

  return (
    <>
      <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
    </>
  )
}

const core = new Core({
    projectId: process.env.REACT_APP_WALLET
 });  
function web3wallet() {
    return Web3Wallet.init({
        core, // <- pass the shared `core` instance
        metadata: {
          name: 'Demo app',
          description: 'Demo Client as Wallet/Peer',
          url: 'www.walletconnect.com',
          icons: []
        }
      });
    
}
  function ConnectWalletButton() {
    const open = web3wallet()
  
    return (
      <>
        <button onClick={() => open()}>Open Wallet</button>
      </>
    )
  }
  function ConnectButtonWeb3Modal() {
    return <w3m-button />
  }

  export function Wallets() {
    return (
        <div>
            <div>
                <h3>Wallet Web3 Modal</h3>
                <ConnectButtonWeb3Modal />
            </div>
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
  