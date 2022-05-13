import React, { Component } from 'react'
import { RosterTable } from './RosterTable/RosterTable';

export class AllRoster extends Component {
    render() {
        const roster = this.props.roster;
        return (
          <div>
            <RosterTable roster={roster}/>
          </div>
        )
      }
    }

export default AllRoster;