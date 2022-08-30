import React, { useEffect, useMemo, useState } from 'react';
import { wallet } from '../../services/near';
import {
  toRoundedReadableNumber,
  percentOfBigNumber,
  toReadableNumber,
} from '../../utils/numbers';
import { TokenMetadata } from '../../services/ft-contract';
import { TokenBalancesView } from '../../services/token';
import Icon from '../tokens/Icon';
import InputAmount from './InputAmount';
import { tokenPrice } from './SelectToken';
import {
  toInternationalCurrencySystem,
  toInternationalCurrencySystemLongString,
} from '../../utils/numbers';
import SelectToken, { StableSelectToken } from './SelectToken';
import { toPrecision, multiply, ONLY_ZEROS } from '../../utils/numbers';
import { FormattedMessage } from 'react-intl';
import { SmallWallet } from '../../components/icon/SmallWallet';
import { RefIcon } from '../../components/icon/Common';
import { currentTokensPrice } from '../../services/api';
import { IconLeft, IconLeftV3 } from '../tokens/Icon';
import { toRealSymbol } from '../../utils/token';
import { ArrowDownGreen, ArrowDownWhite } from '../icon/Arrows';
import { percentLess } from '../../utils/numbers';
import { isMobile } from '../../utils/device';
import { SWAP_MODE } from '../../pages/SwapPage';
import { WRAP_NEAR_CONTRACT_ID } from '../../services/wrap-near';
import { InputAmountV3 } from './InputAmount';

interface TokenAmountProps {
  amount?: string;
  max?: string;
  total?: string;
  tokens?: TokenMetadata[];
  showSelectToken?: boolean;
  selectedToken: TokenMetadata;
  balances?: TokenBalancesView;
  onMax?: (input: HTMLInputElement) => void;
  onSelectToken?: (token: TokenMetadata) => void;
  onSearchToken?: (value: string) => void;
  onChangeAmount?: (amount: string) => void;
  text?: string;
  disabled?: boolean;
  useNearBalance?: boolean;
  forSwap?: boolean;
  isError?: boolean;
  tokenPriceList?: Record<string, any>;
  swapMode?: SWAP_MODE;
  preSelected?: TokenMetadata;
  postSelected?: TokenMetadata;
  onSelectPost?: (token: TokenMetadata) => void;
  forWrap?: boolean;
  showQuickButton?: Boolean;
  ExtraElement?: JSX.Element;
  forLimitOrder?: boolean;
  marketPriceLimitOrder?: string;
  limitOrderDisable?: boolean;
  curRate?: string;
  onChangeRate?: (rate: string) => void;
}

export function HalfAndMaxAmount({
  max,
  onChangeAmount,
  token,
  forCrossSwap,
  amount,
}: {
  max: string;
  token: TokenMetadata;
  onChangeAmount: (amount: string) => void;
  forCrossSwap?: boolean;
  amount?: string;
}) {
  const halfValue = percentOfBigNumber(50, max, token?.decimals);

  return (
    <div className="flex items-center">
      <span
        className={`px-2 py-1 hover:bg-black hover:bg-opacity-20 cursor-pointer ${'hover:text-gradientFrom'}  rounded-3xl ${
          amount === halfValue && !ONLY_ZEROS.test(halfValue)
            ? 'text-gradientFrom'
            : 'text-primaryText'
        } text-xs`}
        onClick={() => {
          const half = percentOfBigNumber(50, max, token.decimals);

          onChangeAmount(half);
        }}
      >
        <FormattedMessage id="half" defaultMessage="Half" />
      </span>

      <span
        className={`px-2 py-1 hover:bg-black hover:bg-opacity-20 cursor-pointer rounded-3xl ${'hover:text-gradientFrom'} ${
          amount === max && !ONLY_ZEROS.test(max)
            ? 'text-gradientFrom'
            : 'text-primaryText'
        } text-xs`}
        onClick={() => {
          onChangeAmount(max);
        }}
      >
        <FormattedMessage id="max" defaultMessage="Max" />
      </span>
    </div>
  );
}

