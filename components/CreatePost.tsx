import { CREATE_POST } from '../pages/api/posts';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

export const CreatePost = () => {
    const [newPost, {loading, error}] = useMutation(CREATE_POST);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    const addUser = (e) => {
        e.preventDefault()
        newPost({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(({data}) => {
            console.log(data)
            setUsername('')
            setAge(0)
        })
    }

    return (
        <div>
            <form>
                <input value={title} onChange={e => setTitle(e.target.value)} type='text'/>
                <input value={text} onChange={e => setText(e.target.value)} type='text'/>
                <div>
                    <button onClick={(e) => addPost(e)}>Создать</button>
                </div>
            </form>
        </div>
    );
};