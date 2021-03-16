import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ id, title = '', body = '' }) => (
    <Link to={`/news/${id}`}>
        <h3>{title}</h3>
        <p>{body}</p>
    </Link>
);

export default PostItem;
