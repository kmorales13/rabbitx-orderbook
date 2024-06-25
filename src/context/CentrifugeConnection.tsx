import { type ReactNode, createContext, useContext, useEffect, useRef, useState } from "react"
import { Centrifuge, State } from "centrifuge"
import { WS_TOKEN } from "../const"

export type StatusType = State | "error"

// Create a context to store the Centrifuge instance and connection status
const CentrifugeContext = createContext<{ centrifuge: Centrifuge | undefined, status: StatusType }>(
  { centrifuge: undefined, status: State.Disconnected }
)

// Custom hook to access the Centrifuge context
export const useCentrifuge = () => useContext(CentrifugeContext)

interface CentrifugeProviderProps {
  children: ReactNode
}
/**
 * Component that provides the Centrifuge instance and status to its children
 */
function CentrifugeProvider({ children }: CentrifugeProviderProps) {
  const [status, setStatus] = useState<StatusType>(State.Disconnected)
  const centrifuge = useRef<Centrifuge>()

  useEffect(() => {
    // Create a new Centrifuge instance if not already created or disconnected
    if (!centrifuge.current || centrifuge.current.state === "disconnected") {
      centrifuge.current = new Centrifuge('wss://api.prod.rabbitx.io/ws', { token: WS_TOKEN })

      // Event handler for when the connection is established
      centrifuge.current.on("connected", () => {
        console.log("connected")
        setStatus(State.Connected)
      })

      // Event handler for connection errors
      centrifuge.current.on("error", ({ error }) => {
        console.log("error", error)
        setStatus("error")
      })

      // Event handler for disconnection
      centrifuge.current.on("disconnected", () => {
        console.log("disconnected")
        setStatus(State.Disconnected)
      })

      centrifuge.current.connect()
    }

    return () => centrifuge.current?.disconnect()
  }, [])

  return (
    <CentrifugeContext.Provider value={{ centrifuge: centrifuge.current, status }}>
      {children}
    </CentrifugeContext.Provider>
  )
}

export default CentrifugeProvider
