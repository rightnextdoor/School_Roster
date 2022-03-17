import React, { Component } from 'react'
import GetUserProfile from '../Profile/GetUserProfile';

export class StudentComponent extends Component {
  render() {
    const studentList = this.props.studentList;
    return (
      <div>
        {studentList.map(user =><GetUserProfile key={user.id} user={user}/>)}
      </div>
    )
  }
}

export default StudentComponent;