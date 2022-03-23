import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export class CreateStudents extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
           username: '',
           password: '',
           role: 'STUDENT',
           email: '',
           active: true
        }
      }
  
      onSend = (event) => {
          event.preventDefault();
          const {username, password, role, email, active} = this.state;
          const sendData = {
              username: username,
              password: password,
              role: role,
              email: email,
              active: active
          }
  
          console.log('send ', sendData);
          this.props.createUser(sendData);
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
            <Form onSubmit={this.onSend}>
                <Row>
                    <Form.Group as={Col} controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type='text'
                          name='username'
                          placeholder='username'
                          onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type='text'
                          name='password'
                          placeholder='password'
                          onChange={this.handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type='email'
                          name='email'
                          placeholder='email'
                          onChange={this.handleInputChange}
                        />
                    </Form.Group>
                </Row>
                <div>
                    <Button type='submit'>submit</Button>
                </div>
            </Form>
        </div>
      )
    }
  }

export default CreateStudents