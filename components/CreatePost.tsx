import React, { ChangeEvent, useState } from 'react';
import { CREATE_POST } from '../pages/api/postsAPI';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 2rem 0;
`;
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
  background-color: aliceblue;
  font-size: 1.1em;
  margin: 1em;
  padding: 0.6em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const Status = styled.div`
  background-color: rgba(255, 108, 129, 0.3);
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
    };

    const onKeyPressHandler = (e: KeyboardEvent) => {
        if (status !== null) {
            setStatus(null)
        }
        if (e.key === 'Enter') {
            addPost()
        }
    };

    return (
        <Container>
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
            <Status>{status}</Status>
        </Container>
    );
};