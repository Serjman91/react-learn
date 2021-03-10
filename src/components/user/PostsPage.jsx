import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';

const PostsPage = () => {
    const [posts, setPosts] = useState([]);
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
