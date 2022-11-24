import React, { useContext, useEffect, useState } from 'react';
import SwapCard from '../components/swap/SwapCard';
import CrossSwapCard from '../components/swap/CrossSwapCard';

import Loading from '../components/layout/Loading';
import { useTriTokens, useWhitelistTokens } from '../state/token';
import { WalletContext } from '../utils/wallets-integration';
import { FormattedMessage, useIntl } from 'react-intl';
import { SwapCross } from '../components/icon/CrossSwapIcons';
import { useTriTokenIdsOnRef } from '../services/aurora/aurora';
import { TokenMetadata, ftGetTokenMetadata } from '../services/ft-contract';

export const REF_FI_SWAP_SWAPPAGE_TAB_KEY = 'REF_FI_SWAP_SWAPPAGE_TAB_VALUE';

import { useAllStablePools } from '../state/pool';
import { NewPro } from '../components/icon';
import { useHistory } from 'react-router-dom';
import TokenReserves from '../components/stableswap/TokenReserves';
import {
  AllStableTokenIds,
  isStableToken,
  STABLE_POOL_TYPE,
} from '../services/near';
import { useClientMobile, isMobileExplorer } from '../utils/device';
import { Pool, getStablePoolFromCache } from '../services/pool';
import getConfig from '../services/config';
import { extraStableTokenIds } from '../services/near';
import { nearMetadata, WRAP_NEAR_CONTRACT_ID } from '../services/wrap-near';
import { CrossChainPop } from '../components/icon/swapV3';

export const SWAP_MODE_KEY = 'SWAP_MODE_VALUE';

const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key, newValue) {
  const setItemEvent = new Event('setItemEvent');
  setItemEvent[key] = newValue;
  window.dispatchEvent(setItemEvent);
  originalSetItem.apply(this, [key, newValue]);
};

export enum SWAP_MODE {
  NORMAL = 'normal',
  STABLE = 'stable',
  LIMIT = 'limit',
  X_SWAP = 'xSwap',
}

const ChangeSwapMode = ({
  swapMode,
  setSwapMode,
}: {
  swapMode: SWAP_MODE;
  setSwapMode: (e?: any) => void;
}) => {
  const [hoverXswap, setHoverXswap] = useState(false);

  const isMobile = useClientMobile();

  return (
    <div className="rounded-2xl font-bold  w-full text-limitOrderInputColor text-sm flex py-2 xs:pt-0 xs:pb-2 items-start mx-auto  ">
      <span
        className={`mr-6 text-center px-2 py-1 rounded-xl hover:bg-primaryText hover:bg-opacity-10  flex flex-col cursor-pointer ${
          swapMode === SWAP_MODE.NORMAL ? ' text-white ' : ''
        }`}
        onClick={() => {
          setSwapMode(SWAP_MODE.NORMAL);
          localStorage.setItem(SWAP_MODE_KEY, SWAP_MODE.NORMAL);
        }}
      >
        <FormattedMessage id="swap" defaultMessage="Swap" />
        {swapMode === SWAP_MODE.NORMAL && (
          <div className="w-full mt-1 rounded-full h-1 bg-gradientFrom"></div>
        )}
      </span>

      <span
        className={`mr-3  relative text-center px-2 py-1  rounded-xl hover:bg-primaryText hover:bg-opacity-10 flex flex-col cursor-pointer ${
          swapMode === SWAP_MODE.X_SWAP ? ' text-white ' : ''
        }`}
        onClick={() => {
          setSwapMode(SWAP_MODE.X_SWAP);
          localStorage.setItem(SWAP_MODE_KEY, SWAP_MODE.X_SWAP);
        }}
        onMouseEnter={() => {
          setHoverXswap(true);
        }}
        onMouseLeave={() => {
          setHoverXswap(false);
        }}
      >
        <FormattedMessage id="xSwap" defaultMessage="XSwap" />

        {swapMode === SWAP_MODE.X_SWAP && (
          <div className="w-full mt-1 rounded-full h-1 bg-gradientFrom"></div>
        )}

        {(isMobile ? false : hoverXswap) && (
          <div
            className="absolute z-50"
            style={{
              bottom: '40px',
              right: isMobile ? '-36px' : '-53px',
            }}
          >
            <span className="text-sm whitespace-nowrap text-white right-4 top-1.5 w-36 absolute z-40">
              <FormattedMessage
                id="cross_chain_swap"
                defaultMessage={'Cross-chain Swap'}
              />
            </span>
            <CrossChainPop />
          </div>
        )}
      </span>

      <div
        className="w-0.5 xs:relative xs:mt-2"
        style={{
          borderRight: '1.2px solid rgba(145, 162, 174, 0.2)',
          height: '20px',
        }}
      ></div>

      <span
        className={`ml-3 flex flex-col px-2 py-1  rounded-xl hover:bg-primaryText hover:bg-opacity-10 text-center cursor-pointer ${
          swapMode === SWAP_MODE.LIMIT ? ' text-white ' : ''
        }`}
        onClick={() => {
          setSwapMode(SWAP_MODE.LIMIT);
          localStorage.setItem(SWAP_MODE_KEY, SWAP_MODE.LIMIT);
        }}
      >
        <FormattedMessage id="limit_order" defaultMessage="Limit Order" />

        {swapMode === SWAP_MODE.LIMIT && (
          <div className="w-full mt-1 rounded-full h-1 bg-gradientFrom"></div>
        )}
      </span>
    </div>
  );
};

