import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
import { ThemeProvider } from 'next-themes'



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider defaultTheme="dark" forcedTheme="dark" storageKey='theme-web' >
        <NextNProgress color='#E1AD01' height={8} options={{ easing: 'ease', showSpinner: false, }} />
        <Component {...pageProps} />
      </ThemeProvider>

    </>
  )
}

export default MyApp
