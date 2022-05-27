import React from 'react'
import FormikControl from '../Formik/FormikControl'
import { Col, Row } from 'react-bootstrap'
import { useState } from 'react'

function Address(props) {
    const { address, index, addressCount, remove, user, deleteAddress, addAddress, form } = props
    const [toggleAddress, setToggleAddress] = useState(true)

    var check = false
    if (addressCount < index + 1) {
        check = true
    }

    const deleteAdd = () => {
        const send = {
            user: user,
            address: address
        }
        console.log('delete address', send)
        deleteAddress(send)

    }

    const addAdd = () => {
        const send = {
            user: user,
            address: address
        }
        console.log('add address', send)
        addAddress(send)

    }

    return (
        <div>
            <FormikControl
                control='input'
                type='text'
                label='Street Address'
                name={`address.${index}.streetAddress` || ''}
                disabled={toggleAddress && !check}
            />
            <Row >
                <Col>
                    <FormikControl
                        control='input'
                        type='text'
                        label='City'
                        name={`address.${index}.city` || ''}
                        disabled={toggleAddress && !check}
                    />
                </Col>
                <Col >
                    <FormikControl
                        control='input'
                        type='text'
                        label='State'
                        name={`address.${index}.state` || ''}
                        disabled={toggleAddress && !check}
                    />
                </Col>
                <Col >
                    <FormikControl
                        control='input'
                        type='text'
                        label='Zip Code'
                        name={`address.${index}.zipCode` || ''}
                        disabled={toggleAddress && !check}
                    />
                </Col>
            </Row>
            {!check && toggleAddress &&
                <button type='button' onClick={() => setToggleAddress(!toggleAddress)}>Edit</button>
            }
            {
                !check && !toggleAddress &&
                <button type='submit'>Update</button>
            }
            {
                !check && addressCount !== 1 && !toggleAddress &&
                <button type='button' onClick={deleteAdd}>Delete</button>
            }
            {!check && !toggleAddress &&
                <button type='rest' onClick={() => { form.resetForm(); setToggleAddress(true); }}>Cancel</button>
            }
            {
                check &&
                <button type='button' onClick={addAdd}>Send</button>

            }
            {
                check &&
                <button type='button' onClick={() => remove(index)}>Cancel</button>
            }

        </div>
    )
}

export default Address