export function HalfAndMaxAmountV3({
  max,
  onChangeAmount,
  token,
  forCrossSwap,
  amount,
}: {
  max: string;
  token: TokenMetadata;
  onChangeAmount: (amount: string) => void;
  forCrossSwap?: boolean;
  amount?: string;
}) {
  const halfValue = percentOfBigNumber(50, max, token?.decimals);

  return (
    <div className="flex items-center">
      <span
        className={`px-2 py-1 mr-2 cursor-pointer rounded-lg text-primaryText hover:text-gradientFrom ${
          amount === halfValue && !ONLY_ZEROS.test(halfValue)
            ? ' bg-black bg-opacity-20 border border-transparent'
            : ' border border-primaryText border-opacity-20 hover:border-gradientFrom '
        } text-xs`}
        onClick={() => {
          const half = percentOfBigNumber(50, max, token.decimals);

          onChangeAmount(half);
        }}
      >
        <FormattedMessage id="half" defaultMessage="Half" />
      </span>

      <span
        className={`px-2 py-1 cursor-pointer rounded-lg text-primaryText hover:text-gradientFrom ${
          amount === max && !ONLY_ZEROS.test(max)
            ? ' bg-black bg-opacity-20 border border-transparent'
            : 'border border-primaryText border-opacity-20 hover:border-gradientFrom '
        } text-xs`}
        onClick={() => {
          onChangeAmount(max);
        }}
      >
        <FormattedMessage id="max" defaultMessage="Max" />
      </span>
    </div>
  );
}

export function QuickAmountLimitOrder({
  max,
  onChangeAmount,
  marketPrice,
  amount,
}: {
  max: string;
  amount?: string;
  onChangeAmount: (amount: string) => void;
  marketPrice: string;
}) {
  const plus5 = percentOfBigNumber(105, max, 6);
  const plus10 = percentOfBigNumber(110, max, 6);

  console.log(plus10, amount, 'amount check for quick');

  return (
    <div className="flex items-center">
      <span
        className={`px-2 py-1 mr-2 cursor-pointer rounded-xl  ${
          Number(amount) === Number(plus5)
            ? 'text-gradientFrom  border border-gradientFrom'
            : 'text-primaryText border border-primaryText border-opacity-20 hover:border hover:border-transparent hover:text-gradientFrom hover:border-gradientFrom'
        } text-xs`}
        onClick={() => {
          onChangeAmount(plus5);
        }}
      >
        +5%
      </span>

      <span
        className={`px-2 py-1 cursor-pointer rounded-xl mr-2  ${
          Number(amount) === Number(plus10)
            ? 'text-gradientFrom  border border-gradientFrom'
            : 'text-primaryText border border-primaryText border-opacity-20 hover:border hover:border-transparent hover:text-gradientFrom hover:border-gradientFrom'
        } text-xs`}
        onClick={() => {
          onChangeAmount(plus10);
        }}
      >
        +10%
      </span>

      <span
        className={`text-xs px-2 py-1 rounded-xl whitespace-nowrap cursor-pointer
        ${
          Number(amount) === Number(max)
            ? 'text-v3Blue bg-v3Blue bg-opacity-10 border border-transparent'
            : 'text-primaryText border border-primaryText border-opacity-20 hover:border hover:border-transparent hover:text-v3Blue hover:bg-v3Blue hover:bg-opacity-10'
        }
        
        `}
        onClick={() => {
          onChangeAmount(marketPrice);
        }}
      >
        <FormattedMessage id="market_price" defaultMessage={'Market Price'} />
      </span>
    </div>
  );
}

