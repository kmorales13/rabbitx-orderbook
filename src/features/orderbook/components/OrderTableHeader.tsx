
/**
 * OrderTableHeader component displays the header for the order table.
 */
function OrderTableHeader() {
  return (
    <thead>
      <tr>
        <th>
          Price&nbsp;<span className="badge badge-xs rounded-sm bg-neutral text-[9px] p-2">USD</span>
        </th>
        <th className="text-right">
          Amount&nbsp;<span className="badge badge-xs rounded-sm bg-neutral text-[9px] p-2">BTC</span>
        </th>
        <th className="text-right">
          Total&nbsp;<span className="badge badge-xs rounded-sm bg-neutral text-[9px] p-2">BTC</span>
        </th>
      </tr>
    </thead>
  )
}

export default OrderTableHeader
