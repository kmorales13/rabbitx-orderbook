import { useOrderbookConnection } from "./hooks/useOrderbookConnection"
import { useOrderUpdater } from "./hooks/useOrderUpdater"
import OrderTable from "./components/OrderTable"
import { useMarketInfoConnection } from "./market-info/hooks/useMarketInfoConnection"
import MarketPrice from "./components/OrdersMarketPrice"

interface OrderbookProps {
  symbol: MarketSymbol
}

/**
 * Orderbook component displays the order book for a given symbol,
 * including bid and ask orders, market price, and connection status.
 */
function Orderbook({ symbol }: OrderbookProps) {
  const { status, bidsMapRef, asksMapRef } = useOrderbookConnection(symbol) // Manage order book connection
  const { marketInfoRef: { current: marketInfo } } = useMarketInfoConnection(symbol) // Manage market info connection
  const orders = useOrderUpdater(status, bidsMapRef, asksMapRef) // Update orders state

  return (
    <>
      <div className="relative card w-96 h-fit bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title z-20">{`${symbol.from}/${symbol.to}`}</h2>
          <div className="flex flex-col-reverse h-96 overflow-auto text-red-400 flash-red">
            <OrderTable order={orders.asks} isAsks={true} />
          </div>

          <MarketPrice marketInfo={marketInfo} />

          <div className="flex flex-col h-96 overflow-auto text-green-400 flash-green">
            <OrderTable order={orders.bids} />
          </div>
        </div>

        {/* Display loading skeleton when disconnected */}
        {status === "disconnected" && <div className="skeleton w-full h-full absolute z-10" />}
      </div>

      {/* Display error message when connection lost */}
      {status === "error" && (
        <div className="toast toast-top toast-start">
          <div className="alert alert-warning">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>Connection lost.</span>
          </div>
        </div>
      )}
    </>
  )
}

export default Orderbook
