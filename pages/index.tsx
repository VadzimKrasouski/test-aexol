import type { GetStaticProps } from 'next'
import { gql } from '@apollo/client';
import client from '../lib/apollo-client';
import styled from 'styled-components';
import Link from 'next/link';
import { Layout } from '../layouts/Layout';

const Main = styled.main`
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 1rem 0;
  font-size: 2rem;
  text-align: center;
`;

const CardsList = styled.ul`
  list-style: none;
  margin: 0 0 1em 0;
  padding: 0;

  @media screen and (min-width: 800px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    margin: 0;
  }
`;

const CardTitle = styled.h3`
  background-color: rgba(255, 108, 129, 0.3);
  color: #fff;
  margin: 0;
  padding: 1rem 20px;
  cursor: pointer;

  & a {
    color: #000;
    text-decoration: none;
    font-weight: normal;
    display: block;
    margin: 0;
  }
`;

const Card = styled.li`
  background-color: rgba(250, 235, 215, 0.82);
  border: 1px solid #999;
  border-radius: 3px;
  margin-bottom: 2rem;
  display: grid;
  grid-template-rows: auto 1fr auto;

  & :hover h3 {
    transition: all .3s;
    background-color: rgba(255, 108, 129, 0.8);
  }

  @media screen and (min-width: 800px) {
    margin: 0;
  }
`;

const PostBody = styled.div`
  padding: 0.8rem 1rem 0.2rem 1rem;

  & p {
    margin: 0 0 1.5rem;
  }
`;

interface IPost {
    id: string
    title: string
    body: string
    _typename: string
}

interface IPostsPage {
    data: IPost[]
}

interface HomeProps {
    posts: IPostsPage
}

const Home = ({posts}: HomeProps) => {
    return (
        <>
            <Layout pageTitle={'Home'}>
                <Main>
                    <Title>Blog</Title>
                    <CardsList>{posts.data.map((post: any) => (
                        <Card key={post.id}>
                            <Link href={`/posts/${post.id}`} passHref><CardTitle><a>{post.title}</a></CardTitle></Link>
                            <PostBody><p>{post.body.slice(0, 50) + '...'}</p></PostBody>
                        </Card>
                    ))}</CardsList>
                </Main>
            </Layout>
        </>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const {data} = await client.query({
        query: gql`
        query GetAllPosts($options: PageQueryOptions) {
        posts(options: $options) {
             data {
                id
                title
                body
             }
        }
    }
      `,
    });

    return {
        props: {
            posts: data.posts
        },
    };
};