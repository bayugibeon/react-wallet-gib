import React, {createContext, useContext} from 'react';
import AbiFile from './../erc1155-abi.json';
import { MetaMaskButton } from '@metamask/sdk-react-ui';
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';
import AccountClass from './../model/Account';
import NetworkClass from './../model/NetworkClass';
import NetworkEtherClass from './../model/NetworkEtherClass';
import detectEthereumProvider from '@metamask/detect-provider';
import { _checkMetamask, _debug } from './../Functions';
import {Body} from './../components/Layout';

const MetamaskNetContext = createContext();
const MainNetContext = createContext();
const AccountContext = createContext();

export function NetworkContextProvider({provider, account, children}){
    const walletProvider = provider;
    // const { walletProvider } = provider()
    // _debug("walletProvider",walletProvider);
    const mainNetwork = new NetworkClass(process.env.REACT_APP_RPC, process.env.REACT_APP_ACCOUNT, AbiFile, 
        process.env.REACT_APP_CONTRACT, process.env.REACT_APP_KEY);
    const accountClass = new AccountClass(process.env.REACT_APP_ACCOUNT, account, process.env.REACT_APP_CONTRACT);
    const metamaskNetwork = new NetworkEtherClass(walletProvider, account, AbiFile, process.env.REACT_APP_CONTRACT);
    // const metamaskNetwork = new NetworkClass(walletProvider, account, AbiFile, process.env.REACT_APP_CONTRACT);


    return(
            <MetamaskNetContext.Provider value={metamaskNetwork}>
                <MainNetContext.Provider value={mainNetwork}>
                    <AccountContext.Provider value={accountClass}>
                        <Body />
                    </AccountContext.Provider>
                </MainNetContext.Provider>
            </MetamaskNetContext.Provider>     

    );
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
