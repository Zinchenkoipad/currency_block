import React from 'react';
import Hello from './Hello';
import List from './List';

class Apptest extends React.Component{
  render(){
    var styles = {
      color: this.props.color,
      textAlign:"center"
    }
    return(
      <div style={styles}>
        <Hello />
        <List/>
      </div>
    )
  }
}

export default Apptest;