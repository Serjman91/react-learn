import React, { useEffect, useState } from 'react';
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

    useEffect(async () => {
        await getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const posts = JSON.parse(localStorage.getItem('POSTS')) || [];
            setPosts(posts);
        } catch (e) {
            console.log(e)
        }
    };

    const renderPosts = () => {
        if (!posts.length) {
            return isUserAdmin ? <CreatePostButton /> : 'Sorry, no posts :('
        }

        return posts.map(
            (post) =>
                <PostItem
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
