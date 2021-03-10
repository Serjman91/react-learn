import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validation } from './validation/loginValidation'
import { Formik, Field, Form } from 'formik';
import { setUser } from '../../actions/user';

const Login = ({ history }) => {
    const dispatch = useDispatch();
    const userData = useSelector(({ user }) => user);

    useEffect(() => {
        if (userData.user.email) {
            history.push('/')
        }
    }, [history, userData]);

    const handleSubmit = (values) => {
        dispatch(setUser(values));
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
