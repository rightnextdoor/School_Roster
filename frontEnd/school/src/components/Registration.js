import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './Formik/FormikControl'

function Registration(props) {
    const { error } = props
    const dropdownOptions = [
        { key: 'Select Role', value: '' },
        { key: 'Student', value: 'STUDENT' },
        { key: 'Teacher', value: 'TEACHER' },
        { key: 'Teacher Leader', value: 'TEACHER,TEACHER_LEADER' }
    ]
    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        active: true
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match').required('Required'),
        role: Yup.string().required('Required')
    })

    const onSubmit = values => {
        const sendData = {
            username: values.username,
            password: values.password,
            role: values.role,
            email: values.email,
            active: values.active
        }
        props.createUser(sendData);
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                formik => {
                    return <Form>
                        {error &&
                            <div className='error'><p>{error}</p></div>}
                        <FormikControl
                            control='input'
                            type='text'
                            label='Username'
                            name='username'
                        />
                        <FormikControl
                            control='input'
                            type='email'
                            label='Email'
                            name='email'
                        />
                        <FormikControl
                            control='input'
                            type='password'
                            label='Password'
                            name='password'
                        />
                        <FormikControl
                            control='input'
                            type='password'
                            label='Confirm Password'
                            name='confirmPassword'
                        />
                        <FormikControl
                            control='select'
                            label='Role'
                            name='role'
                            options={dropdownOptions}
                        />
                        <button type='submit' disabled={!formik.isValid}>Submit</button>
                    </Form>
                }
            }
        </Formik>
    )
}

export default Registration