import React from 'react'
import FormikControl from '../Formik/FormikControl'
import { Row } from 'react-bootstrap'
import { useState } from 'react'

function PhoneNumber(props) {
    const { phNumber, index, phoneCount, remove, user, addPhoneNumber, deletePhoneNumber, form } = props
    const [togglePhone, setTogglePhone] = useState(true)

    const dropdownOptions = [
        { key: 'Select Phone Type', value: '' },
        { key: 'Cell', value: 'Cell' },
        { key: 'Home', value: 'Home' },
        { key: 'Work', value: 'Work' }
    ]

    var check = false
    if (phoneCount < index + 1) {
        check = true

    }

    const deletePhone = () => {
        const send = {
            user: user,
            phoneNumber: phNumber
        }
        deletePhoneNumber(send)

    }

    const addPhone = () => {
        const send = {
            user: user,
            phoneNumber: phNumber
        }
        console.log('add phone number', send)
        addPhoneNumber(send)

    }

    return (
        <div>
            <Row>
                <FormikControl
                    control='select'
                    label='Phone Type'
                    name={`phoneNumber.${index}.phoneType` || ''}
                    options={dropdownOptions}
                    disabled={togglePhone && !check}
                />
                <FormikControl
                    control='input'
                    type='text'
                    label='Phone Number'
                    name={`phoneNumber.${index}.phoneNumber` || ''}
                    disabled={togglePhone && !check}
                />
            </Row>
            {!check && togglePhone &&
                <button type='button' onClick={() => setTogglePhone(!togglePhone)}>Edit</button>
            }
            {
                !check && !togglePhone &&
                <button type='submit'>Update</button>
            }

            {
                !check && phoneCount !== 1 && !togglePhone &&
                <button type='button' onClick={deletePhone}>Delete</button>
            }
            {!check && !togglePhone &&
                <button type='rest' onClick={() => { form.resetForm(); setTogglePhone(true); }}>Cancel</button>
            }
            {
                check &&
                <button type='button' onClick={addPhone}>Send</button>

            }
            {
                check &&
                <button type='button' onClick={() => { remove(index); }}>Cancel</button>
            }

        </div>
    )
}

export default PhoneNumber