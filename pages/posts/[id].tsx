import { Layout } from '../../layouts/Layout';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ONE_POST } from '../api/postsAPI';
import styled from 'styled-components';

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

export default function Post(props: any) {

    const router = useRouter()
    const {id} = router.query
    /*const {loading, error, data} = useQuery(GET_ONE_POST, {
        variables: {postId: id}
    });*/

   /* if (error) {
        return <div>Error loading posts.</div>;
    }
    if (loading) {
        return <div>Loading</div>;
    }*/
    console.log(props)
    // const {post} = data.find((id: any) => id.id);

    return (<div>123</div>
       /* <Layout pageTitle={`Post: ${post.title}`}>
            <Main>
                <Title>Post: {post.title}</Title>
                <p>{post.body}</p>
            </Main>
        </Layout>*/
    );
};