import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export class AddAddress extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
           streetAddress: '',
           city: '',
           state: '',
           zipCode: '',
        }
      }

    sendData = () => {
        const {streetAddress, city, state, zipCode} = this.state

        const list = {
            streetAddress: streetAddress,
            city: city,
            state: state,
            zipCode: zipCode
        }
        this.props.add(list);
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
                <Button onClick={this.sendData}>Send</Button>
      </div>
    )
  }
}

export default AddAddress