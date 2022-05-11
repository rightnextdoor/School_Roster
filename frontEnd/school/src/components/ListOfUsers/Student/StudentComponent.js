import React, { Component } from 'react'
import { UserTable } from '../UserTable/UserTable';

export class StudentComponent extends Component {
  render() {
    const studentList = this.props.studentList;
    return (
      <div>
        <UserTable user={studentList}/>
      </div>
    )
  }
}

export default StudentComponent;