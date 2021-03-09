import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';

const validation = Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().required('Password is required')
});

const Login = ({ history }) => {
    useEffect(() => {
        const isUserExists = localStorage.getItem('USER');
        if (isUserExists) {
            history.push('/');
        }
    }, []);

    const handleSubmit = (values) => {
        localStorage.setItem('USER', JSON.stringify(values, null, 2));
        history.push('/');
    };

    return (
        <div className="container login-container">
            <div className="login-wrapper">
                <h2>Login Page</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
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
                                <label htmlFor="email">Email</label>
                                <Field
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    type="email"
                                    name="email"
                                    className={"form-control"}
                                    placeholder="Email"
                                />
                                <span className="text-danger">{errors.email && touched.email && errors.email}</span>

                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className={"form-control"}
                                    placeholder="Password"
                                />
                                <span className="text-danger">{errors.password && touched.password && errors.password}</span>
                            </div>

                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};


export default Login;
