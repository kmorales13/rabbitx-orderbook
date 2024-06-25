import { useEffect, useState, startTransition, useRef } from "react"
import type { StatusType } from "../../../context/CentrifugeConnection"
import { ORDER_UPDATE_INTERVAL } from "../../../const"

type OrdersState = { bids: Map<number, number>, asks: Map<number, number> }

/**
 * Updates the orders state based on the status and the references to the bids and asks maps.
 */
export const useOrderUpdater = (status: StatusType, bidsMapRef: React.MutableRefObject<Map<number, number>>, asksMapRef: React.MutableRefObject<Map<number, number>>) => {
  const [orders, setOrders] = useState<OrdersState>({ bids: new Map(), asks: new Map() })
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (status === "connected") {
      if (intervalRef.current === undefined) {
        intervalRef.current = setInterval(() => {
          startTransition(() => {
            setOrders({ bids: bidsMapRef.current, asks: asksMapRef.current })
          })
        }, ORDER_UPDATE_INTERVAL)
      }
    } else {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }

    return () => clearInterval(intervalRef.current)
  }, [status, bidsMapRef, asksMapRef])

  return orders
}