export default function TokenAmount({
  amount,
  max,
  total,
  tokens,
  selectedToken,
  balances,
  onSelectToken,
  onSearchToken,
  onChangeAmount,
  text,
  showSelectToken = true,
  disabled = false,
  useNearBalance,
  forSwap,
  isError,
  tokenPriceList,
  swapMode,
  preSelected,
  postSelected,
  onSelectPost,
  forWrap,
}: TokenAmountProps) {
  const render = (token: TokenMetadata) =>
    toRoundedReadableNumber({
      decimals: token.decimals,
      number: balances ? balances[token.id] : '0',
    });

  const [hoverSelectToken, setHoverSelectToken] = useState<boolean>(false);

  const tokenPrice = tokenPriceList?.[selectedToken?.id]?.price || null;

  console.log(tokenPrice, 'token price');

  const curMax =
    selectedToken?.id === WRAP_NEAR_CONTRACT_ID && !forWrap
      ? Number(max) <= 0.5
        ? '0'
        : String(Number(max) - 0.5)
      : max;

  return (
    <>
      <div
        className={`flex items-center ${
          forSwap ? 'justify-between pl-2' : 'justify-end'
        } text-xs font-semibold pb-0.5 w-3/5 ${forSwap ? 'xs:w-full' : ''} `}
      >
        <span className="text-primaryText">
          <FormattedMessage id="balance" defaultMessage="Balance" />
          :&nbsp;
          <span title={total}>{toPrecision(total, 3, true)}</span>
        </span>
        {forSwap && onChangeAmount ? (
          <HalfAndMaxAmount
            token={selectedToken}
            max={curMax}
            onChangeAmount={onChangeAmount}
            amount={amount}
          />
        ) : null}
      </div>
      <fieldset className="relative flex  align-center my-2">
        <InputAmount
          className="w-3/5 border border-transparent rounded"
          id="inputAmount"
          name={selectedToken?.id}
          max={onChangeAmount ? curMax : null}
          value={amount}
          onChangeAmount={onChangeAmount}
          disabled={disabled}
          forSwap={!!forSwap}
          price={
            tokenPrice && !ONLY_ZEROS.test(amount) && !isError
              ? multiply(tokenPrice, amount)
              : null
          }
        />
        {showSelectToken &&
          (!swapMode || swapMode === SWAP_MODE.NORMAL ? (
            <SelectToken
              tokenPriceList={tokenPriceList}
              tokens={tokens}
              render={render}
              selected={
                selectedToken && (
                  <div
                    className="flex items-center justify-end font-semibold "
                    onMouseEnter={() => setHoverSelectToken(true)}
                    onMouseLeave={() => setHoverSelectToken(false)}
                  >
                    <Icon token={selectedToken} hover={hoverSelectToken} />
                  </div>
                )
              }
              onSelect={onSelectToken}
              balances={balances}
            />
          ) : (
            <StableSelectToken
              selected={
                selectedToken && (
                  <div
                    className="flex items-center justify-end font-semibold "
                    onMouseEnter={() => setHoverSelectToken(true)}
                    onMouseLeave={() => setHoverSelectToken(false)}
                  >
                    <Icon token={selectedToken} hover={hoverSelectToken} />
                  </div>
                )
              }
              tokens={tokens}
              onSelect={onSelectToken}
              preSelected={preSelected}
              postSelected={postSelected}
              onSelectPost={onSelectPost}
            />
          ))}
        {!showSelectToken && selectedToken && (
          <div className="flex items-center justify-end font-semibold w-2/5">
            <Icon token={selectedToken} showArrow={false} />
          </div>
        )}
      </fieldset>
    </>
  );
}

