interface OrderRowProps {
  price: number
  size: number
  cumulative: number
  total: number
  isAsks: boolean
}

/**
 * OrderRow component displays a single row in the order table.
 */
function OrderRow({ price, size, cumulative, total, isAsks }: OrderRowProps) {
  const totalWidth = cumulative * 100 / total

  return (
    <tr key={`${price}-${size}`}>
      <td>{price.toLocaleString()}</td>
      <td className="text-base-content text-right">{size.toFixed(4)}</td>
      <td className="text-base-content text-right relative overflow-hidden">
        <div
          className={`absolute h-full opacity-20 ${isAsks ? "bg-red-400" : "bg-green-400"}`}
          style={{ width: `${totalWidth}%` }}
        />
        {cumulative.toFixed(4)}
      </td>
    </tr>
  )
}

export default OrderRow
