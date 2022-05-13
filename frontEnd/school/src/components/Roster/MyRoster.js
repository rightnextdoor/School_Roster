import React, { Component } from 'react'
import { RosterTable } from './RosterTable/RosterTable';

export class MyRoster extends Component {
  constructor(props) {
    super(props)
    var roster = [];
    if(this.props.roster !== undefined){
     roster = this.props.roster;
    }
    this.state = {
       roster:roster
    }
    
  }
  render() {
    const {roster} = this.state;
    return (
      <div>
        <RosterTable roster={roster}/>
      </div>
    )
  }
}

export default MyRoster;