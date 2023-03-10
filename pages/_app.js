import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-white text-black min-h-screen">
      <Component {...pageProps} />
    </div>
  )
}
