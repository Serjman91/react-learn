import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const PostActivityButtons = ({ postId, setPostsCallback }) => {
    const history = useHistory();
    const removePost = () => {
        const posts = JSON.parse(localStorage.getItem('POSTS')) || [];
        const newPosts = posts.filter(item => Number(item.id) !== Number(postId))
        localStorage.setItem('POSTS', JSON.stringify(newPosts));
        if (setPostsCallback) {
            setPostsCallback();

            return;
        }
        history.push('/');
    };

    return (
        <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <Link className="btn btn-primary" to={`/news/${postId}/edit`}>Edit Post</Link>
            <span onClick={() => removePost()} className="btn btn-danger">Remove Post</span>
        </div>
    );
};

export default PostActivityButtons;
