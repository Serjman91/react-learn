import React from 'react';
import { Link } from 'react-router-dom';

const CreatePostButton = () => {
    return (
        <Link className="btn btn-success" to="/create">Create Post</Link>
    );
};

export default CreatePostButton;
