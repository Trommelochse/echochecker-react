import React from 'react';
export default (props) => {
  const style = {
    width: '1152px',
    margin: '0 auto'
  }
  return (
    <div style={style}>
      { props.children }
    </div>
  )
}
