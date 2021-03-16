import React from 'react';
import {Field, Form, Formik} from "formik";
import {validation} from "../user/validation/postValidation";

const CreatePostForm = () => {

    const handleSubmit = (values, { resetForm }) => {
        const existedPosts = JSON.parse(localStorage.getItem('POSTS')) || [];
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

    return (
        <div className="container login-container">
            <div className="login-wrapper">
                <h2>Create Post</h2>
                <Formik
                    initialValues={{ title: '', body: '' }}
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
                                Create
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreatePostForm;
