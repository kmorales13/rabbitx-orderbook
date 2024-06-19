import { useEffect, useState, startTransition } from "react"
import { StatusType } from "../../../context/CentrifugeConnection"

type OrdersState = { bids: Map<number, number>, asks: Map<number, number> }

/**
 * Updates the orders state based on the status and the references to the bids and asks maps.
 */
export const useOrderUpdater = (status: StatusType, bidsMapRef: React.MutableRefObject<Map<number, number>>, asksMapRef: React.MutableRefObject<Map<number, number>>) => {
  const [orders, setOrders] = useState<OrdersState>({ bids: new Map(), asks: new Map() })

  useEffect(() => {
    const interval = setInterval(() => {
      if (status === "connected") {
        startTransition(() => {
          setOrders({ bids: bidsMapRef.current, asks: asksMapRef.current })
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [status, bidsMapRef, asksMapRef])

  return orders
}