export function TokenAmountV3({
  amount,
  max,
  total,
  tokens,
  selectedToken,
  balances,
  onSelectToken,
  onSearchToken,
  onChangeAmount,
  text,
  showSelectToken = true,
  disabled = false,
  useNearBalance,
  forSwap,
  isError,
  tokenPriceList,
  forLimitOrder,
  swapMode,
  preSelected,
  postSelected,
  onSelectPost,
  forWrap,
  ExtraElement,
  marketPriceLimitOrder,
  limitOrderDisable,
  onChangeRate,
  curRate,
}: TokenAmountProps) {
  const render = (token: TokenMetadata) =>
    toRoundedReadableNumber({
      decimals: token.decimals,
      number: balances ? balances[token.id] : '0',
    });

  const [hoverSelectToken, setHoverSelectToken] = useState<boolean>(false);

  const tokenPrice = tokenPriceList?.[selectedToken?.id]?.price || null;

  const curMax =
    selectedToken?.id === WRAP_NEAR_CONTRACT_ID && !forWrap
      ? Number(max) <= 0.5
        ? '0'
        : String(Number(max) - 0.5)
      : max;

  return (
    <div
      className={`flex flex-col text-xs bg-opacity-20 bg-black rounded-xl p-4`}
    >
      <div className="flex items-center justify-between">
        {showSelectToken &&
          (!swapMode || swapMode !== SWAP_MODE.STABLE ? (
            <SelectToken
              tokenPriceList={tokenPriceList}
              tokens={tokens}
              render={render}
              customWidth
              selected={
                selectedToken && (
                  <div
                    className="flex items-center justify-end font-semibold "
                    onMouseEnter={() => setHoverSelectToken(true)}
                    onMouseLeave={() => setHoverSelectToken(false)}
                  >
                    <IconLeftV3
                      size={'8'}
                      token={selectedToken}
                      hover={hoverSelectToken}
                    />
                  </div>
                )
              }
              onSelect={onSelectToken}
              balances={balances}
            />
          ) : (
            <StableSelectToken
              selected={
                selectedToken && (
                  <div
                    className="flex items-center justify-end font-semibold "
                    onMouseEnter={() => setHoverSelectToken(true)}
                    onMouseLeave={() => setHoverSelectToken(false)}
                  >
                    <IconLeftV3
                      size={'8'}
                      token={selectedToken}
                      hover={hoverSelectToken}
                    />
                  </div>
                )
              }
              customWidth
              tokens={tokens}
              onSelect={onSelectToken}
              preSelected={preSelected}
              postSelected={postSelected}
              onSelectPost={onSelectPost}
            />
          ))}
        <span className="text-primaryText">
          <FormattedMessage id="balance" defaultMessage="Balance" />
          :&nbsp;
          <span title={total}>{toPrecision(total, 3, true)}</span>
        </span>
      </div>

      <fieldset className="relative flex  align-center items-center my-2">
        <InputAmountV3
          className="border border-transparent rounded w-full mr-2"
          id="inputAmount"
          name={selectedToken?.id}
          max={onChangeAmount ? curMax : null}
          value={limitOrderDisable ? '' : amount}
          onChangeAmount={onChangeAmount}
          forLimitOrder={limitOrderDisable}
          disabled={disabled || limitOrderDisable}
          forSwap={!!forSwap}
          openClear={
            !!onChangeAmount && !forLimitOrder && !ONLY_ZEROS.test(amount)
          }
        />
        {swapMode !== SWAP_MODE.LIMIT && ExtraElement}
      </fieldset>

      <div className="flex items-center justify-between h-6">
        <span className="mr-3 text-primaryText">
          {!!tokenPrice && !ONLY_ZEROS.test(amount) && !isError
            ? '$' +
              toInternationalCurrencySystemLongString(
                multiply(tokenPrice || '0', amount || '0'),
                2
              )
            : '$-'}
        </span>

        {forSwap && !forLimitOrder && onChangeAmount ? (
          <HalfAndMaxAmountV3
            token={selectedToken}
            max={curMax}
            onChangeAmount={onChangeAmount}
            amount={amount}
          />
        ) : null}
        {forLimitOrder &&
        marketPriceLimitOrder &&
        swapMode === SWAP_MODE.LIMIT ? (
          <QuickAmountLimitOrder
            max={marketPriceLimitOrder}
            onChangeAmount={onChangeRate}
            marketPrice={marketPriceLimitOrder}
            amount={curRate}
          />
        ) : null}
      </div>
    </div>
  );
}

