import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import "./login.css"
import { Button, Icon, Notification } from 'atomize';
import { useDispatch } from 'react-redux'
import { signin } from '../../Redux/action/users';

import { useHistory } from 'react-router-dom';

const SignupSchema = Yup.object().shape({

    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

export const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory();


    const [dangerDark, setDangerDark] = useState()
    const [form, setForm] = useState();

    useEffect(() => {
        if (!form) {
        }
        else dispatch(signin(form, history));
    }, [form])

    return (
        <>
            <div className="Login">
                <Notification
                    bg="info100"
                    textColor="info800"
                    isOpen={dangerDark}
                    onClose={() => setDangerDark(false)}
                    prefix={
                        <Icon
                            name="Success"
                            color="blue"
                            size="18px"
                            m={{ r: "0.5rem" }}
                        />
                    }
                >
                    You are Logged in
                </Notification>
                <h1 className="header">Login</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        setForm(values)
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="form">
                            <label className="lable">Email</label>
                            <Field className="input" name="email" type="email" />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            <label className="lable">Password</label>
                            <Field className="input" name="password" type="password" />
                            {errors.password ? <div>{errors.password}</div> : null}

                            <div className="button">
                                <Button

                                    bg="info700"
                                    hoverBg="info600"
                                    m={{ r: "0.5rem" }}
                                    className={"Button"} type="submit">Sign In </Button>

                                <Button

                                    bg="info700"
                                    hoverBg="info600"
                                    m={{ r: "0.5rem" }}
                                    onClick={() => history.push('/signup')} className={"Button"} type="submit">Sign Up</Button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </>

    )
}

