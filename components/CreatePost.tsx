import { CREATE_POST } from '../pages/api/posts';
import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

export const CreatePost = () => {
    const [newPost, {loading, data}] = useMutation(CREATE_POST);
    const [title, setTitle] = useState('');
    const [body, setText] = useState('');
    const addPost = (e: React.SyntheticEvent) => {
        e.preventDefault()
        newPost({
            variables: {
                input: {
                    title, body
                }
            }
        }).then(({data}) => {
            console.log(data)
            setTitle('')
            setText('')
        })
    }


    return (
        <div>
            <form>
                <input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} type='text'/>
                <input placeholder='write a text here' value={body} onChange={e => setText(e.target.value)}
                       type='text'/>
                <button disabled={loading} onClick={(e) => addPost(e)}>Create</button>
                {data ? 'DONE' : undefined}
            </form>
        </div>
    );
};