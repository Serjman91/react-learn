import React, { useEffect, useState, useCallback } from 'react';
import PostItem from './PostItem';
import { useSelector } from 'react-redux';
import CreatePostButton from "../admin/CreatePostButton";

const PostsPage = ({ history }) => {
    const [posts, setPosts] = useState([]);
    const userData = useSelector(({ user }) => user) || {};
    const isUserAdmin = useSelector(({ user }) => user.isAdmin) || {};

    useEffect(() => {
        if (!(userData.user && userData.user.email)) {
            history.push('/login')
        }
    }, [history, userData]);

    const getPosts = useCallback(async () => {
        try {
            if (localStorage.getItem("POSTS") === null) {
                localStorage.setItem("POSTS", JSON.stringify([]));
            } else {
                const posts = JSON.parse(localStorage.getItem('POSTS')) || [];
                setPosts(posts);
            }
        } catch (e) {
            console.log(e)
        }
    }, [JSON.stringify(posts)]);

    useEffect(async () => {
        await getPosts();
    }, [getPosts]);


    const renderPosts = () => {
        if (!posts || !posts.length) {
            return isUserAdmin ? <CreatePostButton /> : 'Sorry, no posts :('
        }

        return posts.map(
            (post) =>
                <PostItem
                    setPostsCallback={setPosts}
                    key={`${post.id}-${post.title}`}
                    id={post.id}
                    title={post.title}
                    body={post.body}
                />
            )
    };

    return (
        <div style={{ paddingBottom: '150px' }} className="container">
            <h2>Posts Page</h2>
            {renderPosts()}
        </div>
    );
};

export default PostsPage;
