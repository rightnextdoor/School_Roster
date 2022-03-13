import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export class ProfileInformation extends Component {
    constructor(props) {
        super(props)
          const profile = this.props.profile;
         
          this.state = {
            id: profile.id,
            firstName: profile.firstName, 
            lastName: profile.lastName,
            ssn: profile.ssn,
            toggleDisable: true
        }
        this.toggleDisabled = this.toggleDisabled.bind(this);
    }

    toggleDisabled(){
      this.setState({toggleDisable: !this.toggleDisabled})
      this.props.toggleSubmit();
       
   }
      
      sendProfile = () => {
          const {id, firstName, lastName, ssn} = this.state;
          const profile = [{
              id: id,
              firstName: firstName, 
              lastName: lastName,
              ssn: ssn
          }];
          this.props.getProfile(profile);
          this.toggleDisabled();
      }

      handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

  render() {
    const profile = this.props.profile
    return (
      <div>
        <Row>
            <Form.Group as={Col} controlId="id">
              <Form.Label>School Id:</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  defaultValue={profile.id}
                  onChange={this.handleInputChange}
                  disabled
                  readOnly
                />
              </Form.Group>
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    defaultValue={profile.firstName}
                    onChange={this.handleInputChange}
                    disabled={this.state.toggleDisable}
                        />
                </Form.Group>
                <Form.Group as={Col} controlId="lastName">
                    <Form.Label>Last name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            defaultValue={profile.lastName}
                            onChange={this.handleInputChange}
                            disabled={this.state.toggleDisable}
                        />
                </Form.Group>
                <Form.Group as={Col} controlId="ssn">
                    <Form.Label>SSN:</Form.Label>
                        <Form.Control
                            type="text"
                            name="ssn"
                            placeholder="Enter your SSN"
                            defaultValue={profile.ssn}
                            onChange={this.handleInputChange}
                            disabled={this.state.toggleDisable}
                        />
                </Form.Group>
            </Row>
            <Button variant="primary" onClick={this.toggleDisabled} 
                type="submit"
            >
                {this.state.toggleDisable ? "Edit Profile Information" : "Cancel"}
            </Button>
            {
              !this.state.toggleDisable &&
              <Button onClick={this.sendProfile} disabled={this.state.toggleDisable} type="submit" >update</Button>
            }
            
      </div>
    )
  }
}

export default ProfileInformation