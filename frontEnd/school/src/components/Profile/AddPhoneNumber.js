import React, { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';

export class AddPhoneNumber extends Component {

    constructor(props) {
        super(props)
        this.state = {
           phoneType: '',
           phoneNumber: ''
        }
      }

      sendData = () => {
        const {phoneType, phoneNumber} = this.state

        const list = {
            phoneType: phoneType,
           phoneNumber: phoneNumber
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
            <Button onClick={this.sendData}>Send</Button>
      </div>
    )
  }
}

export default AddPhoneNumber