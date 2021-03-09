import React, { useEffect, useState } from 'react';
import { validation } from './validation/loginValidation'
import { Formik, Field, Form } from 'formik';

const Login = ({ history }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        setUser(localStorage.getItem('USER'));

        if (user) {
            setTimeout(() => {
                history.push('/');
            }, 2000);
        }
    }, [user]);

    const handleSubmit = (values) => {
        localStorage.setItem('USER', JSON.stringify(values, null, 2));
        history.push('/');
    };

    return (
        <div className="container login-container">
            {user && (
                <div className="alert alert-danger" role="alert">
                    You has been already logged in!
                </div>
            )}

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