export function TokenCardIn({
  tokenIn,
  max,
  onChangeAmount,
  tokenPriceList,
  tokens,
  onSelectToken,
  balances,
  amount,
  hidden,
  ExtraElement,
}: {
  tokenIn: TokenMetadata;
  max: string;
  onChangeAmount: (amount: string) => void;
  tokenPriceList?: Record<string, any>;
  tokens: TokenMetadata[];
  onSelectToken?: (token: TokenMetadata) => void;
  balances: TokenBalancesView;
  amount: string;
  hidden: boolean;
  ExtraElement?: JSX.Element;
}) {
  const [hoverSelectToken, setHoverSelectToken] = useState(false);

  const price = tokenPriceList?.[tokenIn?.id]?.price || null;
  const [symbolsArr] = useState(['e', 'E', '+', '-']);
  const curMax =
    tokenIn?.id === WRAP_NEAR_CONTRACT_ID
      ? Number(max) <= 0.5
        ? '0'
        : String(Number(max) - 0.5)
      : max;
  if (hidden) return null;

  return (
    <div
      className="bg-black bg-opacity-20  p-5 xs:px-4 py-5 flex flex-col"
      style={{
        borderRadius: '20px',
      }}
    >
      <div className="flex items-center justify-between">
        <SelectToken
          tokenPriceList={tokenPriceList}
          tokens={tokens}
          forCross
          selected={
            <div
              className="flex font-semibold "
              onMouseEnter={() => setHoverSelectToken(true)}
              onMouseLeave={() => setHoverSelectToken(false)}
            >
              {tokenIn ? (
                <IconLeftV3 token={tokenIn} hover={hoverSelectToken} />
              ) : null}
            </div>
          }
          onSelect={onSelectToken}
          balances={balances}
        />
        <span
          className="ml-2 text-xs"
          style={{
            color: '#91A2AE',
          }}
        >
          <FormattedMessage id="balance" />: &nbsp; {toPrecision(max, 3, true)}
        </span>
      </div>

      <fieldset className="relative flex  align-center items-center my-2">
        <InputAmountV3
          className="border border-transparent rounded w-full mr-2"
          id="inputAmount"
          name={tokenIn?.id}
          max={onChangeAmount ? curMax : null}
          value={amount}
          onChangeAmount={onChangeAmount}
          openClear
        />
        {ExtraElement}
      </fieldset>

      <div className="flex items-center justify-between">
        {tokenPrice(
          price && !ONLY_ZEROS.test(amount) ? multiply(price, amount) : null
        )}

        <HalfAndMaxAmountV3
          token={tokenIn}
          max={curMax}
          onChangeAmount={onChangeAmount}
          amount={amount}
        />
      </div>
    </div>
  );
}

export function TokenCardOut({
  tokenOut,
  onSelectToken,
  tokenPriceList,
  tokens,
  balances,
  hidden,
  max,
}: {
  tokenOut: TokenMetadata;
  onSelectToken: (token: TokenMetadata) => void;
  hidden: boolean;
  tokenPriceList?: Record<string, any>;
  tokens: TokenMetadata[];
  balances: TokenBalancesView;
  max: string;
}) {
  const [hoverSelectToken, setHoverSelectToken] = useState(false);
  if (hidden) return null;
  return (
    <div
      className="bg-black flex items-center justify-between bg-opacity-20 py-5 pr-5 xs:pr-4"
      style={{
        borderRadius: '20px',
      }}
    >
      <SelectToken
        tokenPriceList={tokenPriceList}
        tokens={tokens}
        forCross
        customWidth
        selected={
          <div
            className="flex font-semibold w-full cursor-pointer pl-4 xs:pl-3 pr-3"
            onMouseEnter={() => setHoverSelectToken(true)}
            onMouseLeave={() => setHoverSelectToken(false)}
          >
            {tokenOut ? (
              <IconLeftV3 token={tokenOut} hover={hoverSelectToken} />
            ) : null}
          </div>
        }
        onSelect={onSelectToken}
        balances={balances}
      />

      <span
        className="ml-2 text-xs"
        style={{
          color: '#91A2AE',
        }}
      >
        <FormattedMessage id="balance" />: &nbsp; {toPrecision(max, 3, true)}
      </span>
    </div>
  );
}

