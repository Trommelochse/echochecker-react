import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const SectionTitle = props => {
  const style = {
    display: 'block',
    padding: '16px 0',
    fontWeight: 300
  }
  return (
    <div className="SectionTitle">
      <span style={style}>{props.title || props.children}</span>
      <Divider />
    </div>
  )
}

export default SectionTitle;
