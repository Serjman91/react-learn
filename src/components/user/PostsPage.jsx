import React, { useEffect, useState } from 'react';

const PostsPage = () => {
    console.log('RENDER');
    const [posts, setPosts] = useState([]);
    useEffect(async () => {
        await getPosts();
    }, []);

    const getPosts = async () => {
        try {
            let url = 'https://swapi.dev/api/films/';
            let data = await fetch(url, { method: 'GET' });
            const { results } = await data.json();
            setPosts(results);
        } catch (e) {
            console.log(e)
        }
    };

    const renderPosts = () => {
        if (!posts.length) {
            return 'Sorry, no posts :('
        }

        return posts.map((post) => <div>
            <h3>{post.title}</h3>
            <p>{post.opening_crawl}</p>
        </div>)
    };

    return (
        <div style={{ paddingBottom: '150px' }} className="container">
            <h2>Posts Page</h2>
            {renderPosts()}
        </div>
    );
};

export default PostsPage;
