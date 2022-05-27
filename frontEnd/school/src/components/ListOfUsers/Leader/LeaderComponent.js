import React, { Component } from 'react';
import { UserTable } from '../UserTable/UserTable';

export class LeaderComponent extends Component {
  render() {
    const { error } = this.props;
      const leaderList = this.props.leaderList;
    return (
      <div>
          <UserTable user={leaderList} error={error}/>
      </div>
    )
  }
}

export default LeaderComponent