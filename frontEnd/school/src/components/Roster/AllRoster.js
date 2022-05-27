import React, { Component } from 'react'
import { RosterTable } from './RosterTable/RosterTable';

export class AllRoster extends Component {
  render() {
    const roster = this.props.roster;
    const { error } = this.props
    return (
      <div>
        <RosterTable roster={roster} error={error} />
      </div>
    )
  }
}

export default AllRoster;