import React from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import PostActivityButtons from "../admin/PostActivityButtons";

const PostItem = ({ id, title = '', body = '', setPostsCallback }) => {
    const isUserAdmin = useSelector(({ user }) => user.isAdmin) || {};

    return (
        <>
            <Link to={`/news/${id}`}>
                <h3>{title}</h3>
                <p>{body}</p>
            </Link>
            {isUserAdmin && <PostActivityButtons setPostsCallback={setPostsCallback} postId={id}/>}
        </>
    )
};

export default PostItem;
