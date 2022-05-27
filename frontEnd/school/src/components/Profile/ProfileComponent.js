import React from 'react'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../Formik/FormikControl'
import {
  profileUpdate, addAddress, addPhoneNumber,
  deleteAddress, deletePhoneNumber
} from "../../redux/ProfileCreators/ActionCreators";
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import PhoneNumber from './PhoneNumber';
import Address from './Address';

const mapDispatchToProps = (dispatch) => ({
  profileUpdate: (profile) => dispatch(profileUpdate(profile)),
  addAddress: (address) => dispatch(addAddress(address)),
  addPhoneNumber: (phone) => dispatch(addPhoneNumber(phone)),
  deleteAddress: (address) => dispatch(deleteAddress(address)),
  deletePhoneNumber: (phone) => dispatch(deletePhoneNumber(phone)),
});

function Profile(props) {
  const { profile, error } = props
  var getProfile = {
    id: '',
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

  var phoneCount = 0;
  var addressCount = 0;
  var user = null;
  if (profile !== undefined) {
    getProfile = profile
    phoneCount = profile.phoneNumber.length
    addressCount = profile.address.length
    user = profile.user;
  }

  const [toggleUser, setToggleUser] = useState(true)
  const [toggleReset, setToggleReset] = useState(false)

  const initialValues = {
    id: getProfile.id || '',
    firstName: getProfile.firstName || '',
    lastName: getProfile.lastName || '',
    ssn: getProfile.ssn || '',
    address: getProfile.address || [{
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
    }],
    phoneNumber: getProfile.phoneNumber || [{
      phoneType: '',
      phoneNumber: ''
    }],
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    ssn: Yup.string().required('Required'),
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

  const onSubmit = (values, { resetForm }) => {
    if (!toggleReset) {
      var newAddress = [];
      values.address.map((address, index) => {
        if (index < addressCount) {
          return (
            newAddress.push(address)
          )
        } else {
          return (
            newAddress
          )
        }
      })

      var newPhone = [];
      values.phoneNumber.map((phone, index) => {
        if (index < phoneCount) {
          return (
            newPhone.push(phone)
          )
        } else {
          return (
            newPhone
          )
        }
      })

      const profile = {
        id: values.id,
        firstName: values.firstName,
        lastName: values.lastName,
        ssn: values.ssn,
        user,
        address: newAddress,
        phoneNumber: newPhone
      }
      console.log('update', profile)
      props.profileUpdate(profile)
    } else {
      setToggleReset(false);
      setToggleUser(true);
      resetForm();
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {
        formik => {
          return <Form>
            {error &&
              <div className='error'><p>{error}</p></div>}
            <Row >
              <FormikControl
                control='input'
                type='text'
                label='Id'
                name='id'
                disabled
                readOnly
              />
              <FormikControl
                control='input'
                type='text'
                label='SSN'
                name='ssn'
                disabled={toggleUser}
              />
            </Row>
            <Row>
              <FormikControl
                control='input'
                type='text'
                label='First Name'
                name='firstName'
                disabled={toggleUser}
              />
              <FormikControl
                control='input'
                type='text'
                label='Last Name'
                name='lastName'
                disabled={toggleUser}
              />
            </Row>
            {toggleUser &&
              <button type='button' onClick={() => setToggleUser(!toggleUser)}>Edit</button>
            }
            {!toggleUser &&
              <button type='submit'>Update</button>
            }
            {!toggleUser &&
              <button type='rest' onClick={() => { setToggleReset(true); }}>Cancel</button>
            }

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

                            <PhoneNumber phNumber={phNumber}
                              index={index} phoneCount={phoneCount} remove={remove}
                              user={user} addPhoneNumber={props.addPhoneNumber}
                              deletePhoneNumber={props.deletePhoneNumber}
                              form={form}
                            />
                          </div>
                        ))}

                        {
                          phoneNumber.length < 3 && (
                            <button type='button' onClick={() => push('')}>Add</button>
                          )
                        }
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
                        {address.map((address, index) => (
                          <div key={index}>
                            <Address address={address} index={index}
                              addressCount={addressCount} remove={remove}
                              user={user} addAddress={props.addAddress}
                              deleteAddress={props.deleteAddress} form={form} />
                          </div>
                        ))}
                        {
                          address.length < 3 && (
                            <button type='button' onClick={() => push('')}>Add</button>
                          )
                        }
                      </div>
                    )
                  }
                }
              </FieldArray>
            </div>
          </Form>
        }
      }
    </Formik>
  )
}

export default (connect(null, mapDispatchToProps)(Profile));