import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import "./login.css"
import { Button, Icon, Notification } from 'atomize';
import { useDispatch } from 'react-redux'

import { useHistory } from 'react-router-dom';
import { createUser } from '../../Redux/action/userData';

const SignupSchema = Yup.object().shape({

    email: Yup.string().email('Invalid email').required('Required'),
    userName: Yup.string().required('Required'),
    mobile: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(10)
        .required('A phone number is required'),
    address: Yup.string().required('Required'),
});

export const ScreenOne = () => {
    const dispatch = useDispatch()
    const history = useHistory();


    const [dangerDark, setDangerDark] = useState()
    const [dataSubmited, setDataSubmited] = useState()
    const [form, setForm] = useState();

    useEffect(() => {
        if (!form) {
            setDangerDark(true)
        }
        else {
            dispatch(createUser(form, history));
            setDataSubmited(true)
        }
    }, [form])

    return (
        <>
            <div className="Login">
                <Notification
                    bg="warning700"
                    hoverBg="warning600"
                    isOpen={dataSubmited}
                    onClose={() => setDataSubmited(false)}
                    prefix={
                        <Icon
                            name="Success"
                            color="white"
                            size="18px"
                            m={{ r: "0.5rem" }}
                        />
                    }
                >
                    Data Saved
                </Notification>

                <Notification
                    bg="info700"
                    hoverBg="info600"
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
                <h1 className="header">User Details</h1>
                <Formik
                    initialValues={{
                        userName: '',
                        mobile: '',
                        email: '',
                        address: '',

                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values)
                        setForm(values)
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="form">

                            <label className="lable">Username</label>
                            <Field className="input" name="userName" type="username" />
                            {errors.userName ? <div>{errors.userName}</div> : null}

                            <label className="lable">Mobile</label>
                            <Field className="input" name="mobile" type="number" />
                            {errors.mobile ? <div>{errors.mobile}</div> : null}


                            <label className="lable">Email</label>
                            <Field className="input" name="email" type="email" />
                            {errors.email && touched.email ? <div>{errors.email}</div> : null}

                            <label className="lable">Address</label>
                            <Field className="textarea" name="address" type="address" />
                            {errors.address ? <div>{errors.address}</div> : null}

                            <div className="button">
                                <Button

                                    bg="info700"
                                    hoverBg="info600"
                                    m={{ r: "0.5rem" }}
                                    className={"Button"} type="submit">Save</Button>


                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </>

    )
}

