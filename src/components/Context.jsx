import React, {createContext, useContext} from 'react';
import AbiFile from './../erc1155-abi.json';
import { MetaMaskButton } from '@metamask/sdk-react-ui';
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';
import AccountClass from './../model/Account';
import NetworkClass from './../model/NetworkClass';

const MetamaskNetContext = createContext();
const MainNetContext = createContext();
const AccountContext = createContext();

export function NetworkContextProvider({currentAccount, children}){
  const mainNetwork = new NetworkClass(process.env.REACT_APP_RPC, process.env.REACT_APP_ACCOUNT, AbiFile, 
      process.env.REACT_APP_CONTRACT, process.env.REACT_APP_KEY);
  const account = new AccountClass(process.env.REACT_APP_ACCOUNT, "", process.env.REACT_APP_CONTRACT);

  const metamaskNetwork = new NetworkClass(window.ethereum, null, AbiFile, process.env.REACT_APP_CONTRACT);

    return(
        <MetaMaskUIProvider sdkOptions={{
                dappMetadata: {
                name: process.env.REACT_APP_METADATA_NAME,
                }
            }}>
            <MetamaskNetContext.Provider value={metamaskNetwork}>
                <MainNetContext.Provider value={mainNetwork}>
                    <AccountContext.Provider value={account}>
                        {children}
                    </AccountContext.Provider>
                </MainNetContext.Provider>
            </MetamaskNetContext.Provider>     
        </MetaMaskUIProvider>
    );
}


const MetamaskButtonContext = () => {

}


export function GetMetaNet() {
    const context = useContext(MetamaskNetContext);
    return context
}

export function GetMainNet() {
    const context = useContext(MainNetContext);
    return context
}

export function GetAccount() {
    const context = useContext(AccountContext);
    return context
}
