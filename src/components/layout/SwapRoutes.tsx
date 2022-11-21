import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TokenMetadata, ftGetTokenMetadata } from '~services/ft-contract';
import {
  calculateFeePercent,
  toPrecision,
  divide,
  calculateExchangeRate,
} from '../../utils/numbers';
import { toRealSymbol } from '~utils/token';
import { EstimateSwapView } from '../../services/stable-swap';
import {
  getPoolAllocationPercents,
  percent,
  percentOf,
  convertToPercentDecimal,
} from '../../utils/numbers';
import { Pool } from '../../services/pool';
import { FaAngleUp, FaAngleDown, FaExchangeAlt } from 'react-icons/fa';
import { Card } from '../card/Card';
import { ArrowDownWhite } from '../icon/Arrows';
import { RefSwapPro } from '../icon/CrossSwapIcons';
import _, { result } from 'lodash';
//@ts-ignore
import { getExpectedOutputFromActionsORIG } from '../../services/smartRouteLogic';
import {
  RefIcon,
  RefIconLarge,
  TriIcon,
  NEARICONDEX,
  TriIconLarge,
  AURORAICONDEX,
} from '../icon/DexIcon';
import {
  percentLess,
  separateRoutes,
  ONLY_ZEROS,
  scientificNotationToString,
} from '../../utils/numbers';
import Big from 'big.js';
import { useTokenPriceList } from '~state/token';

export const RouterIcon = () => {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      <path
        d="M13.4862 6.25488C12.2813 6.25488 11.2485 7.10159 11.019 8.28698H6.02703L4.7647 7.21448C4.93684 6.8758 5.05159 6.48067 5.10897 6.0291C5.10897 5.52107 4.93684 4.9566 4.59257 4.56147L6.02703 3.1503H11.0763C11.478 4.44858 12.8551 5.23884 14.1748 4.84371C15.4945 4.44858 16.2978 3.09385 15.8961 1.79557C15.4945 0.497295 14.1174 -0.292963 12.7977 0.102166C11.937 0.327954 11.3059 1.00532 11.0763 1.79557H5.51062L3.50237 3.77122C3.21548 3.65832 2.92859 3.60188 2.58432 3.60188C1.20723 3.54543 0.0596573 4.61792 0.00227872 5.97265C-0.0550999 7.32738 0.977715 8.45632 2.3548 8.51276H2.58432C3.04334 8.51276 3.44499 8.39987 3.84664 8.17408L5.568 9.6417H11.1911C11.7075 10.8835 13.142 11.5045 14.4043 11.0529C15.6666 10.5449 16.2978 9.13368 15.8388 7.89185C15.4371 6.8758 14.5191 6.25488 13.4862 6.25488V6.25488ZM13.4862 1.344C14.1174 1.344 14.6338 1.85202 14.6338 2.47294C14.6338 3.09385 14.1174 3.60188 13.4862 3.60188C12.8551 3.60188 12.3387 3.09385 12.3387 2.47294C12.3387 1.85202 12.8551 1.344 13.4862 1.344ZM2.58432 7.15804C1.95315 7.15804 1.43674 6.65001 1.43674 6.0291C1.43674 5.40818 1.95315 4.90016 2.58432 4.90016C3.21548 4.90016 3.73189 5.40818 3.73189 6.0291C3.73189 6.65001 3.21548 7.15804 2.58432 7.15804ZM13.4862 9.86749C12.8551 9.86749 12.3387 9.35947 12.3387 8.73855C12.3387 8.11763 12.8551 7.60961 13.4862 7.60961C14.1174 7.60961 14.6338 8.11763 14.6338 8.73855C14.6338 9.35947 14.1174 9.86749 13.4862 9.86749Z"
        fill="url(#paint0_linear_12461_2312)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_12461_2312"
          x1="8"
          y1="0"
          x2="8"
          y2="11.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00C6A2" />
          <stop offset="1" stopColor="#8C78FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const AutoRouterText = () => {
  return (
    <span className="from-greenColor to-purple bg-gradient-to-r valueStyle">
      <FormattedMessage id="auto_router" defaultMessage="Auto Router" />
    </span>
  );
};

