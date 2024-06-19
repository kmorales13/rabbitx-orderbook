import { useEffect, useRef } from "react"
import { Subscription } from "centrifuge"
import { mergeOrders } from "../utils/mergeOrders"
import { useCentrifuge } from "../../../context/CentrifugeConnection"

export type OrderbookType = {
  asks: [number, number][],
  bids: [number, number][],
  market_id: string,
  sequence: number,
  timestamp: number,
}

/**
 * Establishes a connection to the orderbook channel and updates asks and bids.
 */
export const useOrderbookConnection = (symbol: MarketSymbol) => {
  const { centrifuge, status } = useCentrifuge()

  const bidsMapRef = useRef(new Map<number, number>())
  const asksMapRef = useRef(new Map<number, number>())
  const sequenceRef = useRef(0)
  const subRef = useRef<Subscription>()

  function resetOrderMaps() {
    bidsMapRef.current = new Map<number, number>()
    asksMapRef.current = new Map<number, number>()
    sequenceRef.current = 0
  }

  function updateOrderMaps(data: OrderbookType) {
    if (data) {
      mergeOrders(bidsMapRef.current, data.bids)
      mergeOrders(asksMapRef.current, data.asks)
      sequenceRef.current = Number(data.sequence)
    }
  }

  function checkSequenceConsistency(data: OrderbookType) {
    if (Number(data.sequence) - sequenceRef.current > 1) {
      console.log("lost sequence")
      subRef.current?.unsubscribe()
      subRef.current?.subscribe()
      return false
    }
    return true
  }

  function cleanConnection() {
    subRef.current?.unsubscribe()
    subRef.current?.removeAllListeners()
    subRef.current = undefined
  }

  useEffect(() => {
    if (centrifuge) {
      if (status === "connected") {
        if (!subRef.current) {
          subRef.current = centrifuge.newSubscription(`orderbook:${symbol.from}-${symbol.to}`)

          subRef.current.on("subscribed", ({ data }) => {
            console.log("orderbook: subscribed")
            resetOrderMaps() // We want to clear the local data in case we are reconnecting
            updateOrderMaps(data)
          })

          subRef.current.on("publication", ({ data }) => {
            if (checkSequenceConsistency(data)) { // Verify message are in order based on sequence
              updateOrderMaps(data)
            }
          })

          subRef.current.subscribe()
        }
      } else if (status === "disconnected") {
        cleanConnection()
      }
    }
  }, [centrifuge, status, symbol])

  return { status, bidsMapRef, asksMapRef }
}
