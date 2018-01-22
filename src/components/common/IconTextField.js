import React from 'react';
import TextField from 'material-ui/TextField';

export default (props) => {
  const style = {
    display: 'grid',
    gridTemplateColumns: '64px 1fr',
  }
  const iconContainerStyle = {
    display: 'flex',
    marginTop: 14
  }
  const iconStyle = {
    display: 'block',
    color: '#6d6d6d',
    margin: 'auto'
  }
  return (
    <div style={style}>
      <div style={iconContainerStyle}>
        <i className={'fa ' + props.icon} style={iconStyle}/>
      </div>
      <TextField {...props} />
    </div>
  )
}
