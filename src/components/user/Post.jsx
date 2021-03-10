import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const Post = () => {
    let { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(async () => {
        await getPost();
    }, []);

    const getPost = async () => {
        try {
            let url = `https://swapi.dev/api/films/${id}`;
            let data = await fetch(url, { method: 'GET' });
            const result = await data.json();
            setPost(result);
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className="container post-container">
            <h1>{post.title}</h1>
            <p>{post.opening_crawl}</p>
            <p>{post.opening_crawl}</p>
            <p>{post.opening_crawl}</p>
        </div>
    );
};

export default Post;
