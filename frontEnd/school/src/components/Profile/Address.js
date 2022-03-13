import React, { Component } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';

export class Address extends Component {
    constructor(props) {
      super(props)
      const address = this.props.address;
      this.state = {
         id: address.id,
         streetAddress: address.streetAddress,
         city: address.city,
         state: address.state,
         zipCode: address.zipCode,
         toggleDisable: true
      }
      this.toggleDisabled = this.toggleDisabled.bind(this);
    }

    toggleDisabled(){
        this.setState({toggleDisable: !this.toggleDisabled})
        this.props.toggleSubmit();
         
     }
    
    sendList = () => {
        const {id, streetAddress, city, state, zipCode} = this.state;
        const list = {
            id: id,
            streetAddress: streetAddress,
            city: city,
            state: state,
            zipCode: zipCode
        };
        this.props.getAddress(list);
        this.toggleDisabled();
    }

    deleteAddress = () => {
        const {id, streetAddress, city, state, zipCode} = this.state;
        const list = {
            id: id,
            streetAddress: streetAddress,
            city: city,
            state: state,
            zipCode: zipCode
        };
        this.props.delete(list);
        this.toggleDisabled();
    }


    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

      render() {

        const address = this.props.address;
        const size = this.props.size;
        return(
            <div>
                <Form.Group as={Col} controlId="streetAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                    type="text"
                    name="streetAddress"
                    placeholder="Enter your street address"
                    defaultValue={address.streetAddress} 
                    disabled={this.state.toggleDisable} 
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
                            defaultValue={address.city} 
                            disabled={this.state.toggleDisable} 
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
                            defaultValue={address.state} 
                            disabled={this.state.toggleDisable} 
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
                            defaultValue={address.zipCode} 
                            disabled={this.state.toggleDisable} 
                            onChange={this.handleInputChange} 
                            />
                        </Form.Group>
                    </Col>     
                </Row>
                <Button variant="primary" onClick={this.toggleDisabled} 
                    type="submit"
                >
                {this.state.toggleDisable ? "Edit Address Information" : "Cancel"}
                </Button>
                {
                   !this.state.toggleDisable &&
                   <Button onClick={this.sendList} disabled={this.state.toggleDisable} type="submit" >update</Button>
                }
                {
              (size > 1 && !this.state.toggleDisable) &&
              <Button onClick={this.deleteAddress} >Delete</Button>
            }
                
            </div>
        );
      }
}

export default Address