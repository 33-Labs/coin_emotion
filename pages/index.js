import { useEffect, useState } from "react"
import { coins } from "../utils/coins"
import NavigationBar from "./components/NavigationBar"
import TokenList from "./components/TokenList"

const getAllCandles = async () => {
  const promises = []
  for (const [symbol, metadata] of Object.entries(coins)) {
    promises.push(getCandlesOfSymbol(symbol, metadata))
  }

  const allCandles = await Promise.all(promises)
  return allCandles.sort((a, b) => a.metadata.id - b.metadata.id)
}

const getCandlesOfSymbol = async (symbol, metadata) => {
  const endpoint = "https://api.binance.com/api/v3/klines"
  const url = `${endpoint}?symbol=${symbol}USDT&interval=1d&limit=60`
  const res = await fetch(url)
  const candles = (await res.json()).sort((a, b) => b[0] - a[0])
  return {
    symbol: symbol,
    candles: candles,
    metadata: metadata
  }
}

export default function Home() {
  const [tokens, setTokens] = useState([])

  useEffect(() => {
    getAllCandles()
      .then((res) => {
        console.log(res)
        setTokens(res)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <div className="container mx-auto pb-[300px] max-w-[2560px] min-w-[380px] px-10 min-h-screen bg-white">
      <div className="flex flex-col">
        <NavigationBar />
        <TokenList tokens={tokens} />
      </div>
    </div>
  )
}