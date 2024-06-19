import { MarketInfoType } from "../market-info/hooks/useMarketInfoConnection"

interface MarketPriceProps {
  marketInfo: MarketInfoType | undefined
}

/**
 * MarketPrice component displays the market price and direction indicator.
 */
function MarketPrice({ marketInfo }: MarketPriceProps) {
  return (
    <div className="w-full bg-neutral px-2 h-8 flex items-center rounded-sm font-bold">
      {marketInfo?.last_trade_price && (
        <p className={`flex flex-row items-center gap-x-2 ${marketInfo.last_trade_price_direction === "down" ? "text-red-400" : "text-green-400"}`}>
          {marketInfo.last_trade_price_direction === "down" ? (
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
            </svg>
          ) : (
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          )}

          {Number(marketInfo.last_trade_price).toLocaleString()}
        </p>
      )}
    </div>
  )
}

export default MarketPrice 
