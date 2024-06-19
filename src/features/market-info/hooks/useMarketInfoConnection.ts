import { useEffect, useRef } from "react"
import { Subscription } from "centrifuge"
import { useCentrifuge } from "../../../context/CentrifugeConnection"

export type MarketInfoType = {
  last_trade_price: string,
  last_trade_price_direction: "up" | "down"
}

/**
 * Establishes a connection to the market channel and updates market info.
 */
export const useMarketInfoConnection = (symbol: MarketSymbol) => {
  const { centrifuge, status } = useCentrifuge()

  const marketInfoRef = useRef<MarketInfoType>()
  const subRef = useRef<Subscription>()

  function cleanConnection() {
    subRef.current?.unsubscribe()
    subRef.current?.removeAllListeners()
    subRef.current = undefined
  }

  useEffect(() => {
    if (centrifuge) {
      if (status === "connected") {
        if (!subRef.current) {
          subRef.current = centrifuge.newSubscription(`market:${symbol.from}-${symbol.to}`)

          subRef.current.on("subscribed", ({ data }) => {
            console.log("market: subscribed")
            marketInfoRef.current = data
          })

          subRef.current.on("publication", ({ data }) => {
            // Check if the publication contains actual data
            if ("last_trade_price" in data) {
              marketInfoRef.current = {
                last_trade_price: data.last_trade_price || 0,
                last_trade_price_direction: (marketInfoRef.current?.last_trade_price || 0) > data.last_trade_price ? "down" : "up"
              }
            }
          })

          subRef.current.subscribe()
        }
      } else if (status === "disconnected") {
        cleanConnection()
      }
    }
  }, [centrifuge, status, symbol])

  return { status, marketInfoRef }
}
