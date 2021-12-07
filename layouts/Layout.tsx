import styled from 'styled-components';

import React from 'react';
import Head from 'next/head'
import Link from 'next/link';

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
  background-color: aliceblue;
`;

const Nav = styled.nav`
  max-width: 1600px;
  width: 90%;
  display: flex;
  justify-content: flex-start;
`;

const Container = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  top: 100px;
  position: relative;
`;

export const Layout: React.FC<LayoutProps> = ({children, pageTitle}) => {
    return (
        <>
            <Head>
                <title>{pageTitle ? siteTitle + ' | ' + pageTitle : siteTitle}</title>
            </Head>
            <Header>
                <Nav>
                    <Link href='/'><a>Home</a></Link>
                </Nav>
            </Header>
            <Container>{children}</Container>
        </>
    );
};
