import React,{Component} from "react";
import _ from 'lodash';
import {Form, Button} from 'react-bootstrap';
import {validateFields} from '../redux/common';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            errorMsg: ''
        };
       this.handleInputChange.bind(this);
       this.handleLogin.bind(this);
    }
   
    handleLogin = (event) => {
     
        event.preventDefault();
        const { username, password } = this.state;
        const fieldsToValidate = [{ username }, { password }];
       
        const allFieldsEntered = validateFields(fieldsToValidate);
        if (!allFieldsEntered){
            this.setState({
                errorMsg: {
                    signin_error: 'Please enter all the fields.'
                }
            });
        } else {
            this.setState({
                errorMsg: {
                    singin_error: ''
                }
            });
            // login successful
           this.props.postUser(username, password);
           
        }
     };
 
    handleInputChange = (event) => {
        const { name, value } = event.target;
   
        this.setState({
          [name]: value
        });
      };

  render(){
     const { errorMsg } = this.state;
        return(
                <div className="login-page">
            <h1>Login</h1>
            <div className="login-form">
              <Form onSubmit={this.handleLogin}>
                {errorMsg && errorMsg.signin_error && (
                  <p className="errorMsg centered-message">
                    {errorMsg.signin_error}
                  </p>
                )}
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={this.handleInputChange}
                  />
                </Form.Group>
                <div className="action-items">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
            </div>
          </div>
            );
    }
}

  
export default Login;