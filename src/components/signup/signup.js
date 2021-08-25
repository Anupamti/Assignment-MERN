import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import "./login.css"
import { Button, Icon, Notification } from 'atomize';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { signup } from '../../Redux/action/users';

const SignupSchema = Yup.object().shape({

    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
    confirmPassword: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
});

export const Signup = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const [form, setForm] = useState();
    const [dangerDark, setDangerDark] = useState()


    useEffect(() => {
        console.log(form)
        if (!form) {
        }
        else dispatch(signup(form, history));
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
                    New User Created Successfully
                </Notification>
                <h1 className="header">Create a new Account </h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                        firstName: '',
                        lastName: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        // console.log(values, "formikvlaue");
                        setForm(values)
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="form">
                            <label className="lable">First Name</label>
                            <Field className="input" name="firstName" type="firstname" />
                            {errors.firstName ? <div>{errors.firstName}</div> : null}

                            <label className="lable">Last Name</label>
                            <Field className="input" name="lastName" type="lastName" />
                            {errors.lastName ? <div>{errors.lastName}</div> : null}

                            <label className="lable">Email</label>
                            <Field className="input" name="email" type="email" />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}

                            <label className="lable">Enter Password</label>
                            <Field className="input" name="password" type="password" />
                            {errors.password ? <div>{errors.password}</div> : null}

                            <label className="lable">Confirm Password</label>
                            <Field className="input" name="confirmPassword" type="Password" />
                            {errors.confirmPassword ? <div>{errors.confirmPassword}</div> : null}

                            <div className="button">
                                <Button
                                    bg="info700"
                                    hoverBg="info600"
                                    m={{ r: "0.5rem" }}
                                    className={"Button"} type="submit">Sign Up</Button>


                                <Button
                                    bg="success700"
                                    hoverBg="success600"
                                    m={{ r: "0.5rem" }}
                                    onClick={() => history.push('/')} className={"Button"} >Sign In</Button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </>

    )
}

