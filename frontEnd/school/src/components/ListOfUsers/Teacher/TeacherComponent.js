import React, { Component } from 'react';
import { UserTable } from '../UserTable/UserTable';

export class TeacherComponent extends Component {
  render() {
      const teacherList = this.props.teacherList;
    return (
      <div>
          <UserTable user={teacherList}/>
      </div>
    )
  }
}

export default TeacherComponent