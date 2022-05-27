import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './Formik/FormikControl'


function Login(props) {
  const { error } = props

  const initialValues = {
    username: '',
    password: '',

  }
  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  })
  const onSubmit = (values) => {
    props.postUser(values.username, values.password);
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >

      {
        formik =>
          < Form >
            {error &&
              <div className='error'><p>{error}</p></div>}
            {formik.isSubmitting && <div><p>hi</p></div>}
            <FormikControl
              control='input'
              type='text'
              label='Username'
              name='username'
            />
            <FormikControl
              control='input'
              type='password'
              label='Password'
              name='password'
            />
            <button type='submit' disabled={!formik.isValid}>Submit</button>
          </Form>
      }
    </Formik >
  )
}


export default Login;