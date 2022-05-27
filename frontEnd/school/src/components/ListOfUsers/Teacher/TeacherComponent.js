import React, { Component } from 'react';
import { UserTable } from '../UserTable/UserTable';

export class TeacherComponent extends Component {
  render() {
    const { error } = this.props;
      const teacherList = this.props.teacherList;
    return (
      <div>
          <UserTable user={teacherList} error={error}/>
      </div>
    )
  }
}

export default TeacherComponent