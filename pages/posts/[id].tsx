import { Layout } from '../../layouts/Layout';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS, GET_ONE_POST } from '../api/postsAPI';
import styled from 'styled-components';
import { client } from '../../lib/apollo-client';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { IPost } from '..';

const Main = styled.main`
  width: 90%;
  margin: 0 auto;

  & p {
    font-size: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 2rem 0 3rem 0
`

export default function Post({post}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Layout pageTitle={`Post: ${post.title}`}>
            <Main>
                <Title>Post: {post.title}</Title>
                <p>{post.body}</p>
            </Main>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await client.query({
        query: GET_ALL_POSTS,
    })
    const paths = data.posts.data.map((post:any) => ({
        params: { id: post.id },
    }))
    return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const { data } = await client.query({
        query: GET_ONE_POST,
        variables: {postId: params?.id}
    })
    return { props: {post: data.post}}
}