import { CREATE_POST } from '../pages/api/posts';
import { useMutation } from '@apollo/client';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const Input = styled.input.attrs(props => ({
    type: 'text',
    size: props.size || '1em',
    required: props.required,
}))`
  border: 2px solid palevioletred;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;
const Button = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.disabled,
}))`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

export const CreatePost = () => {
    const [newPost, {loading}] = useMutation(CREATE_POST);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState<string | null>(null);

    const addPost = () => {
        if (title.trim() && body !== '') {
            newPost({
                variables: {
                    input: {
                        title, body
                    }
                }
            }).then(({data}) => {
                console.log(data)
                setTitle('')
                setBody('')
                setStatus('DONE')
            })
        } else {
            setStatus('Title and body are required');
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent) => {
        if (status !== null) {
            setStatus(null)
        }
        if (e.key === 'Enter') {
            addPost();
        }
    }

    return (
        <div>
            <Input placeholder='Title'
                   value={title}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                   onKeyPress={onKeyPressHandler}/>
            <Input placeholder='write a text here'
                   value={body}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => setBody(e.currentTarget.value)}
                   onKeyPress={onKeyPressHandler}
            />
            <Button disabled={loading} onClick={addPost}>Create</Button>
            {status}
        </div>
    );
};