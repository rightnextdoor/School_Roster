import React, { Component } from 'react';
import GetUserProfile from '../Profile/GetUserProfile';

export class TeacherComponent extends Component {
  render() {
      const teacherList = this.props.teacherList;
    return (
      <div>
          {teacherList.map(user =><GetUserProfile key={user.id} user={user}/>)}
      </div>
    )
  }
}

export default TeacherComponent