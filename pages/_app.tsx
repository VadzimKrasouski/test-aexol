import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo-client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';

function MyApp({Component, pageProps}: AppProps) {
    const apolloClient = useApollo(pageProps);
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleStart = () => {
            setLoading(true)
        }
        const handleStop = () => {
            setLoading(false)
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])

    return (!loading ? (
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>) : <Loader/>
    )
}

export default MyApp
