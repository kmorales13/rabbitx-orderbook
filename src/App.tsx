import CentrifugeProvider from "./context/CentrifugeConnection"
import Orderbook from "./features/orderbook/Orderbook"

function App() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-base-200 gap-y-4">
      <div className="text-center">
        <h1 className="text-4xl">Rabbit<span className="text-red-500">X</span> Orderbook</h1>
        <span>by:&nbsp;
          <a href="https://www.linkedin.com/in/kvmorales/" target="_blank" className="text-blue-500 font-semibold">Kevin Morales</a>
        </span>
      </div>
      
      <CentrifugeProvider>
        <Orderbook symbol={{ from: "BTC", to: "USD" }} />
      </CentrifugeProvider>
    </div>
  )
}

export default App
