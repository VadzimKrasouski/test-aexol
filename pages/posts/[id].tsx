import { Layout } from '../../layouts/Layout';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ONE_POST } from '../api/posts';

export default function Post() {
    const router = useRouter()
    const {id} = router.query
    console.log(id)
    const {loading, error, data} = useQuery(GET_ONE_POST, {
        variables: {postId: id}
    });

    if (error)
        return <div>Error loading posts.</div>;
    if (loading)
        return <div>Loading</div>;

    const {post} = data;
    console.log(post)

    return (
        <Layout pageTitle={`Post: ${id}`}>
            <h1>Post: {post.title}</h1>
            <p>{post.body}</p>
        </Layout>
    );
};