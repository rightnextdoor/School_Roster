import React, { Component } from 'react';
import { UserTable } from '../UserTable/UserTable';

export class LeaderComponent extends Component {
  render() {
      const leaderList = this.props.leaderList;
    return (
      <div>
          <UserTable user={leaderList}/>
      </div>
    )
  }
}

export default LeaderComponent