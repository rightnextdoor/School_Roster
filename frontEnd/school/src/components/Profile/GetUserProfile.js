import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export class GetUserProfile extends Component {
  render() {
      
    const user = this.props.user;
    
    return (
        <div>
            <h1>Hello {user.firstName} {user.lastName}</h1>
            <h4>Username: {user.username} Email: {user.email} Role: {user.role}</h4>
            <Link to={{pathname:"/profile/user", state:{profile: user}}}>Profile</Link>
        </div>
    )
  }
}

export default GetUserProfile;