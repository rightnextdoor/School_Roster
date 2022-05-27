import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'


const initialValues = {
    name: '',
    email: 'io@io.com',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: '',
    },
    phoneNumbers: ['',''],
    phNumbers: [''],
}
const onSubmit = (values, onSubmitProps) => {
    console.log('Form data', values)
    console.log('submit props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid email format').required('Required'),
    channel: Yup.string().required('Required'),
})

//api data call
const savedValues = {
    name: 'kevin',
    email: 'io@io.com',
    channel: 'love',
    comments: 'hello',
    address: '12424 hi',
    social: {
        facebook: '',
        twitter: '',
    },
    phoneNumbers: ['', ''],
    phNumbers: [''],
}

const validateComments = value => {
    let error
    if(!value) {
        error = 'Required'
    }
    return error
}

function FormikEx() {
    const [formValues, setFormValues] = useState(null)
    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        // validateOnChange={false}
        // validateOnBlur={false}
        // validateOnMount
        >
            {
                formik => {
                    console.log('Formik logs', formik)
                    return (
                        <Form>
                            <div >
                                <label htmlFor='name'>Name</label>
                                <Field
                                    type='text'
                                    id='name'
                                    name='name'
                                />
                                <ErrorMessage name='name' component={TextError} />
                            </div>

                            <div >
                                <label htmlFor='name'>E-mail</label>
                                <Field
                                    type='email'
                                    id='email'
                                    name='email'
                                />
                                <ErrorMessage name='email'>
                                    {errorMsg => <div className='error'>{errorMsg}</div>}
                                </ErrorMessage>
                            </div>

                            <div >
                                <label htmlFor='name'>Channel</label>
                                <Field
                                    type='text'
                                    id='channel'
                                    name='channel'
                                    placeholder='Youtube channel name'
                                />
                                <ErrorMessage name='channel'>
                                    {errorMsg => <div className='error'>{errorMsg}</div>}
                                </ErrorMessage>
                            </div>

                            <div>
                                <label htmlFor='comments'>Comments</label>
                                <Field
                                    as='textarea'
                                    id='comments'
                                    name='comments'
                                    validate={validateComments}
                                />
                                <ErrorMessage name='comments' component={TextError} />
                            </div>

                            <div>
                                <label htmlFor='address'>Address</label>
                                <FastField name='address' >
                                    {
                                        (props) => {
                                            const { field, form, meta } = props
                                            return (
                                                <div>
                                                    <input type='text' id='address' {...field} />
                                                    {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                                </div>
                                            )
                                        }
                                    }
                                </FastField>
                            </div>

                            <div>
                                <label htmlFor='facebook'>Facebook profile</label>
                                <Field type='text' id='facebook' name='social.facebook' />
                            </div>
                            <div>
                                <label htmlFor='twitter'>Twitter profile</label>
                                <Field type='text' id='twitter' name='social.twitter' />
                            </div>

                            <div>
                                <label htmlFor='primaryPh'>Primary phone number</label>
                                <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
                            </div>
                            <div>
                                <label htmlFor='secondaryPh'>Secondary phone number</label>
                                <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
                            </div>

                            <div>
                                <label>List of phone numbers</label>
                                <FieldArray name='phNumbers'>
                                    {
                                        (fieldArrayProps) => {
                                            const { push, remove, form } = fieldArrayProps
                                            const { values } = form
                                            const { phNumbers } = values
                                            return (
                                                <div>
                                                    {phNumbers.map((phNumber, index) => (
                                                        <div key={index}>
                                                            <Field name={`phNumbers[${index}]`} />
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
                            {/* <button type='bution' onClick={() => formik.validateField('comments')}>Validate comments</button>
                            <button type='button' onClick={() => formik.validateForm()}>Validate all</button>

                            <button type='bution' onClick={() => formik.setFieldTouched('comments')}>Visit comments</button>
                            <button type='button' onClick={() => formik.setTouched({
                                name: true,
                                email: true,
                                channel: true,
                                comments: true
                            })}>Visit fields</button> */}
                            <button type='button' onClick={() => setFormValues(savedValues)}>Load saved data</button>
                            <button type='reset'>Reset</button>
                            <button type='submit' disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
                        </Form>
                    )
                }
            }
           
        </Formik>
    )
}

export default FormikEx