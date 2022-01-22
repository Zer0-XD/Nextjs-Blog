import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../Components/Header'
import { motion } from 'framer-motion';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <Header /> */}
      <motion.div initial="pageInitial" animate="pageAnimate" variants={{
        pageInitial: {
          opacity: 0
        },
        pageAnimate: {
          opacity: 1
        },
      }}>
        <Component {...pageProps} />
      </motion.div>
    </>
  )
}

export default MyApp
