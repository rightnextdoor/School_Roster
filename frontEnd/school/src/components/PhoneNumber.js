import React, { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';

export class PhoneNumber extends Component {
    constructor(props) {
      super(props)
      const phoneNumbers = this.props.phoneNumber;
      this.state = {
         id: phoneNumbers.id,
         phoneType: phoneNumbers.phoneType,
         phoneNumber: phoneNumbers.phoneNumber,
         toggleDisable: true
      }
      this.toggleDisabled = this.toggleDisabled.bind(this);
    }

    toggleDisabled(){
      this.setState({toggleDisable: !this.toggleDisabled})
      this.props.toggleSubmit();
       
   }
    
    sendList = () => {
        const {phoneType, phoneNumber, id} = this.state;
        const list = [{
            id: id,
            phoneType: phoneType,
            phoneNumber: phoneNumber
        }];
        this.props.getNumber(list);
        this.toggleDisabled();
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
      
      render() {

        const phoneNumbers = this.props.phoneNumber;
       
     return (
        <div>
            <Row>
                <Form.Group as={Col} controlId="phoneType">
                    <Form.Label>Phone Type</Form.Label>
                    <Form.Control 
                    type="text"
                    name="phoneType"
                    placeholder="Enter your phone type"
                    defaultValue={phoneNumbers.phoneType} 
                    disabled={this.state.toggleDisable} 
                    onChange={this.handleInputChange}
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    defaultValue={phoneNumbers.phoneNumber} 
                    disabled={this.state.toggleDisable} 
                    onChange={this.handleInputChange}
                    />
                </Form.Group>
            </Row>
            <Button variant="primary" onClick={this.toggleDisabled} 
                    type="submit"
                >
                {this.state.toggleDisable ? "Edit Phone Number Information" : "Cancel"}
            </Button>
            <Button onClick={this.sendList} disabled={this.state.toggleDisable} type="submit" >update</Button>
        </div>
    )
  }
}

export default PhoneNumber
