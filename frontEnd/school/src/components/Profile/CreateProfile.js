import React, { Component } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap';

export class CreateProfile extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        firstName: '', 
        lastName: '',
        ssn: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        phoneType: '',
        phoneNumber: ''
      }
    }
    
    initiateProfile = (event) => {
       event.preventDefault();
       const {firstName, lastName, ssn, streetAddress, city,
        state, zipCode, phoneType, phoneNumber} = this.state;
        const address = [{
           streetAddress: streetAddress,
           city: city,
           state: state,
           zipCode: zipCode
        }]
        const phoneNumbers = [{
            phoneType: phoneType,
            phoneNumber: phoneNumber
        }]
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('user', user);
       const profile = {
           firstName: firstName,
           lastName: lastName,
           ssn: ssn,
           address: address,
           phoneNumber: phoneNumbers,
           user
       };
       console.log('send profile ', profile);
       this.props.postProfile(profile);
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

  render() {
    return (
      <div>
          <Form onSubmit={this.initiateProfile}>
            <Row>
                <Form.Group as={Col} controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                    type="text"
                    name="firstName"
                    placeholder='Enter First Name'
                    onChange={this.handleInputChange}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                    type="text"
                    name="lastName"
                    placeholder='Enter Last Name'
                    onChange={this.handleInputChange}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="ssn">
                    <Form.Label>SSN</Form.Label>
                    <Form.Control
                    type="text"
                    name="ssn"
                    placeholder='Enter SSN'
                    onChange={this.handleInputChange}
                    />
                </Form.Group>
            </Row>
            <Form.Group as={Col} controlId="streetAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                    type="text"
                    name="streetAddress"
                    placeholder="Enter your street address"
                    onChange={this.handleInputChange}
                    />
                </Form.Group>
                
                <Row>
                    <Col xs={7}>
                        <Form.Group as={Col} controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control 
                            type="text"
                            name="city"
                            placeholder="Enter your city"
                            onChange={this.handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control 
                            type="text"
                            name="state"
                            placeholder="Enter your state"
                            onChange={this.handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="zipCode">
                            <Form.Label>Zip Code</Form.Label>
                            <Form.Control 
                            type="text"
                            name="zipCode"
                            placeholder="Enter your zipe code"
                            onChange={this.handleInputChange} 
                            />
                        </Form.Group>
                    </Col>     
                </Row>
                <Row>
                <Form.Group as={Col} controlId="phoneType">
                    <Form.Label>Phone Type</Form.Label>
                    <Form.Control 
                    type="text"
                    name="phoneType"
                    placeholder="Enter your phone type"
                    onChange={this.handleInputChange}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    onChange={this.handleInputChange}
                    />
                </Form.Group>
            </Row>            
            <div>
                <Button type="submit">Submit</Button>
            </div>
          </Form>
      </div>
    )
  }
}

export default CreateProfile