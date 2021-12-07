import { Layout } from '../../layouts/Layout';
import { useRouter } from 'next/router';

export default function Post() {
    const router = useRouter()
    const {id} = router.query
    return (
        <Layout pageTitle={`Post: ${id}`}>
            <h1>Post: {id}</h1>
        </Layout>
    );
};