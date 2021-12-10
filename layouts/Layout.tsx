import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import { Loader } from '../components/Loader';
import { useRouter } from 'next/router';

export const siteTitle = 'Test Website';

interface LayoutProps {
    pageTitle?: string;
}

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
  background-color: aliceblue;

  @media screen and (max-width: 800px) {
    position: static;
  }
`;
const Nav = styled.nav`
  max-width: 1600px;
  width: 90%;
  display: flex;
  justify-content: flex-start;

  & a {
    font-size: 1.5rem;

    & :hover {
      transition: all .3s;
      background-color: rgba(255, 108, 129, 0.8);
    }
  }
`;
const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  top: 100px;
  position: relative;

  @media screen and (max-width: 800px) {
    position: static;
  }
`;


export const Layout: React.FC<LayoutProps> = ({children, pageTitle}) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleStart = (url: any) => {
            console.log(`Loading: ${url}`)
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
    return (
        <>
            <Head>
                <title>{pageTitle ? siteTitle + ' | ' + pageTitle : siteTitle}</title>
            </Head>
            {!loading ? (
                <>
                    <Header>
                        <Nav>
                            <Link href='/'><a>Home</a></Link>
                        </Nav>
                    </Header>
                    <Container>{children}</Container>
                </>) : <Loader/>
            }
        </>
    );
};
