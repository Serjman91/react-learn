import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { useSelector } from 'react-redux';

const PostsPage = ({ history }) => {
    const [posts, setPosts] = useState([]);
    const userData = useSelector(({ user }) => user);

    useEffect(() => {
        if (!userData.user.email) {
            history.push('/login')
        }
    }, [history, userData]);

    useEffect(async () => {
        await getPosts();
    }, []);

    const getPosts = async () => {
        try {
            let url = 'https://swapi.dev/api/films/';
            let data = await fetch(url, { method: 'GET' });
            const { results } = await data.json();
            const mappedResults = results.map((item, index) => ({
                id: (index + 1),
                ...item
            }));
            setPosts(mappedResults);
        } catch (e) {
            console.log(e)
        }
    };

    const renderPosts = () => {
        if (!posts.length) {
            return 'Sorry, no posts :('
        }

        return posts.map(
            (post) =>
                <PostItem
                    key={`${post.id}-${post.title}`}
                    id={post.id}
                    title={post.title}
                    opening_crawl={post.opening_crawl}
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
