import React, {useEffect, useState} from 'react';
import { useParams, useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {Field, Form, Formik} from "formik";
import Modal from 'react-modal';
import {validation} from "../user/validation/postValidation";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        background             : '#d0d0fa'
    }
};

Modal.setAppElement('#root');

const CreatePostForm = () => {
    let { id } = useParams();
    let { pathname } = useLocation();
    const [post, setPost] = useState({});
    const [modalIsOpen,setIsOpen] = useState(false);
    const history = useHistory();

    const isEditPage = pathname.includes('edit');

    useEffect(async () => {
        if (!isEditPage) {
            return;
        }

        await getPost();
    }, []);

    const getPost = async () => {
        try {
            const posts = JSON.parse(localStorage.getItem('POSTS')) || [];
            const currentPost = posts.find(existedPost => {
                return Number(existedPost.id) === Number(id)
            });

            if (!currentPost) {
                history.push('/not-found');
            }
            setPost(currentPost);
        } catch (e) {
            console.log(e)
        }
    };

    const updatePost = (existedPosts, values, setSubmitting) => {
        const currentPost = existedPosts.find(post => Number(post.id) === Number(id));

        const updatedPost = {
            id: currentPost.id,
            ...values
        };

        const index = existedPosts.findIndex(post => Number(post.id) === Number(id));

        existedPosts.splice(index, 1, updatedPost);
        localStorage.setItem('POSTS', JSON.stringify(existedPosts));
        setSubmitting(false);
    };

    const handleSubmit = (values, { resetForm, setSubmitting }) => {
        const existedPosts = JSON.parse(localStorage.getItem('POSTS')) || [];

        if (isEditPage) {
            updatePost(existedPosts, values, setSubmitting);
            openModal();
            return;
        }

        if (!existedPosts.length) {
            values.id = 1;
            localStorage.setItem('POSTS', JSON.stringify([values]));
            resetForm({ title: '', body: '' });
            return;
        }

        values.id = Number(existedPosts[existedPosts.length - 1].id) + 1 || 0;
        existedPosts.push(values);
        localStorage.setItem('POSTS', JSON.stringify(existedPosts));


        resetForm({ title: '', body: '' });
    };

    const initialValues = {
        title: isEditPage ? post.title : '',
        body: isEditPage ? post.body : '',
    };

    const closeModal = () => {
        setIsOpen(false);
        history.push('/')
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <>
        <div className="container login-container">
            <div className="login-wrapper">
                <h2>{isEditPage ? 'Edit Post' : 'Create Post'}</h2>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validation}
                    onSubmit={handleSubmit}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          isSubmitting,
                      }) => (
                        <Form noValidate>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <Field
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                    type="title"
                                    name="title"
                                    className={"form-control"}
                                    placeholder="Title"
                                />
                                <span className="text-danger">{errors.title && touched.title && errors.title}</span>

                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Text</label>
                                <Field
                                    as="textarea"
                                    type="body"
                                    name="body"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.body}
                                    className={"form-control"}
                                    placeholder="Text"
                                />
                                <span className="text-danger">{errors.body && touched.body && errors.body}</span>
                            </div>

                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                {isEditPage ? 'Save' : 'Create'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2>Post successfully Updated</h2>
                <button onClick={closeModal}>close</button>
                <button onClick={closeModal}>Go to Main page</button>
            </Modal>
        </>
    );
};

export default CreatePostForm;
