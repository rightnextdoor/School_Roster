import React, { Component } from 'react';
import GetUserProfile from '../Profile/GetUserProfile';

export class LeaderComponent extends Component {
  render() {
      const leaderList = this.props.leaderList;
    return (
      <div>
          {leaderList.map(user =><GetUserProfile key={user.id} user={user}/>)}
      </div>
    )
  }
}

export default LeaderComponent