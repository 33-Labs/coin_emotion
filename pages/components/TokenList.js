import Decimal from 'decimal.js'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const getDate = (candle, index) => {
  const dateTime = new Date(candle[0])
  const date = dateTime.getUTCDate()
  const month = dateTime.getUTCMonth()
  return (
    <th key={index} scope="col" className="border border-1 px-1 py-1 min-w-[24px] max-w-[24px]">
      <div className='text-gray-600 text-xs'>{month + 1}</div>
      <div className='text-gray-900 text-sm'>{date}</div>
    </th>
  )
}

const getCell = (candle, index, withBottomBorder) => {
  const open = new Decimal(candle[1])
  const close = new Decimal(candle[4])
  const change = close.sub(open)
  const changePercent = change.div(open).toNumber()

  let color = "bg-white"
  if (changePercent > 0 && changePercent <= 0.05) {
    color = "bg-green-300"
  } else if (changePercent > 0.05 && changePercent <= 0.10) {
    color = "bg-green-400"
  } else if (changePercent > 0.10 && changePercent <= 0.15) {
    color = "bg-green-500"
  } else if (changePercent > 0.15 && changePercent <= 0.20) {
    color = "bg-green-600"
  } else if (changePercent > 0.20) {
    color = "bg-green-700"
  } else if (changePercent >= -0.05 && changePercent < 0) {
    color = "bg-red-300"
  } else if (changePercent >= -0.10 && changePercent < -0.05) {
    color = "bg-red-400"
  } else if (changePercent >= -0.15 && changePercent < -0.10) {
    color = "bg-red-500"
  } else if (changePercent >= -0.20 && changePercent < -0.15) {
    color = "bg-red-600"
  } else if (changePercent < -0.20) {
    color = "bg-red-700"
  }

  return (
    <td key={index} className={`w-4 h-4 ${color} ${withBottomBorder ? "border-b-4 border-b-slate-200" : null }`}>
    </td>
  )
}

export default function TokenList(props) {
  const { tokens } = props
  const [token1, setToken1] = useState(null)

  useEffect(() => {
    if (tokens && tokens.length > 0) {
      setToken1(tokens[0])
    }
  }, [tokens])

  return (
    <div>
      <div className='bg-green-300'></div>
      <div className='bg-green-400'></div>
      <div className='bg-green-500'></div>
      <div className='bg-green-600'></div>
      <div className='bg-green-700'></div>
      <div className='bg-red-300'></div>
      <div className='bg-red-400'></div>
      <div className='bg-red-500'></div>
      <div className='bg-red-600'></div>
      <div className='bg-red-700'></div>
      {tokens && tokens.length > 0 ?
        <div className="mt-4 flex flex-col w-full shrink-0">
          <div className="px-1 overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-2xl">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="border border-1 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Symbol
                      </th>
                      {
                        token1 ?
                          token1.candles.map((c, index) => {
                            return getDate(c, index)
                          }) : null
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tokens.map((token, index) => {
                        const withBottomBorder = token.metadata.isLast == true
                        return (
                        <tr key={`tokens-${index}`}>
                          <td className={`border border-1 px-1 py-1 text-sm font-bold text-center ${token.metadata.group % 2 == 0 ? "bg-white" : "bg-slate-200"} ${token.metadata.isLast ? "border-b-4 border-b-slate-200": null}`}>
                            {token.symbol}
                          </td>
                          {
                            token.candles.map((c, index) => {
                              return getCell(c, index, withBottomBorder)
                            })
                          }
                        </tr>)
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> :
        <div className="flex mt-10 h-[70px] text-gray-400 text-base justify-center">
          Fetching Data
        </div>}
    </div>
  )
}