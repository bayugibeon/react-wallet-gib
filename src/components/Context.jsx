import React, {createContext, useContext} from 'react';
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';

const MetamaskNetContext = createContext();
const MainNetContext = createContext();
const AccountContext = createContext();

export function NetworkContextProvider({metaProvider, mainProvider, account, children}){

    // console.log('###--- metaProvider ---###');
    // console.log(metaProvider);
  
    return(
        <MetaMaskUIProvider sdkOptions={{
                dappMetadata: {
                name: "React Wallet Metamask",
                }
            }}>
            <MainNetContext.Provider value={mainProvider}>
                <AccountContext.Provider value={account}>
                    {children}
                </AccountContext.Provider>
            </MainNetContext.Provider>
        {/* <MetamaskNetContext.Provider value={metaProvider}>
        </MetamaskNetContext.Provider>     */}
        </MetaMaskUIProvider>
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
