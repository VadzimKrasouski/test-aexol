import { gql } from '@apollo/client'

export const GET_ALL_POSTS = gql`
    query GetAllPosts($options: PageQueryOptions) {
        posts(options: $options) {
            data {
                id
                title
                body
             }
        }
    }  
`

export const GET_ONE_POST = gql`
    query Post($postId: ID!) {
        post(id: $postId) {
            id
            title
            body
        }
    }    
`

export const CREATE_POST = gql`
    mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
            id
            title
            body
        }
    }
`