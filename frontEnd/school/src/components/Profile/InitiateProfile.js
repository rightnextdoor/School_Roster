import React from 'react'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../Formik/FormikControl'

function InitiateProfile(props) {
    const { postProfile, error} = props
    const dropdownOptions = [
        { key: 'Select Phone Type', value: '' },
        { key: 'Cell', value: 'Cell' },
        { key: 'Home', value: 'Home' },
        { key: 'Work', value: 'Work' }
    ]

    const initialValues = {
        firstName: '',
        lastName: '',
        ssn: '',
        address: [{
            streetAddress: '',
            city: '',
            state: '',
            zipCode: '',
        }],
        phoneNumber: [{
            phoneType: '',
            phoneNumber: ''
        }],
    }
    const validationSchema = Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        ssn: Yup.string().required('Required'),
        address: Yup.array().required('Required'),
        phoneNumber: Yup.array().of(Yup.object().shape({
            phoneType: Yup.string().required('Required'),
            phoneNumber: Yup.number().typeError('Must be a number')
                .integer('No . in the number').required('Required')
        })),
        address: Yup.array().of(Yup.object().shape({
            streetAddress: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            zipCode: Yup.number().typeError('Must be a number')
                .integer('No . in the number').required('Required')
        })),
    })

    const onSubmit = values => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        const profile = {
            firstName: values.firstName,
            lastName: values.lastName,
            ssn: values.ssn,
            address: values.address,
            phoneNumber: values.phoneNumber,
            user
        };
        
        console.log('profile', profile)
        postProfile(profile);
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
                            label='First Name'
                            name='firstName'
                        />
                        <FormikControl
                            control='input'
                            type='text'
                            label='Last Name'
                            name='lastName'
                        />
                        <FormikControl
                            control='input'
                            type='text'
                            label='SSN'
                            name='ssn'
                        />
                        <div>
                            <label>Phone Number</label>
                            <FieldArray name='phoneNumber'>
                                {
                                    (fieldArrayProps) => {
                                        const { push, remove, form } = fieldArrayProps
                                        const { values } = form
                                        const { phoneNumber } = values
                                        return (
                                            <div>
                                                {phoneNumber.map((phNumber, index) => (
                                                    <div key={index}>
                                                        <FormikControl
                                                            control='select'
                                                            label='Phone Type'
                                                            name={`phoneNumber.${index}.phoneType`}
                                                            options={dropdownOptions}
                                                        />
                                                        <FormikControl
                                                            control='input'
                                                            type='text'
                                                            label='Phone Number'
                                                            name={`phoneNumber.${index}.phoneNumber`}
                                                        />
                                                        {
                                                            index > 0 && (
                                                                <button type='button' onClick={() => remove(index)}>
                                                                    {' '}
                                                                    -{' '}
                                                                </button>
                                                            )
                                                        }
                                                        {
                                                            index < 2 && (
                                                                <button type='button' onClick={() => push('')}>
                                                                    {' '}
                                                                    +{' '}
                                                                </button>

                                                            )
                                                        }
                                                    </div>
                                                ))}

                                            </div>
                                        )
                                    }
                                }
                            </FieldArray>
                        </div>
                        <div>
                            <label>Address</label>
                            <FieldArray name='address'>
                                {
                                    (fieldArrayProps) => {
                                        const { push, remove, form } = fieldArrayProps
                                        const { values } = form
                                        const { address } = values
                                        return (
                                            <div>
                                                {address.map((phNumber, index) => (
                                                    <div key={index}>
                                                        <FormikControl
                                                            control='input'
                                                            type='text'
                                                            label='Street Address'
                                                            name={`address.${index}.streetAddress`}
                                                        />
                                                        <FormikControl
                                                            control='input'
                                                            type='text'
                                                            label='City'
                                                            name={`address.${index}.city`}
                                                        />
                                                        <FormikControl
                                                            control='input'
                                                            type='text'
                                                            label='State'
                                                            name={`address.${index}.state`}
                                                        />
                                                        <FormikControl
                                                            control='input'
                                                            type='text'
                                                            label='Zip Code'
                                                            name={`address.${index}.zipCode`}
                                                        />
                                                        {
                                                            index > 0 && (
                                                                <button type='button' onClick={() => remove(index)}>
                                                                    {' '}
                                                                    -{' '}
                                                                </button>
                                                            )
                                                        }
                                                        {
                                                            index < 2 && (
                                                                <button type='button' onClick={() => push('')}>
                                                                    {' '}
                                                                    +{' '}
                                                                </button>
                                                            )
                                                        }
                                                    </div>
                                                ))}

                                            </div>
                                        )
                                    }
                                }
                            </FieldArray>
                        </div>
                        <button type='submit' disabled={!formik.isValid}>Submit</button>
                    </Form>
                }
            }
        </Formik>
    )
}

export default InitiateProfile