import React, { Component } from 'react';



export class GetUserProfile extends Component {
  render() {
      
    const user = this.props.user;
    
    return (
        <div>
            <h1>Hello {user.firstName} {user.lastName}</h1>
            <h4>Username: {user.username} Email: {user.email} Role: {user.role}</h4>
            
        </div>
    )
  }
}

export default GetUserProfile;