export const ArrowRight = () => {
  return (
    <div className="mx-1">
      <svg
        width="12"
        height="5"
        viewBox="0 0 12 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.864 4.4C9.024 4.05867 9.17867 3.76 9.328 3.504C9.488 3.248 9.64267 3.03467 9.792 2.864H0.464V2.192H9.792C9.64267 2.01067 9.488 1.792 9.328 1.536C9.17867 1.28 9.024 0.986666 8.864 0.656H9.424C10.096 1.43467 10.8 2.01067 11.536 2.384V2.672C10.8 3.03467 10.096 3.61067 9.424 4.4H8.864Z"
          fill="#7E8A93"
        />
      </svg>
    </div>
  );
};

export const Icon = ({
  token,
  size,
}: {
  token: TokenMetadata;
  size?: string;
}) => {
  const imgSize = size || '4';

  if (token.icon) {
    return (
      <img
        src={token.icon}
        className={`w-${imgSize} h-${imgSize}  rounded-full border border-gradientFromHover flex-shrink-0`}
        alt=""
      />
    );
  } else {
    return (
      <div
        className={`w-${imgSize}  h-${imgSize}   rounded-full border bg-cardBg border-gradientFromHover flex-shrink-0	`}
      />
    );
  }
};

export const CrossIcon = ({
  Icon,
  poolId,
}: {
  Icon: JSX.Element;
  poolId?: number | string;
}) => {
  return typeof poolId === 'number' && Number(poolId) >= 0 ? (
    <div className="h-4 relative rounded-xl bg-black bg-opacity-20 pl-2 pr-6 py-0.5 flex items-center">
      <span
        className="opacity-50"
        style={{
          fontSize: '10px',
        }}
      >
        #{poolId}
      </span>
      <div
        className="absolute  right-0 flex-shrink-0"
        style={{
          top: '-2px',
        }}
      >
        {Icon}
      </div>
    </div>
  ) : (
    <div className="flex-shrink-0">{Icon}</div>
  );
};

export const ParaTokenFrom = ({
  tokenIn,
  p,
}: {
  tokenIn: TokenMetadata;
  p: string;
}) => {
  return (
    <div
      className="rounded-md py-1 pl-2 pr-1 flex items-center relative justify-between "
      style={{
        width: '60px',
      }}
    >
      <span className="text-xs text-left text-gray-400 pr-0.5 ">{p}%</span>
      <span className="">
        <Icon token={tokenIn} />
      </span>
    </div>
  );
};

export const PoolInfo = ({ poolId, fee }: { poolId: number; fee: number }) => {
  return (
    <div
      className=" items-center bg-inputDarkBg px-1 text-gray-400 rounded-md grid grid-cols-2 w-32"
      style={{
        paddingTop: '3px',
        paddingBottom: '3px',
        height: '24px',
      }}
    >
      <div className="bg-acccountBlock text-xs font-semibold rounded pl-1.5 pr-1.5 col-span-1 text-left	h-full flex items-center">
        <div>{`# ${poolId}`}</div>
      </div>
      <span className="col-span-1 text-center">
        {toPrecision(calculateFeePercent(fee).toString(), 2)}%
      </span>
    </div>
  );
};

export const OneParallelRoute = ({
  p,
  tokenIn,
  tokenOut,
  poolId,
  fee,
}: {
  p: string;
  tokenIn: TokenMetadata;
  tokenOut: TokenMetadata;
  poolId: number;
  fee: number;
}) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="col-end-3 col-start-1">
        <ParaTokenFrom tokenIn={tokenIn} p={p} />
      </div>
      <ArrowRight />
      <div className="col-end-9 col-span-4 ml-0.5">
        <PoolInfo poolId={poolId} fee={fee} />
      </div>
      <ArrowRight />
      <div className="col-end-12">
        <Icon token={tokenOut} />
      </div>
    </div>
  );
};