export function CrossSwapTokens({
  tokenIn,
  tokenOut,
  tokenPriceList,
  amountIn,
  amountOut,
  slippageTolerance,
}: {
  tokenIn: TokenMetadata;
  tokenOut: TokenMetadata;
  tokenPriceList?: Record<string, any>;
  amountIn: string;
  amountOut: string;
  slippageTolerance: number;
}) {
  const tokenInPrice = tokenPriceList?.[tokenIn?.id]?.price || null;
  const tokenOutPrice = tokenPriceList?.[tokenOut?.id]?.price || null;

  if (!tokenIn || !tokenOut || !amountOut) return null;

  return (
    <div className="py-5 px-4 border bg-black bg-opacity-20 border-gradientFrom rounded-xl flex items-center justify-between relative">
      <div className="flex flex-col justify-between">
        <span className="text-white flex items-center xs:text-sm">
          <span>{toPrecision(amountIn, 3)}</span>
          <span className="ml-1">{toRealSymbol(tokenIn?.symbol)}</span>
          <div
            className=" text-2xl xs:text-xl font-bold ml-6 xs:ml-3"
            style={{
              color: '#7e8a93',
            }}
          >
            {'>'}
          </div>
        </span>
        <span className="text-sm xs:text-xs text-primaryText pt-1">
          {tokenInPrice ? tokenPrice(multiply(amountIn, tokenInPrice)) : null}
        </span>
      </div>

      <div className="flex flex-col justify-between items-end">
        <span className="text-gradientFrom font-bold text-xl xs:text-base">
          <span title={percentLess(slippageTolerance, amountOut)}>
            {toPrecision(percentLess(slippageTolerance, amountOut), 6)}
          </span>
          <span className="ml-1">{toRealSymbol(tokenOut?.symbol)}</span>
        </span>
        <span className="text-sm text-primaryText pt-1">
          {tokenOutPrice
            ? tokenPrice(multiply(amountOut, tokenOutPrice))
            : null}
        </span>
      </div>
    </div>
  );
}
export function TokenAmountV2({
  amount,
  max,
  total,
  selectedToken,
  onChangeAmount,
  disabled = false,
  isError,
  tokenPriceList,
  showQuickButton = false,
}: TokenAmountProps) {
  const tokenPrice = tokenPriceList?.[selectedToken?.id]?.price || null;
  return (
    <>
      <div
        className={`flex items-center justify-between text-xs font-semibold pb-0.5`}
      >
        {selectedToken && (
          <div className="flex items-center">
            <img
              className="w-7 h-7 rounded-full border border-greenLight"
              src={selectedToken.icon}
            ></img>
            <span className="text-sm text-white font-bold ml-2">
              {selectedToken.symbol}
            </span>
          </div>
        )}
        <div className="flex items-center">
          {onChangeAmount && showQuickButton ? (
            <HalfAndMaxAmount
              token={selectedToken}
              max={max}
              onChangeAmount={onChangeAmount}
              amount={amount}
            />
          ) : null}
          <div
            className={`text-primaryText ${
              showQuickButton ? 'border-l border-primaryText pl-3 ml-1' : ''
            }`}
          >
            <span title={total}>{toPrecision(total, 3, true)}</span>
          </div>
        </div>
      </div>
      <fieldset className="relative flex  align-center my-2">
        <InputAmount
          className="w-full border border-transparent rounded"
          id="inputAmount"
          name={selectedToken?.id}
          max={max}
          value={amount}
          onChangeAmount={onChangeAmount}
          disabled={disabled}
          forSwap={true}
          price={
            tokenPrice && !ONLY_ZEROS.test(amount) && !isError
              ? multiply(tokenPrice, amount)
              : null
          }
        />
      </fieldset>
    </>
  );
}
