import "../styles/globals.css"
import { SessionProvider } from "next-auth/react"
import { CartContextProvider } from "../components/CartContext";


function MyApp({ Component, pageProps }) {
  return (

    <>
      <SessionProvider session={pageProps.session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>

    </>

  )
}

export default MyApp
