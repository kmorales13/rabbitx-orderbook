import type { ReactElement } from 'react'
import OrderRow from './OrderRow'
import OrderTableHeader from './OrderTableHeader'

type OrderTableProps = {
  order: Map<number, number>
  isAsks?: boolean
}

/**
 * OrderTable component displays the order table with rows representing each order.
 */
function OrderTable({ order, isAsks = false }: OrderTableProps) {
  const sortedPrices = [...order.keys()].sort((a, b) => isAsks ? a - b : b - a)
  const totalSize = sortedPrices.reduce((acc, price) => acc += order.get(price) || 0, 0)
  let cumulativeSize = 0

  const orderRows: ReactElement[] = []

  for (const price of sortedPrices) {
    const size = order.get(price)
    if (size !== undefined) {
      cumulativeSize += size
      orderRows.push(<OrderRow key={price} price={price} size={size} cumulative={cumulativeSize} total={totalSize} isAsks={isAsks} />)
    }
  }

  return (
    <table className="table table-xs table-pin-rows table-fixed h-full">
      {isAsks && <OrderTableHeader />}
      <tbody>
        {isAsks ? orderRows.reverse() : orderRows}
      </tbody>
    </table>
  )
}

export default OrderTable
