import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import PostActivityButtons from "../admin/PostActivityButtons";

const Post = ({ history }) => {
    let { id } = useParams();
    const [post, setPost] = useState({});
    const isUserAdmin = useSelector(({ user }) => user.isAdmin) || {};
    const userData = useSelector(({ user }) => user) || {};

    useEffect(() => {
        if (!(userData.user && userData.user.email)) {
            history.push('/login')
        }
    }, [history, userData]);

    useEffect(async () => {
        await getPost();
    }, []);

    const getPost = async () => {
        try {
            const posts = JSON.parse(localStorage.getItem('POSTS')) || [];
            const currentPost = posts.find(existedPost => {
                return Number(existedPost.id) === Number(id)
            });

            if (!currentPost) {
                history.push('/not-found');
            }
            setPost(currentPost);
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <>
        <div className="container post-container">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <p>{post.body}</p>
            <p>{post.body}</p>
        </div>
            {isUserAdmin && <PostActivityButtons postId={id}/>}
        </>
    );
};

export default Post;