export const SmartRouteV2 = ({
  tokens,
  p,
  pools,
}: {
  tokens: TokenMetadata[];
  p: string;
  pools: Pool[];
}) => {
  const Hub = ({
    token,
    poolId,
    Dex,
  }: {
    token: TokenMetadata;
    poolId: number;
    Dex: string;
  }) => {
    const onTri = Dex && Dex === 'tri';

    return (
      <div
        className={`flex items-center ${
          onTri ? 'bg-transparent justify-end' : 'bg-inputDarkBg'
        }  rounded-2xl pr-1 flex-shrink-0`}
        style={{
          width: '72px',
          height: '22px',
        }}
      >
        <div
          className={`w-full flex items-center justify-start pl-2 ${
            onTri ? 'hidden' : 'block'
          }`}
        >
          <span className="text-gray-400">{`#${poolId}`}</span>
        </div>
        <Icon token={token} />
      </div>
    );
  };

  if (tokens.length == 3) {
    return (
      <div className="text-white flex items-center justify-between">
        {/* <Hub token={tokens[0]} /> */}

        <ParaTokenFrom tokenIn={tokens[0]} p={p} />
        <div className="px-3">
          <ArrowRight />
        </div>

        <Hub token={tokens[1]} poolId={pools?.[0]?.id} Dex={pools?.[0]?.Dex} />
        <div className="px-3">
          <ArrowRight />
        </div>

        <Hub token={tokens[2]} poolId={pools?.[1]?.id} Dex={pools?.[0]?.Dex} />
      </div>
    );
  } else if (tokens.length == 2) {
    return (
      <div className="text-white flex items-center justify-between">
        <ParaTokenFrom tokenIn={tokens[0]} p={p} />
        <div className="px-3">
          <ArrowRight />
        </div>
        <Hub token={tokens[1]} poolId={pools?.[0]?.id} Dex={pools?.[0]?.Dex} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export const PoolName = ({
  dex,
  translate,
}: {
  dex: string;
  translate: string;
}) => {
  return (
    <span
      style={{
        position: 'relative',
        fontSize: '10px',
        opacity: '0.5',
        right: `${Number(dex === 'tri' ? 0 : 10) + Number(translate)}px`,
      }}
    >
      {dex === 'tri' ? 'Trisolaris' : 'Ref'}
    </span>
  );
};

const ExchangeIcon = () => {
  return (
    <svg
      width="10"
      height="8"
      viewBox="0 0 10 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.28537 7.33333V8L2.85339 6.66667L4.28537 5.33333V6H6.42799C6.87702 6.0001 7.31474 5.86851 7.67931 5.62382C8.04389 5.37914 8.31689 5.03372 8.45976 4.63636C8.60263 4.239 8.60815 3.80978 8.47554 3.40933C8.34293 3.00889 8.07888 2.65745 7.7207 2.40467L7.72856 2.39533L8.73559 1.45533C9.29415 1.89649 9.69406 2.48715 9.88121 3.1474C10.0684 3.80766 10.0337 4.50565 9.78196 5.14692C9.5302 5.7882 9.0735 6.34181 8.47362 6.73286C7.87375 7.12391 7.15967 7.33352 6.42799 7.33333L4.28466 7.334L4.28537 7.33333ZM5.71378 0.666667V0L7.17576 1.33333L5.71378 2.66667V2H3.57117C3.12207 2 2.68433 2.13171 2.31979 2.37654C1.95525 2.62136 1.68234 2.96692 1.53961 3.36438C1.39689 3.76185 1.39157 4.19112 1.5244 4.59157C1.65723 4.99201 1.92151 5.34337 2.27988 5.596L1.26357 6.544C0.705275 6.10279 0.305614 5.51218 0.118631 4.85204C-0.0683515 4.1919 -0.0336347 3.49409 0.218087 2.85296C0.469808 2.21184 0.926389 1.65835 1.52608 1.26733C2.12578 0.876314 2.83965 0.666641 3.57117 0.666667H5.71378Z"
        fill="#7E8A93"
      />
    </svg>
  );
};

const BestIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="9" fill="#00C6A2" />
      <path
        d="M3.91844 7.81449L3.91309 12.7226C3.91309 13.0199 4.18742 13.3041 4.68869 13.3041H6.25366H6.32856H6.39426H6.45769V7.04346H4.691C4.20195 7.05339 3.91844 7.52105 3.91844 7.81449Z"
        fill="#1C272E"
      />
      <path
        d="M13.4936 6.26174L11.7315 6.26097C12.9755 2.14678 10.6434 2.34928 10.6434 2.34928C9.80356 2.34928 9.38404 3.06834 9.38404 3.91273C9.38099 3.88752 9.38176 3.91349 9.38328 3.92266C9.33819 5.27825 7.65707 6.73779 6.89062 6.99835V13.3041H12.7111C13.6036 13.3041 13.897 12.5216 13.897 12.5216C14.4052 11.3074 15.0356 8.52513 15.0501 8.36697C15.2374 6.34807 13.4936 6.26174 13.4936 6.26174Z"
        fill="#1C272E"
      />
    </svg>
  );
};

export function SwapRateDetail({
  value,
  from,
  to,
  tokenIn,
  tokenOut,
  isRevert,
  setIsRevert,
  tokenPriceList,
}: {
  value: string | JSX.Element;
  from: string;
  to: string;
  tokenIn: TokenMetadata;
  tokenOut: TokenMetadata;
  tokenPriceList: any;
  isRevert?: boolean;
  setIsRevert?: any;
}) {
  const [newValue, setNewValue] = useState<string | JSX.Element>(value);

  const exchangeRageValue = useMemo(() => {
    const fromNow = isRevert ? to : from;
    const toNow = isRevert ? from : to;
    if (ONLY_ZEROS.test(fromNow)) return '-';

    const value = calculateExchangeRate(0, fromNow, toNow);

    return Number(value) < 0.001 ? '< 0.0001' : value;
  }, [isRevert, to]);

  useEffect(() => {
    const curPrice = isRevert
      ? tokenPriceList?.[tokenOut?.id]?.price
      : tokenPriceList?.[tokenIn?.id]?.price;

    setNewValue(
      <span>
        {`1 ${toRealSymbol(isRevert ? tokenOut.symbol : tokenIn.symbol)} `}{' '}
        {!!curPrice ? (
          <span className="text-primaryText">
            (${toPrecision(curPrice, 2)})
          </span>
        ) : null}{' '}
        ={' '}
        {`${exchangeRageValue} ${toRealSymbol(
          isRevert ? tokenIn.symbol : tokenOut.symbol
        )}`}
      </span>
    );
  }, [isRevert.toString()]);

  function switchSwapRate() {
    setIsRevert(!isRevert);
  }

  return (
    <div
      className="flex items-center cursor-pointer justify-end text-white "
      onClick={switchSwapRate}
    >
      <span className="font-sans text-xs">{newValue}</span>

      <span className="ml-2" style={{ marginTop: '0.1rem' }}>
        <ExchangeIcon />
      </span>
    </div>
  );
}

export const CrossSwapRoute = ({
  route,
  p,
}: {
  route: EstimateSwapView[];
  p: string;
}) => {
  return (
    <div className="flex items-center text-xs text-white">
      <span className="text-right mr-2 w-8">{p}%</span>

      {route.length === 1 ? (
        <div
          className={`w-full h-4 flex items-center rounded-xl justify-between relative ${
            route[0].pool?.Dex === 'tri'
              ? 'bg-triPool bg-opacity-20'
              : 'bg-refPool bg-opacity-20'
          }`}
        >
          <Icon token={route[0].tokens[0]} size={'5'} />
          <div
            style={{
              fontSize: '10px',
              opacity: '0.5',
            }}
          >
            {route[0].pool?.Dex === 'tri' ? 'Trisolaris' : 'Ref'}
          </div>

          <CrossIcon
            Icon={<Icon token={route[0].tokens[1]} size={'5'} />}
            poolId={route[0]?.pool?.id}
          />
        </div>
      ) : (
        <div className="flex w-full items-center justify-between relative">
          <div className="absolute">
            <Icon token={route[0].tokens[0]} size="5" />
          </div>
          <div
            className={`w-full flex items-center justify-center rounded-l-xl ${
              route[0].pool?.Dex === 'tri'
                ? 'bg-triPool bg-opacity-20'
                : 'bg-refPool bg-opacity-20'
            }`}
          >
            <PoolName dex={route[0].pool?.Dex} translate="0" />
          </div>

          <div
            className="absolute"
            style={{
              right: '120px',
            }}
          >
            <CrossIcon
              Icon={<Icon token={route[0].tokens[1]} size="5" />}
              poolId={route[0]?.pool?.id}
            />
          </div>

          <div
            className={`w-full flex items-center justify-center rounded-r-xl ${
              route[1].pool?.Dex === 'tri'
                ? 'bg-triPool bg-opacity-20'
                : 'bg-refPool bg-opacity-20'
            }`}
          >
            <PoolName dex={route[1].pool?.Dex} translate="15" />
          </div>

          <div className="absolute right-0">
            <CrossIcon
              Icon={<Icon token={route[0].tokens[2]} size="5" />}
              poolId={route[1]?.pool?.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const REF_FI_SHOW_ALL_RESULTS = 'REF_FI_SHOW_ALL_RESULTS_VALUE';

export const CrossSwapAllResult = ({
  refTodos,
  triTodos,
  tokenInAmount,
  tokenOutId,
  slippageTolerance,
  tokenOut,
  LoadingRefresh,
  selectTodos,
  setSelectTodos,
  tokenIn,
  setSelectReceive,
  tokenPriceList,
}: {
  refTodos: EstimateSwapView[];
  triTodos: EstimateSwapView[];
  tokenInAmount: string;
  tokenOutId: string;
  slippageTolerance: number;
  tokenOut: TokenMetadata;
  LoadingRefresh: JSX.Element;
  selectTodos: EstimateSwapView[];
  setSelectTodos: (todos: EstimateSwapView[]) => void;
  tokenIn: TokenMetadata;
  tokenPriceList: any;
  setSelectReceive?: any;
}) => {
  const results = [refTodos, triTodos].filter(
    (r) => !!r && !!r[0] && !!r[0].estimate
  );

  const [isRevert, setIsRevert] = useState<boolean>(true);

  const [bestReceiveIndex, setBestReceiveIndex] = useState(-1);
  const [showAllResult, setShowAllResult] = useState<boolean>(
    sessionStorage.getItem(REF_FI_SHOW_ALL_RESULTS) === 'true' || false
  );

  const receives = results.map((result) => {
    if (
      result?.every((r) => r.pool?.Dex === 'tri') ||
      (result?.every((r) => r.pool?.Dex === 'ref' || !r?.pool) &&
        result.length === 1)
    ) {
      return result[result.length - 1].estimate;
    } else {
      return getExpectedOutputFromActionsORIG(result, tokenOut.id).toString();
    }
  });
  const bestReceived = _.maxBy(receives, (o) => Number(o));

  useEffect(() => {
    sessionStorage.setItem(REF_FI_SHOW_ALL_RESULTS, showAllResult.toString());
  }, [showAllResult]);

  const OneResult = ({
    Type,
    rate,
    Diff,
    rawRate,
    rateTitle,
    index,
  }: {
    Type: JSX.Element;
    rate: string;
    rawRate: string;
    Diff: JSX.Element | string;
    rateTitle?: string;
    index: number;
  }) => {
    return (
      <div
        className={`w-full hover:bg-black cursor-pointer mb-2 hover:bg-opacity-10 grid items-center grid-cols-10 px-4 justify-between py-2.5 relative ${
          bestReceiveIndex === index
            ? 'border border-gradientFrom rounded-md'
            : 'border border-transparent'
        }`}
        onClick={() => {
          setBestReceiveIndex(index);
        }}
      >
        <span className="col-span-1">{Type}</span>

        <span className="col-span-4  relative left-3">{rawRate}</span>

        <div
          className="justify-self-center col-span-4 relative px-4"
          title={rateTitle}
        >
          {rate}
        </div>

        <span className=" text-right relative right-3 justify-self-end col-span-1">
          {Diff}
        </span>
      </div>
    );
  };

  const diffs = receives.map((r) => {
    if (r === bestReceived) {
      return '0';
    }
    return percent(
      new Big(bestReceived).minus(new Big(r)).toString(),
      bestReceived
    ).toString();
  });

  const Icons = [
    <div className="relative mr-2">
      <RefIconLarge />
      <NEARICONDEX />
    </div>,
    <div className="relative mr-2">
      <TriIconLarge />
      <AURORAICONDEX />
    </div>,
  ];

  const SelectRate = () => {
    const from = tokenInAmount;
    let to: string = '0';

    if (!selectTodos) return null;

    if (
      selectTodos?.every((r) => r.pool?.Dex === 'tri') ||
      (selectTodos?.every((r) => r.pool?.Dex === 'ref' || !r?.pool) &&
        selectTodos.length === 1)
    ) {
      to = selectTodos[selectTodos.length - 1].estimate;
    } else {
      to = getExpectedOutputFromActionsORIG(
        selectTodos,
        tokenOut.id
      ).toString();
    }

    const exchangeRateValue = useMemo(() => {
      if (!from || ONLY_ZEROS.test(to)) return '-';
      else {
        const value = calculateExchangeRate(0, to, from);
        return Number(value) < 0.001 ? '< 0.001' : value;
      }
    }, [to]);

    const curPrice = tokenPriceList?.[tokenOut?.id]?.price;

    return (
      <SwapRateDetail
        value={
          <span>
            {`1 ${toRealSymbol(tokenOut.symbol)} `}{' '}
            {!!curPrice ? (
              <span className="text-primaryText">
                (${toPrecision(curPrice, 2)})
              </span>
            ) : null}{' '}
            = {`${exchangeRateValue} ${toRealSymbol(tokenIn.symbol)}`}
          </span>
        }
        isRevert={isRevert}
        setIsRevert={setIsRevert}
        from={from}
        to={to}
        tokenPriceList={tokenPriceList}
        tokenIn={tokenIn}
        tokenOut={tokenOut}
      />
    );
  };
  const displayResults = results
    .map((result, i) => {
      const calRawRate = new Big(receives[i] || '0').div(tokenInAmount || '1');

      return {
        type: Icons[i],
        rate: percentLess(slippageTolerance, receives[i]),
        receive: receives[i],
        result,
        rawRate:
          (Number(calRawRate) < 0.001
            ? '< 0.001'
            : toPrecision(
                scientificNotationToString(calRawRate.toString()),
                3
              )) +
          ` ${toRealSymbol(tokenOut.symbol)}/${toRealSymbol(tokenIn.symbol)}`,
        diff: diffs[i],
        rateTitle: toPrecision(
          percentLess(slippageTolerance, receives[i]),
          tokenOut.decimals
        ),
      };
    })
    .filter((_) => !!_)
    .sort((a, b) => {
      if (new Big(a.rate).gt(new Big(b.rate))) return -1;
      return 1;
    });

  useEffect(() => {
    if (bestReceiveIndex >= 0) {
      setSelectTodos(displayResults[bestReceiveIndex].result);
      setSelectReceive(displayResults[bestReceiveIndex].receive);
    }
  }, [bestReceiveIndex, bestReceived]);

  useEffect(() => {
    console.log({
      bestReceived,
    });

    const bestReceiveIndex = displayResults
      .map((_) => _.receive)
      .findIndex((r) => r === bestReceived);
    setBestReceiveIndex(bestReceiveIndex);
  }, [bestReceived]);

  if (!results || results.length === 0) return null;

  return (
    <section className={`w-full relative my-4 mt-6`}>
      <div
        className={`z-50 px-4 pb-1 pt-3 justify-between rounded-lg text-sm text-white mx-auto relative bottom-1 flex items-center  bg-cardBg `}
        style={{
          border: `1.2px solid #304352`,
        }}
      >
        {bestReceiveIndex === 0 && (
          <div className="absolute left-4 -top-3 bg-gradientFrom rounded-md px-2 py-0.5 text-black">
            <FormattedMessage id="optimal" defaultMessage={'Optimal'} />
          </div>
        )}

        <div className="items-center flex bg-transparent">
          {LoadingRefresh}

          <SelectRate />
        </div>

        <span
          className="flex items-center cursor-pointer justify-center"
          onClick={() => {
            setShowAllResult(!showAllResult);
          }}
        >
          <span className="my-2">
            <FormattedMessage id="all_results" defaultMessage="All Results" />
          </span>
          <span className="ml-1">
            {showAllResult ? (
              <FaAngleUp size={18} />
            ) : (
              <FaAngleDown size={18} />
            )}
          </span>
        </span>
      </div>
      <Card
        padding="pt-4 "
        className={
          showAllResult ? 'z-50 text-sm text-white absolute top-14 ' : 'hidden'
        }
        style={{
          border: `1.2px solid #304352`,
        }}
        width="w-full"
        rounded="rounded-lg"
      >
        <div className="text-primaryText px-4 grid grid-cols-10 mb-2">
          <span className="col-span-1 ">
            <FormattedMessage id="dex" defaultMessage="DEX" />
          </span>

          <span className="col-span-4 relative left-3">
            <FormattedMessage id="rate" defaultMessage="Rate" />
          </span>
          <span className="col-span-4">
            <FormattedMessage
              id="minimum_received"
              defaultMessage="Minimum Received"
            />
          </span>
          <span className="relative right-2 text-right col-span-1">
            <FormattedMessage id="diff" defaultMessage="Diff" />
          </span>
        </div>
        {displayResults?.map((result, i) => {
          return (
            <OneResult
              key={i + result.rate}
              index={i}
              Type={result.type}
              rate={toPrecision(result.rate, 6)}
              rateTitle={result.rateTitle}
              rawRate={result.rawRate}
              Diff={
                Number(result.diff) === 0 ? (
                  <BestIcon />
                ) : (
                  `-${toPrecision(result.diff, 2)}%`
                )
              }
            />
          );
        })}
      </Card>
    </section>
  );
};