function getAllTokens(refTokens: TokenMetadata[], triTokens: TokenMetadata[]) {
  triTokens.forEach((tk) => {
    const tokenInRef = refTokens.find((token) => token.id === tk.id);
    if (tokenInRef) {
      tokenInRef.onTri = true;
    } else {
      refTokens.push(tk);
    }
  });

  return refTokens;
}

function SwapPage() {
  const [tokenInAmount, setTokenInAmount] = useState<string>('1');

  const triTokenIds = useTriTokenIdsOnRef();

  const isMobile = useClientMobile();

  const refTokens = useWhitelistTokens((triTokenIds || []).concat(['aurora']));

  const triTokens = useTriTokens();

  const storageTab = localStorage
    .getItem(REF_FI_SWAP_SWAPPAGE_TAB_KEY)
    ?.toString();

  const [swapTab, setSwapTab] = useState<string>(storageTab || 'normal');

  const storageMode = localStorage.getItem(SWAP_MODE_KEY) as SWAP_MODE | null;

  const [swapMode, setSwapMode] = useState<SWAP_MODE>(
    storageMode || SWAP_MODE.NORMAL
  );

  const stablePools = useAllStablePools();

  useEffect(() => {
    if (storageTab) setSwapTab(storageTab);
  }, [storageTab]);

  useEffect(() => {
    if (storageMode) setSwapMode(storageMode);
  }, [storageMode]);

  const reserveTypeStorageKey = 'REF_FI_RESERVE_TYPE';

  const [reservesType, setReservesType] = useState<STABLE_POOL_TYPE>(
    STABLE_POOL_TYPE[localStorage.getItem(reserveTypeStorageKey)] ||
      STABLE_POOL_TYPE.USD
  );

  if (!refTokens || !triTokens || !triTokenIds || !stablePools)
    return <Loading />;

  refTokens.forEach((token) => {
    if (token.id === WRAP_NEAR_CONTRACT_ID) {
      token.icon = nearMetadata.icon;
      token.symbol = 'NEAR';
    }
  });

  const allTokens = getAllTokens(refTokens, triTokens);

  const nearSwapTokens = allTokens.filter((token) => token.onRef);

  // asset to ref
  const crossSwapTokens = allTokens.filter(
    (token) => token.onTri || token.onRef
  );

  return (
    <div className="swap">
      <section
        className={`lg:w-560px md:w-5/6 xs:w-11/12  m-auto relative  ${
          isMobile ? '' : 'gradientBorderWrapper'
        } `}
      >
        {swapMode === SWAP_MODE.X_SWAP ? (
          <CrossSwapCard
            allTokens={crossSwapTokens}
            tokenInAmount={tokenInAmount}
            setTokenInAmount={setTokenInAmount}
            swapTab={
              <ChangeSwapMode swapMode={swapMode} setSwapMode={setSwapMode} />
            }
          />
        ) : (
          <SwapCard
            allTokens={nearSwapTokens}
            swapMode={swapMode}
            stablePools={stablePools}
            tokenInAmount={tokenInAmount}
            setTokenInAmount={setTokenInAmount}
            reservesType={reservesType}
            setReservesType={setReservesType}
            swapTab={
              <ChangeSwapMode swapMode={swapMode} setSwapMode={setSwapMode} />
            }
            stableReserves={
              swapMode === SWAP_MODE.STABLE ? (
                <TokenReserves
                  tokens={AllStableTokenIds.map((id) =>
                    allTokens.find((token) => token.id === id)
                  ).filter((token) => isStableToken(token.id))}
                  pools={stablePools}
                  type={reservesType}
                  setType={setReservesType}
                  swapPage
                />
              ) : null
            }
          />
        )}
      </section>
      <div className="flex items-center justify-center mt-4">
        <span className="text-sm text-primaryText mr-1.5">Try out by</span>
        <div
          onClick={() => {
            setSwapTab('cross');
          }}
          className="rounded-md border border-laguageBorderColor text-sm text-primaryText px-1.5 py-1 cursor-pointer"
        >
          Cross-chain Swap
        </div>
      </div>
    </div>
  );
}

export default SwapPage;
