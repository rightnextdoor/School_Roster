import React, { Component } from 'react'
import { UserTable } from '../UserTable/UserTable';

export class StudentComponent extends Component {
  render() {
    const { error } = this.props;
    const studentList = this.props.studentList;
    return (
      <div>
        <UserTable user={studentList} error={error}/>
      </div>
    )
  }
}

export default StudentComponent;