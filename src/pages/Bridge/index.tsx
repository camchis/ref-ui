import './index.css';

import React from 'react';

import BridgeFormProvider from './providers/bridgeForm';
import TokenSelectorProvider from './providers/selectToken';
import {
  WalletConnectNearProvider,
  WalletConnectProvider,
} from './providers/walletConcent';
import BridgeEntry from './views/entry';
import BridgeTransactionHistory from './views/history';
import { Route, Switch } from 'react-router-dom';
import BridgeTransactionStatusProvider from './providers/bridgeTransactionStatus';

function Layout() {
  return (
    <Switch>
      <Route path="/bridge" exact>
        <BridgeEntry />
      </Route>
      <Route path="/bridge/history">
        <BridgeTransactionHistory />
      </Route>
    </Switch>
  );
}

function BridgePage() {
  return (
    <div className="bridge-page">
      <WalletConnectProvider>
        <WalletConnectNearProvider>
          <TokenSelectorProvider>
            <BridgeFormProvider>
              <BridgeTransactionStatusProvider>
                <Layout />
              </BridgeTransactionStatusProvider>
            </BridgeFormProvider>
          </TokenSelectorProvider>
        </WalletConnectNearProvider>
      </WalletConnectProvider>
    </div>
  );
}

export default BridgePage;
